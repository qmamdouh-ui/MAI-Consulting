/*!
 * M.A.I. Consulting report kit (assets/report-kit.js)
 *
 * One shared module for the two assessment pages (explore-your-ai-readiness,
 * extensive-ai-readiness-analysis). The pages only build a `model` from their
 * own scoring; this file draws the on-page dashboard, the PDF and the email
 * snippets, so both assessments look identical. Look: Power BI report
 * (canvas, white visual tiles, navy header band, status colours for meaning).
 * No build step, no dependencies. jsPDF is passed in by the page.
 *
 * Public API (window.MAIReport):
 *   band(pct)                      -> {key,label,color,tint,range}
 *   vsTarget(pct,target)           -> '5 points below the target of 60'
 *   renderDashboard(containerEl, model)
 *   buildPdf(jsPDFConstructor, model) -> jsPDF doc (A4 landscape, vector only)
 *   emailBarsHtml(model)           -> email-safe HTML (tables, inline styles)
 *   emailPrioritiesHtml(model)     -> email-safe HTML
 *
 * MODEL SCHEMA (plain text everywhere; the kit escapes and cleans it)
 * {
 *   kind:        'quick' | 'extended'
 *   title:       'AI Readiness Report'
 *   subtitle:    instrument name, e.g. 'AI Readiness Check'
 *   basisLine:   filter-context basis, e.g. '28 self-assessed questions'
 *   areaLabel:   'competency' | 'dimension'      (singular, lower case)
 *   areaPlural:  'competencies' | 'dimensions'
 *   org, respondent, role, sector, date ('17 Oct 2026')
 *   overall:     { pct, points, max, label, range }   label = readiness level, range = '40 to 59'
 *   target:      60   (one constant line on every visual)
 *   dims:        [{ name, pct, points, max, meaning, detail? }]   page order
 *   cardNote:    line under the "areas below target" card
 *   gaps:        [{ priority:'High'|'Medium'|'Low', dim, behaviour, answer, why,
 *                   action30, action90?, pct, scoreText?, extra?:[{behaviour,answer}] }]
 *   gapsNote:    one line explaining how the gaps were chosen
 *   plan30:      [{ when, text, start?, end? }]   start/end in 0..1 of the 30 days
 *   plan90?:     [{ when, text, start?, end? }]   start/end in 0..1 of the 90 days
 *   services:    [{ name, url, fixes, forDims? }]  weakest areas first; never prices
 *   standards?:  [{ dim, pct, frameworks }]        optional guidance (extended)
 *   answers:     [{ dim, question, answer, points, max, threshold,
 *                   status:'below'|'meets'|'info'|'none' }]
 *   levelMeaning: one sentence;  pattern?: what the strongest/weakest pair implies
 *   howToRead:   ['Label: explanation', ...]  one line per number
 *   about?:      disclaimer paragraph (end of the answer detail)
 *   bookUrl, contactEmail
 * }
 */
(function (root) {
  'use strict';

  /* ── Tokens (Power BI default theme) ─────────────────────────────── */
  var T = {
    canvas: '#F3F2F1', tile: '#FFFFFF', border: '#E1DFDD', navy: '#12239E', accent: '#118DFF',
    text: '#252423', text2: '#605E5C', text3: '#8A8886', grid: '#EDEBE9', target: '#252423',
    link: '#12239E', bandText: '#DCE1F7',
    palette: ['#118DFF', '#12239E', '#E66C37', '#6B007B', '#E044A7', '#744EC2', '#D9B300', '#D64550']
  };
  var BANDS = [
    { key: 'gap', label: 'Priority gap', color: '#D64550', tint: '#FBE3E5', range: 'below 40' },
    { key: 'dev', label: 'Developing', color: '#E8A33D', tint: '#FCEFD9', range: '40 to 59' },
    { key: 'ok', label: 'On target', color: '#1AAB40', tint: '#DDF3E2', range: '60 to 74' },
    { key: 'strong', label: 'Strong', color: '#118DFF', tint: '#DCEEFF', range: '75 and up' }
  ];
  /* timeline axes: the 30-day plan in weeks; the 90-day plan covers days 31 to 90 */
  var AX30 = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  var AX90 = ['Days 31 to 50', 'Days 51 to 70', 'Days 71 to 90'];
  var STATUS = {
    below: { label: 'Below threshold', color: '#D64550' },
    meets: { label: 'Meets threshold', color: '#1AAB40' },
    info: { label: 'Not scored', color: '#8A8886' },
    none: { label: 'Not answered', color: '#8A8886' }
  };

  function band(pct) {
    var p = Number(pct) || 0;
    var b = p < 40 ? BANDS[0] : p < 60 ? BANDS[1] : p < 75 ? BANDS[2] : BANDS[3];
    return { key: b.key, label: b.label, color: b.color, tint: b.tint, range: b.range };
  }
  function vsTarget(pct, target) {
    target = target == null ? 60 : target;
    var d = Math.round(Number(pct) - target);
    if (!d) return 'On the target of ' + target;
    var n = Math.abs(d);
    return n + ' point' + (n === 1 ? '' : 's') + (d < 0 ? ' below' : ' above') + ' the target of ' + target;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function clamp01(v) { v = Number(v); return isNaN(v) ? 0 : Math.max(0, Math.min(1, v)); }
  function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
  /* weakest first; ties keep page order (same rule as the pages' strongest/weakest) */
  function sortDims(dims) {
    return dims.map(function (d, i) { return { d: d, i: i }; })
      .sort(function (a, b) { return a.d.pct - b.d.pct || a.i - b.i; })
      .map(function (x) { return x.d; });
  }
  function normalize(m) {
    m = m || {};
    var o = {};
    for (var k in m) if (Object.prototype.hasOwnProperty.call(m, k)) o[k] = m[k];
    o.title = o.title || 'AI Readiness Report';
    o.subtitle = o.subtitle || '';
    o.target = o.target == null ? 60 : o.target;
    o.areaLabel = o.areaLabel || 'area';
    o.areaPlural = o.areaPlural || 'areas';
    o.dims = o.dims || []; o.gaps = o.gaps || []; o.plan30 = o.plan30 || [];
    o.services = o.services || []; o.answers = o.answers || []; o.howToRead = o.howToRead || [];
    o.overall = o.overall || { pct: 0, points: 0, max: 0, label: '' };
    o.bookUrl = o.bookUrl || 'https://mai4consulting.com/book/';
    o.contactEmail = o.contactEmail || 'q.mamdouh@mai4consulting.com';
    o.date = o.date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    o.sorted = sortDims(o.dims);
    o.weakest = o.sorted[0] || { name: '', pct: 0, points: 0, max: 0 };
    o.strongest = o.sorted[o.sorted.length - 1] || o.weakest;
    o.below = o.dims.filter(function (d) { return d.pct < o.target; }).length;
    return o;
  }
  function planItems(items) {
    var n = items.length || 1;
    return items.map(function (it, k) {
      var s = it.start == null ? k / n : clamp01(it.start), e = it.end == null ? (k + 1) / n : clamp01(it.end);
      if (e < s) e = s;
      return { when: it.when || '', text: it.text || '', start: s, end: e, ms: e - s < 0.001 };
    });
  }
  function shortUrl(u) { return String(u || '').replace(/^https?:\/\//, '').replace(/^www\./, ''); }

  /* ── Dashboard CSS (injected once) ───────────────────────────────── */
  var CSS = [
    '.mrk{background:#F3F2F1;color:#252423;font-family:"Segoe UI","Segoe UI Web",Arial,sans-serif;font-size:13px;line-height:1.45;padding:0 12px 12px;border-radius:4px;display:flex;flex-direction:column;gap:12px;position:relative}',
    '.mrk *{box-sizing:border-box}',
    '.mrk h2,.mrk h3,.mrk h4,.mrk p,.mrk ul,.mrk ol,.mrk dl,.mrk dd{margin:0;padding:0}',
    '.mrk ul,.mrk ol{list-style:none}',
    '.mrk a{color:#12239E}',
    '.mrk a:focus-visible,.mrk [tabindex]:focus-visible{outline:2px solid #118DFF;outline-offset:2px}',
    '.mrk-band{background:#12239E;color:#fff;border-bottom:3px solid #118DFF;margin:0 -12px;padding:14px 16px 12px;border-radius:4px 4px 0 0}',
    '.mrk-band-top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:4px 16px}',
    '.mrk-title{font-size:20px;font-weight:600;line-height:1.2;color:#fff;font-family:inherit;letter-spacing:0}',
    '.mrk-brand{font-size:13px;font-weight:600;color:#fff}',
    '.mrk-instr{font-size:12px;color:#DCE1F7;margin-top:2px}',
    '.mrk-filters{display:flex;flex-wrap:wrap;gap:4px 22px;margin-top:10px;font-size:12px}',
    '.mrk-filters div{display:flex;gap:5px;min-width:0}',
    '.mrk-filters dt{color:#DCE1F7}',
    '.mrk-filters dd{font-weight:600;color:#fff;overflow-wrap:anywhere}',
    '.mrk-tabs{display:flex;gap:2px;overflow-x:auto;margin:-12px -12px 0;padding:0 8px;background:#fff;border-bottom:1px solid #E1DFDD}',
    '.mrk-tabs a{font-size:12.5px;color:#252423;text-decoration:none;padding:9px 12px 7px;border-bottom:3px solid transparent;white-space:nowrap}',
    '.mrk-tabs a:hover{border-bottom-color:#C8C6C4}',
    '.mrk-tabs a.on{border-bottom-color:#118DFF;font-weight:600}',
    '.mrk-sec{display:flex;flex-direction:column;gap:12px;scroll-margin-top:76px}',
    '.mrk-tile{background:#fff;border:1px solid #E1DFDD;border-radius:4px;padding:14px 16px;box-shadow:0 1px 2px rgba(0,0,0,.08);min-width:0}',
    '.mrk-vt{font-size:13px;font-weight:600;color:#252423;font-family:inherit;line-height:1.3}',
    '.mrk-vt-row{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:2px 12px;margin-bottom:6px}',
    '.mrk-vt-sub{font-size:12px;color:#605E5C}',
    '.mrk-tile>.mrk-vt{margin-bottom:8px}',
    '.mrk-cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}',
    '.mrk-card{display:flex;flex-direction:column}',
    '.mrk-card .mrk-vt{margin-bottom:2px}',
    '.mrk-val{font-size:38px;font-weight:300;line-height:1.15;font-variant-numeric:tabular-nums;color:#252423;display:flex;align-items:baseline;flex-wrap:wrap;gap:0 8px}',
    '.mrk-val small{font-size:15px;color:#605E5C;font-weight:400;margin-left:-5px}',
    '.mrk-line{font-size:12px;color:#605E5C;margin-top:3px}',
    '.mrk-line b{color:#252423;font-weight:600}',
    '.mrk-chip{display:inline-flex;align-items:center;gap:6px;padding:2px 9px 2px 7px;border-radius:11px;font-size:12px;font-weight:600;color:#252423;white-space:nowrap;line-height:1.5}',
    '.mrk-chip i,.mrk-dot{display:inline-block;width:9px;height:9px;border-radius:50%;flex-shrink:0}',
    '.mrk-dot{margin-right:6px;vertical-align:0}',
    '.mrk-delta{font-weight:600}',
    '.mrk-delta.dn{color:#A4262C}.mrk-delta.up{color:#107C10}.mrk-delta.eq{color:#252423}',
    '.mrk-row{display:grid;gap:12px;align-items:stretch}',
    '.mrk-row-gb{grid-template-columns:minmax(0,1fr) minmax(0,2fr)}',
    '.mrk-row-mt{grid-template-columns:minmax(0,2fr) minmax(0,1fr)}',
    '.mrk-row-2{grid-template-columns:repeat(2,minmax(0,1fr))}',
    '.mrk-col{display:flex;flex-direction:column;gap:12px;min-width:0}',
    '.mrk-gauge{display:block;width:100%;max-width:300px;margin:4px auto 0;height:auto}',
    '.mrk-gauge-cap{text-align:center;font-size:12px;color:#605E5C;margin-top:6px;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:4px 8px}',
    '.mrk-levels{margin-top:14px;padding-top:10px;border-top:1px solid #EDEBE9}',
    '.mrk-levels .mrk-vt{margin-bottom:4px}',
    '.mrk-lv{width:100%;border-collapse:collapse}','.mrk-lv td{padding:4px 6px;font-size:12px;border-top:1px solid #EDEBE9}',
    '.mrk-lv td.r{text-align:right;color:#605E5C;font-variant-numeric:tabular-nums}',
    '.mrk-levels tr.on td{background:#F3F2F1;font-weight:600}',
    '.mrk-you{font-weight:400;color:#605E5C;font-size:11.5px}',
    '.mrk-legend{display:flex;flex-wrap:wrap;gap:4px 14px;font-size:12px;color:#605E5C;margin:0 0 8px}',
    '.mrk-legend li{display:flex;align-items:center;gap:5px}',
    '.mrk-legend i{display:inline-block;width:10px;height:10px;border-radius:2px}',
    '.mrk-legend i.tgt{width:16px;height:0;border-top:2px dashed #252423;border-radius:0}',
    '.mrk-bars-host svg{display:block;width:100%;height:auto;overflow:visible}',
    '.mrk-bars-host text{font-family:"Segoe UI","Segoe UI Web",Arial,sans-serif}',
    '.mrk-bar{cursor:default}',
    '.mrk-bar:hover rect.v,.mrk-bar:focus rect.v{opacity:.82}',
    '.mrk-mx{width:100%;border-collapse:collapse;font-size:12.5px;line-height:1.45}',
    '.mrk-mx th{background:#F3F2F1;font-weight:600;text-align:left;padding:7px 8px;font-size:12px;color:#252423;white-space:nowrap}',
    '.mrk-mx td{padding:8px;border-top:1px solid #EDEBE9;vertical-align:top}',
    '.mrk-mx tbody tr:first-child td{border-top:none}',
    '.mrk-mx .mrk-sc{font-weight:600;text-align:center;white-space:nowrap;font-variant-numeric:tabular-nums}',
    '.mrk-mx .mrk-pri{font-weight:600;white-space:nowrap}',
    '.mrk-mx .mrk-q{display:block;margin-top:2px}',
    '.mrk-mx .mrk-ans{display:block;color:#605E5C;font-size:12px;margin-top:2px}',
    '.mrk-mx .mrk-why{display:block;color:#605E5C;font-size:12px;margin-top:6px}',
    '.mrk-mx .mrk-a90{display:block;margin-top:6px;color:#605E5C;font-size:12px}',
    '.mrk-mx .mrk-a90 b{color:#252423}',
    '.mrk-mx .mrk-st{white-space:nowrap}',
    '.mrk-note{font-size:12px;color:#605E5C;margin-top:8px}',
    '.mrk-text p{font-size:13px;color:#252423;margin-bottom:8px}',
    '.mrk-text p:last-child{margin-bottom:0}',
    '.mrk-text .mrk-lead{font-weight:600}',
    '.mrk-text .mrk-k{font-size:12px;font-weight:600;color:#605E5C;margin:10px 0 2px}',
    '.mrk-read li{font-size:12.5px;color:#252423;padding:5px 0;border-top:1px solid #EDEBE9}',
    '.mrk-read li:first-child{border-top:none;padding-top:0}',
    '.mrk-read b{font-weight:600}',
    '.mrk-gantt{margin-top:4px}',
    '.mrk-gr{display:grid;grid-template-columns:104px minmax(0,1fr);column-gap:12px;align-items:start}',
    '.mrk-gw{font-size:12px;font-weight:600;color:#252423;padding-top:5px}',
    '.mrk-gt{position:relative;padding:22px 8px 10px 0;background-image:linear-gradient(to right,#EDEBE9 1px,transparent 1px);background-repeat:repeat-x;border-bottom:1px solid #EDEBE9}',
    '.mrk-gt p{font-size:12.5px;color:#252423;padding-left:6px}',
    '.mrk-gbar{position:absolute;top:8px;height:10px;border-radius:2px;min-width:6px}',
    '.mrk-ms{position:absolute;top:7px;width:12px;height:12px;transform:translateX(-100%) rotate(45deg)}',
    '.mrk-gax .mrk-gaxl{display:grid;font-size:12px;color:#605E5C;border-bottom:1px solid #E1DFDD;padding-bottom:4px}',
    '.mrk-gax .mrk-gaxl span{padding-left:6px;border-left:1px solid #EDEBE9}',
    '.mrk-svcs{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px;margin-top:4px}',
    '.mrk-svc{display:flex;flex-direction:column;gap:4px;text-decoration:none;border:1px solid #E1DFDD;border-top:3px solid #12239E;border-radius:4px;padding:12px 14px;color:#252423;font-size:12.5px;background:#fff}',
    '.mrk a.mrk-svc{color:#252423}',
    '.mrk-svc:hover{background:#FAF9F8;border-color:#C8C6C4;border-top-color:#118DFF}',
    '.mrk-svc-for{font-size:12px;color:#605E5C}',
    '.mrk-svc b{font-size:14px;font-weight:600;color:#252423}',
    '.mrk-svc-url{font-size:12px;color:#12239E;margin-top:auto;padding-top:4px;text-decoration:underline;overflow-wrap:break-word}',
    '.mrk-cta{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 16px;margin-top:12px;padding-top:12px;border-top:1px solid #EDEBE9;font-size:13px}',
    '.mrk-cta p{flex:1 1 320px}',
    '.mrk-btn{display:inline-block;background:#12239E;color:#fff !important;text-decoration:none;font-weight:600;font-size:13.5px;padding:10px 18px;border-radius:2px;white-space:nowrap}',
    '.mrk-btn:hover{background:#0B1A7A}',
    '.mrk-std-note{font-size:12px;color:#605E5C;margin:0 0 8px}',
    '.mrk-ans-d summary{cursor:pointer;font-size:13px;font-weight:600;color:#252423;list-style:revert}',
    '.mrk-ans-d[open] summary{margin-bottom:8px}',
    '.mrk-ans-t td,.mrk-ans-t th{font-size:12px}',
    '.mrk-ans-t .mrk-grp td{background:#FAF9F8;font-weight:600;border-top:1px solid #E1DFDD}',
    '.mrk-ans-t .r{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}',
    '.mrk-tip{position:fixed;z-index:9999;background:#252423;color:#fff;font-size:12px;line-height:1.45;padding:7px 10px;border-radius:2px;max-width:280px;pointer-events:none;box-shadow:0 2px 6px rgba(0,0,0,.25);font-family:"Segoe UI","Segoe UI Web",Arial,sans-serif}',
    '.mrk-tip b{font-weight:600}',
    '.mrk-tip[hidden]{display:none}',
    '.mrk-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}',
    '@media(max-width:900px){.mrk-row-gb,.mrk-row-mt,.mrk-row-2{grid-template-columns:minmax(0,1fr)}}',
    '@media(max-width:860px){.mrk-cards{grid-template-columns:repeat(2,minmax(0,1fr))}}',
    '@media(max-width:640px){',
    ' .mrk-mx thead{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}',
    ' .mrk-mx,.mrk-mx tbody,.mrk-mx tr,.mrk-mx td{display:block;width:100%}',
    ' .mrk-mx tr{border-top:1px solid #E1DFDD;padding:6px 0}',
    ' .mrk-mx tbody tr:first-child{border-top:none}',
    ' .mrk-mx td{border-top:none;padding:3px 0}',
    ' .mrk-mx td[data-l]::before{content:attr(data-l);display:block;font-size:11.5px;color:#605E5C;font-weight:400}',
    ' .mrk-mx .mrk-sc{text-align:left;display:inline-block;width:auto;padding:2px 10px;margin:2px 0}',
    ' .mrk-mx td.mrk-sc::before{display:none}',
    ' .mrk-ans-t .mrk-grp td{padding:6px}',
    ' .mrk-gr{grid-template-columns:minmax(0,1fr)}',
    ' .mrk-gw{padding-top:8px}',
    ' .mrk-gax .mrk-gw{display:none}',
    '}',
    '@media(max-width:480px){.mrk{padding:0 8px 8px}.mrk-band{margin:0 -8px;padding:12px}.mrk-tabs{margin:-8px -8px 0}.mrk-cards{grid-template-columns:minmax(0,1fr)}.mrk-tile{padding:12px}.mrk-val{font-size:34px}.mrk-title{font-size:18px}}',
    '@media print{.mrk{background:#fff;padding:0}.mrk-tabs,.mrk-tip,.mrk-btn{display:none !important}.mrk-tile{box-shadow:none;break-inside:avoid;page-break-inside:avoid}.mrk-band,.mrk-chip,.mrk-mx td,.mrk-gbar,.mrk-ms,.mrk-legend i,.mrk-dot,.mrk-chip i{-webkit-print-color-adjust:exact;print-color-adjust:exact}.mrk-cards{grid-template-columns:repeat(4,1fr)}.mrk-row-gb{grid-template-columns:1fr 2fr}.mrk-row-mt{grid-template-columns:2fr 1fr}.mrk-ans-d{display:none}}'
  ].join('\n');

  function injectCss() {
    if (typeof document === 'undefined' || document.getElementById('mrk-css')) return;
    var s = document.createElement('style');
    s.id = 'mrk-css';
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  /* ── SVG visuals ─────────────────────────────────────────────────── */
  function arcPath(cx, cy, r1, r2, v1, v2) {
    var P = function (r, v) { var t = Math.PI * (1 - v / 100); return [(cx + r * Math.cos(t)).toFixed(2), (cy - r * Math.sin(t)).toFixed(2)]; };
    var a = P(r2, v1), b = P(r2, v2), c = P(r1, v2), d = P(r1, v1);
    var large = 0; /* a half donut never exceeds 180 degrees */
    return 'M' + a[0] + ' ' + a[1] + 'A' + r2 + ' ' + r2 + ' 0 ' + large + ' 1 ' + b[0] + ' ' + b[1] +
      'L' + c[0] + ' ' + c[1] + 'A' + r1 + ' ' + r1 + ' 0 ' + large + ' 0 ' + d[0] + ' ' + d[1] + 'Z';
  }
  function gaugeSvg(m) {
    var o = m.overall, p = Math.max(0, Math.min(100, Number(o.pct) || 0)), b = band(p), tg = m.target;
    var cx = 130, cy = 124, rO = 100, rI = 70;
    var desc = 'Overall score ' + p + ' out of 100, level ' + o.label + '. ' + vsTarget(p, tg) + '.';
    var s = '<svg class="mrk-gauge" viewBox="0 0 260 150" role="img" aria-labelledby="mrk-g-t"><title id="mrk-g-t">' + esc(desc) + '</title>';
    s += '<path d="' + arcPath(cx, cy, rI, rO, 0, 100) + '" fill="#EDEBE9"/>';
    if (p > 0) s += '<path d="' + arcPath(cx, cy, rI, rO, 0, Math.min(99.99, p)) + '" fill="' + b.color + '" data-tip="' + esc('Overall score\n' + p + ' out of 100 (' + o.points + ' of ' + o.max + ' points)\n' + b.label + ': ' + vsTarget(p, tg)) + '"/>';
    var t = Math.PI * (1 - tg / 100), ct = Math.cos(t), st = Math.sin(t);
    s += '<line x1="' + (cx + (rI - 6) * ct).toFixed(1) + '" y1="' + (cy - (rI - 6) * st).toFixed(1) + '" x2="' + (cx + (rO + 6) * ct).toFixed(1) + '" y2="' + (cy - (rO + 6) * st).toFixed(1) + '" stroke="#252423" stroke-width="2.5"/>';
    s += '<text x="' + (cx + (rO + 10) * ct + 2).toFixed(1) + '" y="' + (cy - (rO + 10) * st + 2).toFixed(1) + '" font-size="12" font-weight="600" fill="#252423">Target ' + tg + '</text>';
    s += '<text x="' + (cx - (rO + rI) / 2) + '" y="' + (cy + 17) + '" text-anchor="middle" font-size="12" fill="#605E5C">0</text>';
    s += '<text x="' + (cx + (rO + rI) / 2) + '" y="' + (cy + 17) + '" text-anchor="middle" font-size="12" fill="#605E5C">100</text>';
    s += '<text x="' + cx + '" y="' + (cy - 14) + '" text-anchor="middle" font-size="44" font-weight="300" fill="#252423">' + p + '</text>';
    s += '<text x="' + cx + '" y="' + (cy + 4) + '" text-anchor="middle" font-size="12" fill="#605E5C">out of 100</text>';
    return s + '</svg>';
  }
  function textW(str, px) { return String(str).length * px * 0.54; }
  function splitLabel(name, maxW, px, maxLines) {
    if (textW(name, px) <= maxW) return [name];
    var words = String(name).split(' '), a = '', lines = [];
    words.forEach(function (w) {
      var t = a ? a + ' ' + w : w;
      if (textW(t, px) > maxW && a) { lines.push(a); a = w; } else a = t;
    });
    if (a) lines.push(a);
    return lines.slice(0, maxLines || 2);
  }
  function barsSvg(m, W) {
    W = Math.max(260, Math.round(W || 640));
    var list = m.sorted, n = list.length, tg = m.target;
    var narrow = W < 520;
    var labelW = narrow ? 0 : Math.min(230, Math.round(W * 0.34));
    var x0 = narrow ? 0 : labelW + 12, padR = 46, top = 30;
    var rich = !narrow && n <= 6;
    var rowH = narrow ? 46 : (n > 6 ? 34 : 84), barH = narrow ? 16 : (n > 6 ? 18 : 26);
    var plotW = W - x0 - padR, bottom = top + n * rowH, H = bottom + 22;
    var X = function (v) { return (x0 + plotW * v / 100).toFixed(1); };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-labelledby="mrk-b-t"><title id="mrk-b-t">' +
      esc('Bar chart: score by ' + m.areaLabel + ', weakest first, with the target of ' + tg + ' marked. ' +
        list.map(function (d) { return d.name + ' ' + d.pct + '%'; }).join(', ') + '.') + '</title>';
    [0, 25, 50, 75, 100].forEach(function (v) {
      s += '<line x1="' + X(v) + '" y1="' + (top - 6) + '" x2="' + X(v) + '" y2="' + bottom + '" stroke="#EDEBE9" stroke-width="1"/>';
      s += '<text x="' + X(v) + '" y="' + (H - 5) + '" text-anchor="' + (v === 0 ? 'start' : v === 100 ? 'end' : 'middle') + '" font-size="11" fill="#605E5C">' + v + '</text>';
    });
    var tx = X(tg);
    s += '<line x1="' + tx + '" y1="' + (top - 10) + '" x2="' + tx + '" y2="' + bottom + '" stroke="#252423" stroke-width="1.5" stroke-dasharray="4 3"/>';
    s += '<text x="' + (Number(tx) + 4) + '" y="' + (top - 12) + '" font-size="11.5" font-weight="600" fill="#252423">Target ' + tg + '</text>';
    list.forEach(function (d, k) {
      var b = band(d.pct), yR = top + k * rowH, by = narrow ? yR + 22 : yR + (rowH - barH) / 2;
      var bw = Math.max(d.pct > 0 ? 2 : 0, plotW * Math.min(100, d.pct) / 100);
      var tip = d.name + '\n' + d.pct + '% (' + d.points + ' of ' + d.max + ' points)\n' + b.label + ': ' + vsTarget(d.pct, tg) +
        (d.meaning ? '\n' + d.meaning : '') + (d.detail ? '\n' + d.detail : '');
      s += '<g class="mrk-bar" tabindex="0" role="img" aria-label="' + esc(tip.replace(/\n/g, '. ')) + '" data-tip="' + esc(tip) + '">';
      s += '<rect x="0" y="' + yR + '" width="' + W + '" height="' + rowH + '" fill="transparent"/>';
      if (narrow) {
        s += '<text x="0" y="' + (yR + 15) + '" font-size="12.5" font-weight="600" fill="#252423">' + esc(d.name) + '</text>';
      } else if (rich) {
        var sub = splitLabel([d.meaning, d.detail].filter(Boolean).join(' '), labelW, 11, 3), blk = 16 + sub.length * 14;
        var y0 = yR + (rowH - blk) / 2 + 12;
        s += '<text x="' + labelW + '" y="' + y0.toFixed(1) + '" text-anchor="end" font-size="13" font-weight="600" fill="#252423">' + esc(d.name) + '</text>';
        sub.forEach(function (l, j) { s += '<text x="' + labelW + '" y="' + (y0 + 16 + j * 14).toFixed(1) + '" text-anchor="end" font-size="11" fill="#605E5C">' + esc(l) + '</text>'; });
      } else {
        var lines = splitLabel(d.name, labelW, 12.5), ly = by + barH / 2 + 4.5 - (lines.length - 1) * 7.5;
        lines.forEach(function (l, j) { s += '<text x="' + labelW + '" y="' + (ly + j * 15).toFixed(1) + '" text-anchor="end" font-size="12.5" fill="#252423">' + esc(l) + '</text>'; });
      }
      if (bw > 0) s += '<rect class="v" x="' + x0 + '" y="' + by + '" width="' + bw.toFixed(1) + '" height="' + barH + '" fill="' + b.color + '"/>';
      s += '<text x="' + (x0 + bw + 6).toFixed(1) + '" y="' + (by + barH / 2 + 4.5) + '" font-size="12" font-weight="600" fill="#252423" stroke="#fff" stroke-width="4" stroke-linejoin="round" paint-order="stroke">' + d.pct + '%</text></g>';
    });
    return s + '</svg>';
  }

  /* ── Dashboard HTML ──────────────────────────────────────────────── */
  function chip(b, txt) {
    return '<span class="mrk-chip" style="background:' + b.tint + '"><i style="background:' + b.color + '"></i>' + esc(txt || b.label) + '</span>';
  }
  function statusCell(pct) { var b = band(pct); return '<span class="mrk-dot" style="background:' + b.color + '"></span>' + esc(b.label); }
  function legendHtml(tg) {
    return '<ul class="mrk-legend" aria-label="Colour key">' + BANDS.map(function (b) {
      return '<li><i style="background:' + b.color + '"></i>' + esc(b.label + ' (' + b.range + ')') + '</li>';
    }).join('') + '<li><i class="tgt"></i>Target ' + tg + '</li></ul>';
  }
  function headerHtml(m) {
    var resp = [m.respondent, m.role].filter(Boolean).join(', ');
    var f = [['Organisation', m.org || 'Not given'], ['Respondent', resp || 'Not given'], ['Date', m.date], ['Basis', m.basisLine]];
    return '<header class="mrk-band"><div class="mrk-band-top"><h2 class="mrk-title">' + esc(m.title) + '</h2><span class="mrk-brand">M.A.I. Consulting</span></div>' +
      (m.subtitle ? '<p class="mrk-instr">' + esc(m.subtitle) + '</p>' : '') +
      '<dl class="mrk-filters" aria-label="Report context">' + f.map(function (x) { return '<div><dt>' + esc(x[0]) + ':</dt><dd>' + esc(x[1]) + '</dd></div>'; }).join('') + '</dl></header>';
  }
  function deltaHtml(pct, tg) {
    var d = Math.round(pct - tg), cls = d < 0 ? 'dn' : d > 0 ? 'up' : 'eq', ar = d < 0 ? '&#9660;' : d > 0 ? '&#9650;' : '&#9679;';
    return '<span class="mrk-delta ' + cls + '" aria-label="' + esc(vsTarget(pct, tg)) + '"><span aria-hidden="true">' + ar + ' ' + (d > 0 ? '+' : '') + d + '</span></span>';
  }
  function cardsHtml(m) {
    var o = m.overall, ob = band(o.pct), S = m.strongest, W = m.weakest, tg = m.target;
    var card = function (title, val, unit, extra, lines, tip) {
      return '<section class="mrk-tile mrk-card"' + (tip ? ' tabindex="0" data-tip="' + esc(tip) + '"' : '') + '><h3 class="mrk-vt">' + esc(title) + '</h3><div class="mrk-val">' + esc(val) +
        (unit ? '<small>' + esc(unit) + '</small>' : '') + (extra || '') + '</div>' + lines.map(function (l) { return '<p class="mrk-line">' + l + '</p>'; }).join('') + '</section>';
    };
    var h = '<div class="mrk-cards">';
    h += card('Overall score', o.pct, '/100', chip(ob, o.label),
      ['vs target ' + tg + ': ' + deltaHtml(o.pct, tg), esc(o.points + ' of ' + o.max + ' points, scaled to 100')],
      'Overall score\n' + o.pct + ' out of 100, level ' + o.label + '\n' + vsTarget(o.pct, tg));
    h += card('Strongest ' + m.areaLabel, S.pct, '%', '', ['<b>' + esc(S.name) + '</b>', esc(S.points + ' of ' + S.max + ' points, ' + band(S.pct).label.toLowerCase())],
      'Strongest ' + m.areaLabel + '\n' + S.name + ': ' + S.pct + '%\n' + vsTarget(S.pct, tg));
    h += card('Weakest ' + m.areaLabel, W.pct, '%', '', ['<b>' + esc(W.name) + '</b>', esc(W.points + ' of ' + W.max + ' points, ' + band(W.pct).label.toLowerCase())],
      'Weakest ' + m.areaLabel + '\n' + W.name + ': ' + W.pct + '%\n' + vsTarget(W.pct, tg));
    h += card(cap(m.areaPlural) + ' below target', m.below, 'of ' + m.dims.length, '',
      [esc(cap(m.areaPlural) + ' under ' + tg + '%, worked on first'), esc(m.cardNote || '')].filter(function (x) { return x; }),
      cap(m.areaPlural) + ' below target\n' + m.below + ' of ' + m.dims.length + ' score under ' + tg + '%');
    return h + '</div>';
  }
  function levelsHtml(m) {
    if (!m.levels || !m.levels.length) return '';
    return '<div class="mrk-levels"><h4 class="mrk-vt">The six readiness levels</h4><table class="mrk-lv"><tbody>' + m.levels.map(function (l) {
      var on = l.label === m.overall.label, b = band(l.from);
      return '<tr' + (on ? ' class="on"' : '') + '><td><span class="mrk-dot" style="background:' + b.color + '"></span>' + esc(l.label) + (on ? ' <span class="mrk-you">your level</span>' : '') + '</td><td class="r">' + esc(l.from + ' to ' + l.to) + '</td></tr>';
    }).join('') + '</tbody></table></div>';
  }
  function matrixHtml(m) {
    var ext = m.gaps.some(function (g) { return g.action90; });
    var h = '<section class="mrk-tile"><div class="mrk-vt-row"><h3 class="mrk-vt">Priority gaps: what to fix first</h3><span class="mrk-vt-sub">' + esc(m.gapsNote || '') + '</span></div>';
    if (!m.gaps.length) {
      return h + '<p class="mrk-note" style="margin-top:0">No answer fell below its threshold, so there is no gap to rank. Use the action plan to keep the standard current.</p></section>';
    }
    h += '<table class="mrk-mx"><thead><tr><th scope="col">Priority</th><th scope="col">' + esc(cap(m.areaLabel)) + ' and what scored low</th><th scope="col">Status</th><th scope="col">Score</th><th scope="col">Next 30 days</th></tr></thead><tbody>';
    m.gaps.forEach(function (g, i) {
      var b = band(g.pct);
      var low = '<b>' + esc(g.dim) + '</b>' + (g.behaviour ? '<span class="mrk-q">' + esc(g.behaviour) + '</span>' : '') + (g.answer ? '<span class="mrk-ans">You answered: ' + esc(g.answer) + '</span>' : '');
      (g.extra || []).forEach(function (x) { low += '<span class="mrk-q">' + esc(x.behaviour) + '</span>' + (x.answer ? '<span class="mrk-ans">You answered: ' + esc(x.answer) + '</span>' : ''); });
      if (g.why) low += '<span class="mrk-why">Why it matters: ' + esc(g.why) + '</span>';
      var act = esc(g.action30 || '') + (g.action90 ? '<span class="mrk-a90"><b>By day 90:</b> ' + esc(g.action90) + '</span>' : '');
      h += '<tr><td class="mrk-pri" data-l="Priority">' + (i + 1) + ' ' + esc(g.priority || '') + '</td><td>' + low + '</td><td class="mrk-st" data-l="Status">' + statusCell(g.pct) +
        '</td><td class="mrk-sc" style="background:' + b.tint + '" data-tip="' + esc(g.dim + '\nScore ' + (g.scoreText || g.pct + '%') + '\n' + b.label) + '">' + esc(g.scoreText || g.pct + '%') + '</td><td data-l="Next 30 days">' + act + '</td></tr>';
    });
    h += '</tbody></table>';
    if (ext) h += '';
    return h + '</section>';
  }
  function meansHtml(m) {
    var o = m.overall;
    var h = '<section class="mrk-tile mrk-text"><h3 class="mrk-vt">What this score means</h3>';
    h += '<p class="mrk-lead">' + esc(o.pct + '/100, ' + o.label + '. ' + vsTarget(o.pct, m.target) + '.') + '</p>';
    if (m.levelMeaning) h += '<p>' + esc(m.levelMeaning) + '</p>';
    if (m.pattern) h += '<p class="mrk-k">Pattern in your answers</p><p>' + esc(m.pattern) + '</p>';
    return h + '</section>';
  }
  function readHtml(m) {
    return '<section class="mrk-tile"><h3 class="mrk-vt">How to read this page</h3><ul class="mrk-read">' + m.howToRead.map(function (l) {
      var i = String(l).indexOf(':');
      return '<li>' + (i > 0 && i < 40 ? '<b>' + esc(l.slice(0, i + 1)) + '</b>' + esc(l.slice(i + 1)) : esc(l)) + '</li>';
    }).join('') + '</ul></section>';
  }
  function ganttHtml(title, sub, items, axis) {
    var its = planItems(items), n = axis.length;
    var h = '<section class="mrk-tile"><div class="mrk-vt-row"><h3 class="mrk-vt">' + esc(title) + '</h3><span class="mrk-vt-sub">' + esc(sub) + '</span></div><ol class="mrk-gantt">';
    h += '<li class="mrk-gr mrk-gax" aria-hidden="true"><span class="mrk-gw"></span><div class="mrk-gaxl" style="grid-template-columns:repeat(' + n + ',1fr)">' + axis.map(function (a) { return '<span>' + esc(a) + '</span>'; }).join('') + '</div></li>';
    its.forEach(function (it, k) {
      var col = T.palette[k % T.palette.length];
      var mark = it.ms ? '<span class="mrk-ms" style="left:' + (it.start * 100).toFixed(2) + '%;background:' + col + '"></span>'
        : '<span class="mrk-gbar" style="left:' + (it.start * 100).toFixed(2) + '%;width:' + ((it.end - it.start) * 100).toFixed(2) + '%;background:' + col + '"></span>';
      h += '<li class="mrk-gr"><span class="mrk-gw">' + esc(it.when) + '</span><div class="mrk-gt" style="background-size:' + (100 / n).toFixed(4) + '% 22px">' + mark + '<p>' + esc(it.text) + '</p></div></li>';
    });
    return h + '</ol></section>';
  }
  function servicesHtml(m) {
    var h = '<section class="mrk-tile"><div class="mrk-vt-row"><h3 class="mrk-vt">How M.A.I. Consulting can help</h3><span class="mrk-vt-sub">Matched to your weakest ' + esc(m.areaPlural) + ', weakest first</span></div><div class="mrk-svcs">';
    m.services.forEach(function (s) {
      h += '<a class="mrk-svc" href="' + esc(s.url) + '">' + (s.forDims && s.forDims.length ? '<span class="mrk-svc-for">For ' + esc(s.forDims.join(' and ')) + '</span>' : '') +
        '<b>' + esc(s.name) + '</b><span>' + esc(s.fixes) + '</span><span class=\"mrk-svc-url\">' + esc(shortUrl(s.url)).replace(/\//g, '/<wbr>') + '</span></a>';
    });
    h += '</div><div class="mrk-cta"><p><b>Talk it through with us.</b> A free 30-minute call to go through this report and agree the right first step. No pitch. Or write to <a href="mailto:' + esc(m.contactEmail) + '">' + esc(m.contactEmail) + '</a>.</p><a class="mrk-btn" href="' + esc(m.bookUrl) + '">Book a free 30-minute call</a></div>';
    return h + '</section>';
  }
  function standardsHtml(m) {
    if (!m.standards || !m.standards.length) return '';
    var h = '<section class="mrk-tile"><div class="mrk-vt-row"><h3 class="mrk-vt">Standards mapping (optional guidance)</h3><span class="mrk-vt-sub">Your three weakest ' + esc(m.areaPlural) + '</span></div>';
    h += '<p class="mrk-std-note">Where each gap sits in the frameworks this assessment references, useful if a board, funder or regulator asks. Indicative guidance only: not a compliance service, audit or legal advice. Check clause numbers against the current text before quoting them.</p>';
    h += '<table class="mrk-mx"><thead><tr><th scope="col">' + esc(cap(m.areaLabel)) + '</th><th scope="col">Status</th><th scope="col">Score</th><th scope="col">Where the gap sits</th></tr></thead><tbody>';
    m.standards.forEach(function (r) {
      var b = band(r.pct);
      h += '<tr><td data-l="' + esc(cap(m.areaLabel)) + '"><b>' + esc(r.dim) + '</b></td><td class="mrk-st" data-l="Status">' + statusCell(r.pct) + '</td><td class="mrk-sc" style="background:' + b.tint + '">' + esc(r.pct + '%') + '</td><td data-l="Frameworks">' + esc(r.frameworks) + '</td></tr>';
    });
    return h + '</tbody></table></section>';
  }
  function answersHtml(m) {
    if (!m.answers.length) return '';
    var h = '<section class="mrk-tile"><details class="mrk-ans-d"><summary>Answer detail: all ' + m.answers.length + ' questions, points against threshold</summary>';
    h += '<table class="mrk-mx mrk-ans-t"><thead><tr><th scope="col">Question</th><th scope="col">Your answer</th><th scope="col" class="r">Points</th><th scope="col" class="r">Threshold</th><th scope="col">Status</th></tr></thead><tbody>';
    var cur = null;
    m.answers.forEach(function (a) {
      if (a.dim !== cur) {
        cur = a.dim;
        var d = m.dims.filter(function (x) { return x.name === cur; })[0];
        h += '<tr class="mrk-grp"><td colspan="5">' + esc(cur) + (d ? ' <span style="font-weight:400;color:#605E5C">' + esc(d.points + ' of ' + d.max + ' points (' + d.pct + '%)') + '</span>' : '') + '</td></tr>';
      }
      var st = STATUS[a.status] || STATUS.none, scored = a.status !== 'info';
      h += '<tr><td data-l="Question">' + esc(a.question) + '</td><td data-l="Your answer">' + esc(a.answer == null ? '-' : a.answer) + '</td><td class="r" data-l="Points">' + (scored && a.points != null ? esc(a.points + ' / ' + a.max) : '-') +
        '</td><td class="r" data-l="Threshold">' + (scored && a.threshold != null ? esc(a.threshold) : '-') + '</td><td class="mrk-st" data-l="Status"><span class="mrk-dot" style="background:' + st.color + '"></span>' + esc(st.label) + '</td></tr>';
    });
    return h + '</tbody></table></details></section>';
  }
  function dashHtml(m) {
    var ext = !!(m.plan90 && m.plan90.length);
    var h = '<div class="mrk" data-kind="' + esc(m.kind || '') + '">';
    h += headerHtml(m);
    h += '<nav class="mrk-tabs" aria-label="Report sections"><a href="#mrk-overview" class="on">Overview</a><a href="#mrk-actions">Gaps and actions</a><a href="#mrk-help">How we can help</a>' + (m.answers.length ? '<a href="#mrk-answers">Answer detail</a>' : '') + '</nav>';
    h += '<div class="mrk-sec" id="mrk-overview">' + cardsHtml(m);
    h += '<div class="mrk-row mrk-row-gb"><section class="mrk-tile"><h3 class="mrk-vt">Overall score vs target</h3>' + gaugeSvg(m) +
      '<p class="mrk-gauge-cap">' + chip(band(m.overall.pct), 'Level: ' + m.overall.label) + (m.overall.range ? '<span>' + esc(m.overall.range) + ' on the 0 to 100 scale</span>' : '') + '</p>' + levelsHtml(m) + '</section>';
    h += '<section class="mrk-tile"><div class="mrk-vt-row"><h3 class="mrk-vt">Score by ' + esc(m.areaLabel) + ' vs target</h3><span class="mrk-vt-sub">Weakest first. Hover or tab to a bar for its meaning.</span></div>' + legendHtml(m.target) + '<div class="mrk-bars-host"></div></section></div>';
    h += '<div class="mrk-row mrk-row-mt" id="mrk-actions">' + matrixHtml(m) + '<div class="mrk-col">' + meansHtml(m) + readHtml(m) + '</div></div></div>';
    h += '<div class="mrk-sec">';
    if (ext) h += '<div class="mrk-row mrk-row-2">';
    h += ganttHtml('Your next 30 days', 'Tick each step when done', m.plan30, AX30);
    if (ext) h += ganttHtml('Days 31 to 90', 'Weakest ' + m.areaLabel + ' first', m.plan90, m.plan90Axis || AX90) + '</div>';
    h += '</div>';
    h += '<div class="mrk-sec" id="mrk-help">' + servicesHtml(m) + standardsHtml(m) + '</div>';
    if (m.answers.length) h += '<div class="mrk-sec" id="mrk-answers">' + answersHtml(m) + '</div>';
    h += '<div class="mrk-tip" role="tooltip" hidden></div></div>';
    return h;
  }

  function drawBars(el) {
    var m = el.__mrkModel, host = el.querySelector('.mrk-bars-host');
    if (!m || !host) return;
    var w = host.clientWidth || 0;
    el.__mrkBarW = w;
    host.innerHTML = barsSvg(m, w || 640);
  }
  function bindTips(el) {
    if (el.__mrkTips) return;
    el.__mrkTips = true;
    var show = function (target, x, y) {
      var tip = el.querySelector('.mrk-tip');
      if (!tip) return;
      var txt = target.getAttribute('data-tip') || '';
      tip.innerHTML = txt.split('\n').map(function (l, i) { return i === 0 ? '<b>' + esc(l) + '</b>' : esc(l); }).join('<br>');
      tip.hidden = false;
      var vw = window.innerWidth || 1024, vh = window.innerHeight || 768, r = tip.getBoundingClientRect();
      var left = x + 14, top = y + 14;
      if (left + r.width > vw - 8) left = Math.max(8, x - r.width - 14);
      if (top + r.height > vh - 8) top = Math.max(8, y - r.height - 14);
      tip.style.left = left + 'px'; tip.style.top = top + 'px';
    };
    var hide = function () { var tip = el.querySelector('.mrk-tip'); if (tip) tip.hidden = true; };
    var find = function (e) { var t = e.target; return t && t.closest ? t.closest('[data-tip]') : null; };
    el.addEventListener('mousemove', function (e) { var t = find(e); if (t && el.contains(t)) show(t, e.clientX, e.clientY); else hide(); });
    el.addEventListener('mouseleave', hide);
    el.addEventListener('focusin', function (e) { var t = find(e); if (t) { var r = t.getBoundingClientRect(); show(t, r.left + Math.min(r.width, 120), r.top + r.height / 2); } });
    el.addEventListener('focusout', hide);
    el.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('.mrk-tabs a') : null;
      if (!a) return;
      var all = el.querySelectorAll('.mrk-tabs a');
      for (var i = 0; i < all.length; i++) all[i].classList.remove('on');
      a.classList.add('on');
    });
  }
  function bindResize(el) {
    if (el.__mrkResize || typeof window === 'undefined') return;
    el.__mrkResize = true;
    var t = null;
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        var host = el.querySelector('.mrk-bars-host');
        if (!host) return;
        if (Math.abs((host.clientWidth || 0) - (el.__mrkBarW || 0)) > 16) drawBars(el);
      }, 150);
    });
  }
  function renderDashboard(el, model) {
    if (!el) return;
    injectCss();
    var m = normalize(model);
    el.__mrkModel = m;
    el.innerHTML = dashHtml(m);
    drawBars(el);
    bindTips(el);
    bindResize(el);
  }

  /* ── PDF (jsPDF, A4 landscape, vector only) ──────────────────────── */
  function clean(s) {
    s = String(s == null ? '' : s)
      .replace(/[‘’‚′]/g, "'").replace(/[“”„″]/g, '"')
      .replace(/[‐-―−]/g, '-').replace(/…/g, '...').replace(/[→➔]/g, '->').replace(/←/g, '<-')
      .replace(/≥/g, '>=').replace(/≤/g, '<=').replace(/[•●▪]/g, '-')
      .replace(/[ -   ]/g, ' ').replace(/[​-‍⁠﻿]/g, '');
    s = s.replace(/[^\x00-\xFF]/g, function (ch) {
      var n = ch.normalize ? ch.normalize('NFKD').replace(/[̀-ͯ]/g, '') : '';
      return /^[\x20-\xFF]+$/.test(n) ? n : '';
    });
    return s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  }
  function rgb(hex) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '#000000');
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [0, 0, 0];
  }

  function buildPdf(JsPDF, model) {
    var m = normalize(model);
    var doc = new JsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4', compress: true });
    doc.setProperties({ title: clean(m.title + (m.org ? ': ' + m.org : '')), subject: clean(m.subtitle), author: 'M.A.I. Consulting', creator: 'M.A.I. Consulting' });
    var PW = 297, PH = 210, M = 10, CW = PW - 2 * M, TOP = 24, BOT = 198, G = 4;
    var tg = m.target;

    var fill = function (h) { var c = rgb(h); doc.setFillColor(c[0], c[1], c[2]); };
    var stroke = function (h) { var c = rgb(h); doc.setDrawColor(c[0], c[1], c[2]); };
    var font = function (sz, bold, col) { doc.setFont('helvetica', bold ? 'bold' : 'normal'); doc.setFontSize(sz); var c = rgb(col || T.text); doc.setTextColor(c[0], c[1], c[2]); };
    var lh = function (sz) { return sz * 0.3528 * 1.24; };
    var text = function (t, x, y, o) { doc.text(Array.isArray(t) ? t.map(clean) : clean(t), x, y, o); };
    var split = function (t, w) { return doc.splitTextToSize(clean(t), Math.max(4, w)); };
    var tw = function (t) { return doc.getTextWidth(clean(t)); };
    var fit = function (t, w) {
      t = clean(t); if (tw(t) <= w) return t;
      while (t.length > 1 && tw(t + '...') > w) t = t.slice(0, -1);
      return t.replace(/\s+$/, '') + '...';
    };
    var clip = function (lines, n) {
      if (lines.length <= n) return lines;
      var out = lines.slice(0, n); out[n - 1] = out[n - 1].replace(/[\s,.;:]+$/, '') + '...'; return out;
    };
    var tile = function (x, y, w, h, title, sub) {
      fill(T.tile); stroke(T.border); doc.setLineWidth(0.25); doc.rect(x, y, w, h, 'FD');
      if (title) { font(9, true); text(title, x + 4, y + 6.2); }
      if (sub) { font(7, false, T.text2); text(fit(sub, w - 12 - (title ? tw(title) : 0)), x + w - 4, y + 6.2, { align: 'right' }); }
    };
    var chipPdf = function (x, y, label, b, sz) {
      sz = sz || 7; font(sz, true); var w = tw(label) + 7.2, h = sz * 0.3528 + 2.4;
      fill(b.tint); doc.roundedRect(x, y - h + 1.1, w, h, h / 2, h / 2, 'F');
      fill(b.color); doc.circle(x + 2.6, y - h / 2 + 1.1, 1.05, 'F');
      font(sz, true, T.text); text(label, x + 4.6, y); return w;
    };
    var dot = function (x, y, col) { fill(col); doc.circle(x, y, 1.05, 'F'); };
    var pageHead = function (pageName) {
      fill(T.canvas); doc.rect(0, 0, PW, PH, 'F');
      fill(T.navy); doc.rect(0, 0, PW, 17.5, 'F');
      fill(T.accent); doc.rect(0, 17.5, PW, 1.05, 'F');
      font(14, true, '#FFFFFF'); text(m.title, M, 8.6);
      var tl = tw(m.title);
      if (m.subtitle) { font(8, false, T.bandText); text(fit(m.subtitle, 70), M + tl + 4, 8.6); }
      font(9, true, '#FFFFFF'); text('M.A.I. Consulting', PW - M, 8.6, { align: 'right' });
      font(8, true, '#FFFFFF'); text(pageName, PW - M, 14.4, { align: 'right' });
      var pn = tw(pageName) + 8;
      var resp = [m.respondent, m.role].filter(Boolean).join(', ') || 'Not given';
      var segs = [['Organisation: ', m.org || 'Not given', 70], ['Respondent: ', resp, 70], ['Date: ', m.date, 30], ['Basis: ', m.basisLine, 70]];
      var x = M, maxX = PW - M - pn;
      segs.forEach(function (s) {
        if (x >= maxX - 10) return;
        font(7.5, false, T.bandText); text(s[0], x, 14.4); x += tw(s[0]);
        font(7.5, true, '#FFFFFF'); var v = fit(s[1], Math.min(s[2], maxX - x)); text(v, x, 14.4); x += tw(v) + 6;
      });
    };

    /* ===== Page 1: Overview ===== */
    pageHead('Overview');
    var o = m.overall, ob = band(o.pct), S = m.strongest, W = m.weakest;
    (function cards() {
      var y = TOP, h = 29, w = (CW - 3 * G) / 4;
      var C = [
        { t: 'Overall score', v: String(o.pct), u: '/100', chip: [o.label, ob], l1: 'delta', l2: o.points + ' of ' + o.max + ' points, scaled to 100' },
        { t: 'Strongest ' + m.areaLabel, v: String(S.pct), u: '%', l1b: S.name, l2: S.points + ' of ' + S.max + ' points, ' + band(S.pct).label.toLowerCase() },
        { t: 'Weakest ' + m.areaLabel, v: String(W.pct), u: '%', l1b: W.name, l2: W.points + ' of ' + W.max + ' points, ' + band(W.pct).label.toLowerCase() },
        { t: cap(m.areaPlural) + ' below target', v: String(m.below), u: 'of ' + m.dims.length, l1: cap(m.areaPlural) + ' under ' + tg + '%, worked on first', l2: m.cardNote || '' }
      ];
      C.forEach(function (c, i) {
        var x = M + i * (w + G);
        tile(x, y, w, h, null);
        font(8, true); text(fit(c.t, w - 8), x + 4, y + 5.8);
        font(23, false); text(c.v, x + 4, y + 16.2); var vw = tw(c.v);
        font(9, false, T.text2); text(c.u, x + 4 + vw + 1, y + 16.2); var uw = tw(c.u);
        if (c.chip) chipPdf(x + 4 + vw + uw + 4, y + 15.4, fit(c.chip[0], w - vw - uw - 18), c.chip[1], 7);
        if (c.l1 === 'delta') {
          var d = Math.round(o.pct - tg); font(7.2, false, T.text2); var pre = 'vs target ' + tg + ': '; text(pre, x + 4, y + 21.6);
          var dx = x + 4 + tw(pre);
          fill(d < 0 ? '#A4262C' : d > 0 ? '#107C10' : T.text);
          if (d < 0) doc.triangle(dx, y + 19.4, dx + 2.6, y + 19.4, dx + 1.3, y + 21.5, 'F');
          else if (d > 0) doc.triangle(dx, y + 21.5, dx + 2.6, y + 21.5, dx + 1.3, y + 19.4, 'F');
          else doc.circle(dx + 1.3, y + 20.5, 0.9, 'F');
          font(7.2, true, d < 0 ? '#A4262C' : d > 0 ? '#107C10' : T.text); text((d > 0 ? '+' : '') + d, dx + 3.6, y + 21.6);
        } else if (c.l1b) { font(7.6, true); text(fit(c.l1b, w - 8), x + 4, y + 21.6); }
        else if (c.l1) { font(7.2, false, T.text2); text(fit(c.l1, w - 8), x + 4, y + 21.6); }
        if (c.l2) { font(7.2, false, T.text2); text(fit(c.l2, w - 8), x + 4, y + 25.6); }
      });
    })();

    var GAUGE_H = 67, rowY = TOP + 29 + G, leftW = 90, rightX = M + leftW + G, rightW = CW - leftW - G;
    (function gauge() {
      var y = rowY, h = GAUGE_H; tile(M, y, leftW, h, 'Overall score vs target');
      var cx = M + leftW / 2, cy = y + 49, rO = 31, rI = 22, p = Math.max(0, Math.min(100, o.pct));
      var arc = function (v0, v1, col) {
        var n = Math.max(3, Math.ceil((v1 - v0) / 1.5)), pts = [], P = function (v) { return Math.PI * (1 - v / 100); }, k, t;
        for (k = 0; k <= n; k++) { t = P(v0 + (v1 - v0) * k / n); pts.push([cx + rO * Math.cos(t), cy - rO * Math.sin(t)]); }
        for (k = n; k >= 0; k--) { t = P(v0 + (v1 - v0) * k / n); pts.push([cx + rI * Math.cos(t), cy - rI * Math.sin(t)]); }
        var rel = []; for (k = 1; k < pts.length; k++) rel.push([pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]]);
        fill(col); doc.lines(rel, pts[0][0], pts[0][1], [1, 1], 'F', true);
      };
      arc(0, 100, T.grid);
      if (p > 0) arc(0, p, ob.color);
      var t = Math.PI * (1 - tg / 100);
      stroke(T.target); doc.setLineWidth(0.7);
      doc.line(cx + (rI - 2) * Math.cos(t), cy - (rI - 2) * Math.sin(t), cx + (rO + 2.2) * Math.cos(t), cy - (rO + 2.2) * Math.sin(t));
      font(7, true); text('Target ' + tg, cx + (rO + 3.4) * Math.cos(t) + 0.6, cy - (rO + 3.4) * Math.sin(t) + 0.6);
      font(7, false, T.text2); text('0', cx - (rO + rI) / 2, cy + 4.2, { align: 'center' }); text('100', cx + (rO + rI) / 2, cy + 4.2, { align: 'center' });
      font(24, false); text(String(p), cx, cy - 4.5, { align: 'center' });
      font(7, false, T.text2); text('out of 100', cx, cy + 0.6, { align: 'center' });
      var lab = 'Level: ' + o.label; font(7.2, true); var cw = tw(lab) + 7.2;
      var capTxt = o.range ? o.range + ' on the 0 to 100 scale' : '';
      font(7, false); var rw = capTxt ? tw(capTxt) + 3 : 0;
      var sx = cx - (cw + rw) / 2;
      chipPdf(sx, y + h - 6.5, lab, ob, 7.2);
      if (capTxt) { font(7, false, T.text2); text(capTxt, sx + cw + 3, y + h - 6.5); }
    })();

    (function means() {
      var y = rowY + GAUGE_H + G, h = BOT - y, x = M, w = leftW;
      var lv = m.levels && m.levels.length ? m.levels : [], lvH = lv.length ? 7 + Math.ceil(lv.length / 2) * 4.2 : 0;
      tile(x, y, w, h, 'What this score means');
      var sz = 7.8, blocks;
      var build = function (s) {
        var out = []; font(s + 0.4, true); out.push({ lines: split(o.pct + '/100, ' + o.label + '. ' + vsTarget(o.pct, tg) + '.', w - 8), sz: s + 0.4, b: true, gap: 1.6 });
        font(s, false); if (m.levelMeaning) out.push({ lines: split(m.levelMeaning, w - 8), sz: s, gap: 2.2 });
        if (m.pattern) { out.push({ lines: ['Pattern in your answers'], sz: s - 0.6, b: true, col: T.text2, gap: 0.6 }); font(s, false); out.push({ lines: split(m.pattern, w - 8), sz: s, gap: 0 }); }
        return out;
      };
      var height = function (bl) { return bl.reduce(function (a, b) { return a + b.lines.length * lh(b.sz) + b.gap; }, 0); };
      blocks = build(sz);
      if (lv.length && height(blocks) > h - 15 - lvH) { lv = []; lvH = 0; }
      while (height(blocks) > h - 13 - lvH && sz > 6.4) { sz -= 0.2; blocks = build(sz); }
      var yy = y + 12.5, maxY = y + h - 3 - lvH;
      blocks.forEach(function (b) {
        font(b.sz, !!b.b, b.col || T.text);
        var room = Math.floor((maxY - yy) / lh(b.sz) + 0.2);
        if (room <= 0) return;
        var L = clip(b.lines, room);
        text(L, x + 4, yy, { lineHeightFactor: 1.24 }); yy += L.length * lh(b.sz) + b.gap;
      });
      if (lv.length) {
        /* the six readiness levels, current one highlighted */
        var ly = y + h - lvH;
        stroke(T.grid); doc.setLineWidth(0.25); doc.line(x + 4, ly, x + w - 4, ly);
        font(7, true, T.text2); text('The six readiness levels', x + 4, ly + 4.4);
        var colW = (w - 8) / 2, rows = Math.ceil(lv.length / 2);
        lv.forEach(function (l, i) {
          var cx = x + 4 + Math.floor(i / rows) * colW, cy = ly + 8.6 + (i % rows) * 4.2, on = l.label === o.label;
          if (on) { fill(T.canvas); doc.rect(cx - 1, cy - 2.9, colW - 1, 4, 'F'); }
          dot(cx + 1.2, cy - 0.9, band(l.from).color);
          font(6.9, on, T.text); text(l.label, cx + 3.4, cy);
          font(6.9, on, on ? T.text : T.text2); text(l.from + ' to ' + l.to, cx + colW - 3, cy, { align: 'right' });
        });
      }
    })();

    (function bars() {
      var y = rowY, h = BOT - rowY, x = rightX, w = rightW;
      tile(x, y, w, h, 'Score by ' + m.areaLabel + ' vs target', 'Weakest first');
      var lx = x + 4;
      BANDS.forEach(function (b) {
        fill(b.color); doc.rect(lx, y + 9.3, 2.6, 2.6, 'F'); font(6.8, false, T.text2); var t = b.label + ' (' + b.range + ')'; text(t, lx + 3.6, y + 11.7); lx += 3.6 + tw(t) + 5;
      });
      stroke(T.target); doc.setLineWidth(0.5); doc.setLineDashPattern([1.2, 0.9], 0); doc.line(lx, y + 10.6, lx + 5, y + 10.6); doc.setLineDashPattern([], 0);
      font(6.8, false, T.text2); text('Target ' + tg, lx + 6.5, y + 11.7);
      var list = m.sorted, n = list.length || 1;
      var labW = 62, x0 = x + 4 + labW + 3, x1 = x + w - 14, pw = x1 - x0;
      var top = y + 21, bottom = y + h - 9, rowH = (bottom - top) / n, barH = Math.min(8, rowH * 0.5);
      var X = function (v) { return x0 + pw * v / 100; };
      [0, 25, 50, 75, 100].forEach(function (v) {
        stroke(T.grid); doc.setLineWidth(0.25); doc.line(X(v), top - 1.5, X(v), bottom);
        font(6.8, false, T.text2); text(String(v), X(v), bottom + 4, { align: v === 0 ? 'left' : v === 100 ? 'right' : 'center' });
      });
      list.forEach(function (d, k) {
        var b = band(d.pct), ry = top + k * rowH, by = ry + (rowH - barH) / 2;
        var nameSz = n > 6 ? 7.6 : 8.4, mSz = n > 6 ? 6.1 : 6.8;
        font(nameSz, true); var nm = fit(d.name, labW);
        var meaning = [d.meaning, d.detail].filter(Boolean).join(' ');
        font(mSz, false); var ml = split(meaning, labW);
        var maxL = Math.max(0, Math.min(n > 6 ? 2 : 4, Math.floor((rowH - lh(nameSz) - 1.2) / lh(mSz))));
        ml = clip(ml, maxL);
        var blockH = lh(nameSz) + ml.length * lh(mSz);
        var ty = ry + (rowH - blockH) / 2 + lh(nameSz) * 0.78;
        font(nameSz, true); text(nm, x + 4, ty);
        if (ml.length) { font(mSz, false, T.text2); text(ml, x + 4, ty + lh(nameSz) - 0.2, { lineHeightFactor: 1.24 }); }
        var bw = pw * Math.min(100, d.pct) / 100;
        if (bw > 0) { fill(b.color); doc.rect(x0, by, Math.max(0.6, bw), barH, 'F'); }
      });
      var tx = X(tg);
      stroke(T.target); doc.setLineWidth(0.45); doc.setLineDashPattern([1.2, 0.9], 0); doc.line(tx, top - 3.5, tx, bottom); doc.setLineDashPattern([], 0);
      font(6.8, true); text('Target ' + tg, tx + 1.2, top - 3.2);
      /* data labels last, on a white plate so the target line never runs through them */
      list.forEach(function (d, k) {
        var ry = top + k * rowH, by = ry + (rowH - barH) / 2, bw = pw * Math.min(100, d.pct) / 100;
        font(8, true); var lbl = d.pct + '%', lw = tw(lbl);
        fill('#FFFFFF'); doc.rect(x0 + bw + 0.9, by + barH / 2 - 2.1, lw + 1.4, 4.2, 'F');
        text(lbl, x0 + bw + 1.6, by + barH / 2 + 1.4);
      });
    })();

    /* ===== Page 2: Gaps and actions ===== */
    doc.addPage(); pageHead('Gaps and actions');
    var ext = !!(m.plan90 && m.plan90.length);
    var y2 = TOP;
    var GLAB = 25, GBAR = 6.2;
    function ganttRows(w, items, sz) {
      var tW = w - 8 - GLAB; font(sz, false);
      return planItems(items).map(function (it) { return split(it.text, tW - 2); });
    }
    function ganttNeed(w, items, sz) {
      return 17 + ganttRows(w, items, sz).reduce(function (a, L) { return a + GBAR + L.length * lh(sz) + 1.8; }, 0);
    }
    function gantt(x, y, w, h, title, sub, items, axis, sz) {
      tile(x, y, w, h, title, sub);
      var its = planItems(items), labW = GLAB, tx0 = x + 4 + labW, tx1 = x + w - 4, tW = tx1 - tx0, na = axis.length;
      var hy = y + 12.5, rows = ganttRows(w, items, sz);
      font(6.8, false, T.text2);
      axis.forEach(function (a, i) { text(fit(a, tW / na - 2), tx0 + tW * i / na + 1.2, hy); });
      var gy0 = hy + 2, gy1 = y + h - 3;
      stroke(T.border); doc.setLineWidth(0.25); doc.line(x + 4, gy0, tx1, gy0);
      var yy = gy0;
      its.forEach(function (it, k) {
        var L = rows[k], rh = GBAR + L.length * lh(sz) + 1.8;
        if (yy + rh > gy1 + 0.5) { L = clip(L, Math.max(1, Math.floor((gy1 - yy - GBAR - 1.8) / lh(sz)))); rh = GBAR + L.length * lh(sz) + 1.8; }
        var col = T.palette[k % T.palette.length];
        for (var i = 0; i <= na; i++) { stroke(T.grid); doc.setLineWidth(0.2); doc.line(tx0 + tW * i / na, yy, tx0 + tW * i / na, yy + GBAR); }
        font(7.2, true); text(fit(it.when, labW - 2), x + 4, yy + 4.6);
        fill(col);
        if (it.ms) { var mx = tx0 + tW * it.start - 1.8, my = yy + 3.1; doc.lines([[1.8, -1.8], [1.8, 1.8], [-1.8, 1.8]], mx, my, [1, 1], 'F', true); }
        else doc.rect(tx0 + tW * it.start, yy + 1.8, Math.max(1.2, tW * (it.end - it.start)), 2.8, 'F');
        font(sz, false); text(L, tx0 + 1.2, yy + GBAR + lh(sz) * 0.72, { lineHeightFactor: 1.24 });
        yy += rh;
        stroke(T.grid); doc.setLineWidth(0.2); doc.line(x + 4, yy, tx1, yy);
      });
    }
    (function matrix() {
      var x = M, w = CW;
      var cols = ext
        ? [{ k: 'pri', l: 'Priority', w: 16 }, { k: 'dim', l: cap(m.areaLabel), w: 31 }, { k: 'st', l: 'Status', w: 24 }, { k: 'sc', l: 'Score', w: 15 }, { k: 'low', l: 'What scored low', w: 61 }, { k: 'why', l: 'Why it matters', w: 42 }, { k: 'a30', l: 'Next 30 days', w: 40 }, { k: 'a90', l: 'By day 90', w: 40 }]
        : [{ k: 'pri', l: 'Priority', w: 17 }, { k: 'dim', l: cap(m.areaLabel), w: 27 }, { k: 'st', l: 'Status', w: 25 }, { k: 'sc', l: 'Score', w: 17 }, { k: 'low', l: 'What scored low', w: 67 }, { k: 'why', l: 'Why it matters', w: 55 }, { k: 'a30', l: 'Next 30 days', w: 61 }];
      var inner = w - 8, totalW = cols.reduce(function (a, c) { return a + c.w; }, 0);
      cols.forEach(function (c) { c.w = c.w * inner / totalW; });
      var maxH = ext ? 112 : 100;
      var layout = function (sz) {
        return m.gaps.map(function (g) {
          font(sz, false);
          var low = split(g.behaviour || '', cols[4].w - 3), ans = g.answer ? split('You answered: ' + g.answer, cols[4].w - 3) : [];
          (g.extra || []).forEach(function (e) { low = low.concat(ans, split(e.behaviour, cols[4].w - 3)); ans = e.answer ? split('You answered: ' + e.answer, cols[4].w - 3) : []; });
          var why = split(g.why || '', cols[5].w - 3), a30 = split(g.action30 || '', cols[6].w - 3), a90 = ext ? split(g.action90 || '', cols[7].w - 3) : [];
          font(sz, true); var dim = split(g.dim, cols[1].w - 3);
          var n = Math.max(low.length + ans.length, why.length, a30.length, a90.length, dim.length, 1);
          return { g: g, low: low, ans: ans, why: why, a30: a30, a90: a90, dim: dim, h: n * lh(sz) + 4.2 };
        });
      };
      var sz = 7.4, rows = layout(sz), body = function (r) { return r.reduce(function (a, b) { return a + b.h; }, 0); };
      while (body(rows) + 21 > maxH && sz > 6) { sz -= 0.2; rows = layout(sz); }
      var h = m.gaps.length ? body(rows) + 21 : 26;
      tile(x, y2, w, h, 'Priority gaps: what to fix first', m.gapsNote || '');
      var y = y2 + 10;
      fill(T.canvas); doc.rect(x + 4, y, inner, 6.5, 'F');
      var cx = x + 4;
      font(7, true); cols.forEach(function (c) { text(c.l, c.k === 'sc' ? cx + c.w / 2 : cx + 1.5, y + 4.4, c.k === 'sc' ? { align: 'center' } : undefined); cx += c.w; });
      y += 6.5;
      if (!m.gaps.length) {
        font(7.6, false); text('No answer fell below its threshold, so there is no gap to rank. Use the action plan below to keep the standard current.', x + 5.5, y + 5.5);
      }
      rows.forEach(function (r, i) {
        var g = r.g, b = band(g.pct), ty = y + 2.1 + lh(sz) * 0.75, c = x + 4;
        if (i > 0) { stroke(T.grid); doc.setLineWidth(0.25); doc.line(x + 4, y, x + 4 + inner, y); }
        font(sz, true); text((i + 1) + '  ' + (g.priority || ''), c + 1.5, ty); c += cols[0].w;
        text(r.dim, c + 1.5, ty, { lineHeightFactor: 1.24 }); c += cols[1].w;
        dot(c + 2.6, ty - 1, b.color); font(sz, false); text(fit(b.label, cols[2].w - 6), c + 4.8, ty); c += cols[2].w;
        fill(b.tint); doc.rect(c + 0.6, y + 0.6, cols[3].w - 1.2, r.h - 1.2, 'F');
        font(sz, true); text(g.scoreText || g.pct + '%', c + cols[3].w / 2, ty, { align: 'center' }); c += cols[3].w;
        font(sz, false); text(r.low, c + 1.5, ty, { lineHeightFactor: 1.24 });
        if (r.ans.length) { font(sz, false, T.text2); text(r.ans, c + 1.5, ty + r.low.length * lh(sz), { lineHeightFactor: 1.24 }); }
        c += cols[4].w;
        font(sz, false, T.text2); text(r.why, c + 1.5, ty, { lineHeightFactor: 1.24 }); c += cols[5].w;
        font(sz, false); text(r.a30, c + 1.5, ty, { lineHeightFactor: 1.24 }); c += cols[6].w;
        if (ext) { text(r.a90, c + 1.5, ty, { lineHeightFactor: 1.24 }); }
        y += r.h;
      });
      y2 += h + G;
    })();
    (function plans() {
      var h = BOT - y2, sz = 7.8, w2 = ext ? (CW - G) / 2 : CW;
      var need = function () { return Math.max(ganttNeed(w2, m.plan30, sz), ext ? ganttNeed(w2, m.plan90, sz) : 0); };
      while (need() > h && sz > 6) sz -= 0.2;
      if (ext) {
        gantt(M, y2, w2, h, 'Your next 30 days', 'Tick each step when done', m.plan30, AX30, sz);
        gantt(M + w2 + G, y2, w2, h, 'Days 31 to 90', 'Weakest ' + m.areaLabel + ' first', m.plan90, m.plan90Axis || AX90, sz);
        return;
      }
      var gh = Math.min(h, need() + 2);
      gantt(M, y2, CW, gh, 'Your next 30 days', 'Tick each step when done', m.plan30, AX30, sz);
      /* the space left on the page carries a summary matrix of every area */
      var y = y2 + gh + G, rows = m.sorted, rH = 7.2, sh = 18 + rows.length * rH;
      if (y + sh > BOT) return;
      tile(M, y, CW, sh, 'Score by ' + m.areaLabel + ': summary', 'Weakest first');
      var inner = CW - 8, cols = [{ l: cap(m.areaLabel), w: 46 }, { l: 'Points', w: 24, r: 1 }, { l: 'Score', w: 18, c: 1 }, { l: 'Status', w: 30 }, { l: 'Against the target', w: 52 }, { l: 'What it measures', w: inner - 170 }];
      var yy = y + 10;
      fill(T.canvas); doc.rect(M + 4, yy, inner, 6, 'F');
      var hx = M + 4; font(7, true);
      cols.forEach(function (c) { text(c.l, c.r ? hx + c.w - 2 : c.c ? hx + c.w / 2 : hx + 1.5, yy + 4.1, c.r ? { align: 'right' } : c.c ? { align: 'center' } : undefined); hx += c.w; });
      yy += 6;
      rows.forEach(function (d, i) {
        var b = band(d.pct), ty = yy + 4.6, c = M + 4;
        if (i > 0) { stroke(T.grid); doc.setLineWidth(0.25); doc.line(M + 4, yy, M + 4 + inner, yy); }
        font(7.6, true); text(fit(d.name, cols[0].w - 3), c + 1.5, ty); c += cols[0].w;
        font(7.6, false); text(d.points + ' of ' + d.max, c + cols[1].w - 2, ty, { align: 'right' }); c += cols[1].w;
        fill(b.tint); doc.rect(c + 0.6, yy + 0.6, cols[2].w - 1.2, rH - 1.2, 'F'); font(7.6, true); text(d.pct + '%', c + cols[2].w / 2, ty, { align: 'center' }); c += cols[2].w;
        dot(c + 2.6, ty - 1, b.color); font(7.6, false); text(b.label, c + 4.8, ty); c += cols[3].w;
        text(vsTarget(d.pct, tg), c + 1.5, ty); c += cols[4].w;
        font(7.2, false, T.text2); text(fit(d.meaning || '', cols[5].w - 3), c + 1.5, ty);
        yy += rH;
      });
    })();

    /* ===== Page 3: How we can help ===== */
    doc.addPage(); pageHead('How we can help');
    var y3 = TOP;
    (function services() {
      var sv = m.services.slice(0, 4), n = sv.length || 1, inner = CW - 8, cw = (inner - (n - 1) * G) / n;
      var meas = sv.map(function (s) { font(7.8, false); return split(s.fixes, cw - 8); });
      var maxL = meas.reduce(function (a, L) { return Math.max(a, L.length); }, 1);
      var ch = 22 + maxL * lh(7.8), h = ch + 15;
      tile(M, y3, CW, h, 'How M.A.I. Consulting can help', 'Matched to your weakest ' + m.areaPlural + ', weakest first');
      sv.forEach(function (s, i) {
        var x = M + 4 + i * (cw + G), y = y3 + 10.5;
        fill('#FFFFFF'); stroke(T.border); doc.setLineWidth(0.25); doc.rect(x, y, cw, ch, 'FD');
        fill(T.navy); doc.rect(x, y, cw, 1.1, 'F');
        font(6.8, false, T.text2); text(fit(s.forDims && s.forDims.length ? 'For ' + s.forDims.join(' and ') : 'For every team', cw - 8), x + 4, y + 6);
        font(10, true); text(fit(s.name, cw - 8), x + 4, y + 11.2);
        font(7.8, false); text(meas[i], x + 4, y + 16, { lineHeightFactor: 1.24 });
        font(7.2, false, T.link); var u = fit(shortUrl(s.url), cw - 8); text(u, x + 4, y + ch - 3.2);
        stroke(T.link); doc.setLineWidth(0.15); doc.line(x + 4, y + ch - 2.7, x + 4 + tw(u), y + ch - 2.7);
        doc.link(x, y, cw, ch, { url: s.url });
      });
      y3 += h + G;
    })();
    if (m.standards && m.standards.length) {
      (function standards() {
        var inner = CW - 8, cols = [52, 26, 16, inner - 94];
        font(7.2, false);
        var rows = m.standards.map(function (r) { var L = split(r.frameworks, cols[3] - 3); return { r: r, L: L, h: Math.max(1, L.length) * lh(7.2) + 3.6 }; });
        var h = 22 + rows.reduce(function (a, r) { return a + r.h; }, 0);
        tile(M, y3, CW, h, 'Standards mapping (optional guidance)', 'Indicative guidance only: not a compliance service, audit or legal advice');
        var y = y3 + 9.5;
        font(7, false, T.text2); text('Where your three weakest ' + m.areaPlural + ' sit in the frameworks this assessment references. Check clause numbers against the current text before quoting them.', M + 4, y + 1.2);
        y += 3.6;
        fill(T.canvas); doc.rect(M + 4, y, inner, 6, 'F');
        font(7, true); var hx = M + 4;['' + cap(m.areaLabel), 'Status', 'Score', 'Where the gap sits'].forEach(function (l, i) { text(l, i === 2 ? hx + cols[i] / 2 : hx + 1.5, y + 4.1, i === 2 ? { align: 'center' } : undefined); hx += cols[i]; });
        y += 6;
        rows.forEach(function (r, i) {
          var b = band(r.r.pct), ty = y + 1.8 + lh(7.2) * 0.78, c = M + 4;
          if (i > 0) { stroke(T.grid); doc.setLineWidth(0.25); doc.line(M + 4, y, M + 4 + inner, y); }
          font(7.4, true); text(fit(r.r.dim, cols[0] - 3), c + 1.5, ty); c += cols[0];
          dot(c + 2.6, ty - 1, b.color); font(7.2, false); text(b.label, c + 4.8, ty); c += cols[1];
          fill(b.tint); doc.rect(c + 0.6, y + 0.6, cols[2] - 1.2, r.h - 1.2, 'F'); font(7.4, true); text(r.r.pct + '%', c + cols[2] / 2, ty, { align: 'center' }); c += cols[2];
          font(7.2, false); text(r.L, c + 1.5, ty, { lineHeightFactor: 1.24 });
          y += r.h;
        });
        y3 += h + G;
      })();
    }
    (function bottomRow() {
      var ctaW = 96, readW = CW - ctaW - G;
      var aboutL = []; if (m.about) { font(7.4, false); aboutL = split(m.about, CW - 8); }
      var aboutH = aboutL.length ? 13 + aboutL.length * lh(7.4) : 0;
      var avail = BOT - y3 - (aboutH ? aboutH + G : 0);
      var sz = 8.4, rowsR;
      var lay = function (s) { return m.howToRead.map(function (l) { var i = String(l).indexOf(':'); var lab = i > 0 && i < 40 ? l.slice(0, i + 1) : ''; var rest = lab ? l.slice(i + 1).trim() : l; font(s, true); var lw = lab ? tw(lab) + 1.4 : 0; font(s, false); var L = split(rest, readW - 8 - lw); return { lab: lab, lw: lw, L: L }; }); };
      var hh = function (rs, s) { return rs.reduce(function (a, r) { return a + r.L.length * lh(s) + 1.6; }, 0); };
      rowsR = lay(sz);
      while (hh(rowsR, sz) > avail - 14 && sz > 6.2) { sz -= 0.2; rowsR = lay(sz); }
      var h = Math.min(avail, Math.max(hh(rowsR, sz) + 16, 72));
      if (aboutH) {
        var ay = y3 + h + G;
        tile(M, ay, CW, aboutH, 'About this assessment');
        font(7.4, false, T.text2); text(aboutL, M + 4, ay + 12, { lineHeightFactor: 1.24 });
      }
      /* How to read this report */
      tile(M, y3, readW, h, 'How to read this report');
      var yy = y3 + 12.5;
      rowsR.forEach(function (r, i) {
        if (i > 0) { stroke(T.grid); doc.setLineWidth(0.2); doc.line(M + 4, yy - lh(sz) * 0.8, M + readW - 4, yy - lh(sz) * 0.8); }
        if (r.lab) { font(sz, true); text(r.lab, M + 4, yy); }
        font(sz, false); text(r.L, M + 4 + r.lw, yy, { lineHeightFactor: 1.24 });
        yy += r.L.length * lh(sz) + 1.6;
      });
      /* CTA */
      var cx = M + readW + G;
      tile(cx, y3, ctaW, h, 'Next step');
      font(8.2, false); var L = split('A free 30-minute call: we walk through your weakest ' + m.areaPlural + ' and what to do about each. No pitch. If the right first step is a free resource, that is what we will tell you.', ctaW - 8);
      text(L, cx + 4, y3 + 13, { lineHeightFactor: 1.24 });
      var by = y3 + 13 + L.length * lh(8.2) + 3;
      fill(T.navy); doc.rect(cx + 4, by, ctaW - 8, 10, 'F');
      font(9, true, '#FFFFFF'); text('Book a free 30-minute call', cx + ctaW / 2, by + 6.4, { align: 'center' });
      doc.link(cx + 4, by, ctaW - 8, 10, { url: m.bookUrl });
      font(7.2, false, T.text2); text('Booking page', cx + 4, by + 16);
      font(7.4, false, T.link); doc.textWithLink(clean(shortUrl(m.bookUrl)), cx + 4, by + 20, { url: m.bookUrl });
      font(7.2, false, T.text2); text('Contact', cx + 4, by + 26);
      font(7.4, false, T.link); doc.textWithLink(clean(m.contactEmail), cx + 4, by + 30, { url: 'mailto:' + m.contactEmail });
    })();

    /* ===== Page 4+: Answer detail ===== */
    (function answers() {
      if (!m.answers.length) return;
      doc.addPage(); pageHead('Answer detail');
      var inner = CW - 8, cols = [{ l: 'Question', w: 146 }, { l: 'Your answer', w: 52 }, { l: 'Points', w: 17, r: 1 }, { l: 'Threshold', w: 19, r: 1 }, { l: 'Status', w: 35 }];
      var tot = cols.reduce(function (a, c) { return a + c.w; }, 0); cols.forEach(function (c) { c.w = c.w * inner / tot; });
      var sz = 6.7, L = lh(sz), PAD = 1.7, y, tileY;
      var startTile = function (cont) {
        tileY = TOP; fill(T.tile); stroke(T.border); doc.setLineWidth(0.25); doc.rect(M, tileY, CW, BOT - tileY, 'FD');
        font(9, true); text('Answer detail' + (cont ? ' (continued)' : ''), M + 4, tileY + 6.2);
        font(7, false, T.text2); text(fit('All ' + m.answers.length + ' questions. Points scored against the threshold for that question.', 150), M + CW - 4, tileY + 6.2, { align: 'right' });
        y = tileY + 10;
        fill(T.canvas); doc.rect(M + 4, y, inner, 6, 'F');
        var x = M + 4; font(7, true);
        cols.forEach(function (c, i) { text(c.l, c.r ? x + c.w - 1.5 : x + (i === 4 ? 4 : 1.5), y + 4.1, c.r ? { align: 'right' } : undefined); x += c.w; });
        y += 6;
      };
      var cur = null;
      var groupRow = function (cont) {
        var d = m.dims.filter(function (x) { return x.name === cur; })[0];
        fill('#FAF9F8'); doc.rect(M + 4, y, inner, 6, 'F'); stroke(T.border); doc.setLineWidth(0.25); doc.line(M + 4, y, M + 4 + inner, y);
        font(7.4, true); text(cur + (cont ? ' (continued)' : ''), M + 5.5, y + 4.2);
        return d;
      };
      var newPage = function (midGroup) { doc.addPage(); pageHead('Answer detail'); startTile(true); if (midGroup && cur) { groupRow(true); y += 6; } };
      startTile(false);
      var maxY = BOT - 3;
      m.answers.forEach(function (a) {
        if (a.dim !== cur) {
          if (y + 6 + L + 3 > maxY) newPage(false);
          cur = a.dim;
          var d = groupRow(false);
          if (d) { var b = band(d.pct); var info = d.points + ' of ' + d.max + ' points (' + d.pct + '%)'; font(7, false, T.text2); var iw = tw(info); text(info, M + 4 + inner - 1.5, y + 4.2, { align: 'right' }); chipPdf(M + 4 + inner - 1.5 - iw - 3 - (function () { font(6.6, true); return tw(b.label) + 7.2; })(), y + 4.3, b.label, b, 6.6); }
          y += 6;
        }
        font(sz, false); var q = split(a.question, cols[0].w - 3); var an = split(a.answer == null ? '-' : String(a.answer), cols[1].w - 3);
        an = clip(an, 3);
        var rh = Math.max(q.length, an.length) * L + PAD;
        if (y + rh > maxY) { newPage(true); }
        var ty = y + PAD / 2 + L * 0.78, x = M + 4, st = STATUS[a.status] || STATUS.none, scored = a.status !== 'info';
        font(sz, false); text(q, x + 1.5, ty, { lineHeightFactor: 1.24 }); x += cols[0].w;
        text(an, x + 1.5, ty, { lineHeightFactor: 1.24 }); x += cols[1].w;
        font(sz, true); text(scored && a.points != null ? a.points + ' / ' + a.max : '-', x + cols[2].w - 1.5, ty, { align: 'right' }); x += cols[2].w;
        font(sz, false); text(scored && a.threshold != null ? String(a.threshold) : '-', x + cols[3].w - 1.5, ty, { align: 'right' }); x += cols[3].w;
        dot(x + 5, ty - 0.9, st.color); text(st.label, x + 7.2, ty);
        y += rh; stroke(T.grid); doc.setLineWidth(0.2); doc.line(M + 4, y, M + 4 + inner, y);
      });
    })();

    /* footers */
    var N = doc.getNumberOfPages();
    for (var p = 1; p <= N; p++) {
      doc.setPage(p);
      font(6.8, false, T.text2);
      text('Source: self-assessment on mai4consulting.com. Scores are self-reported.', M, PH - 6);
      text('Page ' + p + ' of ' + N, PW - M, PH - 6, { align: 'right' });
    }
    doc.setPage(1);
    return doc;
  }

  /* ── Email snippets (tables + inline styles only) ────────────────── */
  function emailBarsHtml(model) {
    var m = normalize(model), tg = m.target;
    var seg = function (w, col) { return w > 0 ? '<td width="' + w + '%" height="14" bgcolor="' + col + '"></td>' : ''; };
    var mk = '<td width="1%" bgcolor="#252423"></td>'; /* target tick */
    var rows = m.sorted.map(function (d, k) {
      var p = Math.max(0, Math.min(100, Math.round(d.pct))), c = band(p).color, g = '#EDEBE9', cells;
      cells = p < tg ? seg(p, c) + seg(tg - p, g) + mk + seg(99 - tg, g) : seg(tg, c) + mk + seg(Math.min(p, 99) - tg, c) + seg(99 - Math.min(p, 99), g);
      return '<tr><td' + (k ? '' : ' width="150"') + ' style="padding:4px 8px 4px 0">' + esc(d.name) + '</td><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>' + cells +
        '</tr></table></td><td width="44" align="right" style="padding:4px 0 4px 6px"><b>' + p + '%</b></td></tr>';
    }).join('');
    return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;font:13px Arial,Helvetica,sans-serif;color:#252423">' + rows +
      '<tr><td></td><td colspan="2" style="padding-top:6px;font-size:11px;color:#605E5C">Weakest first. Dark tick: target ' + tg + '. Red below 40, amber 40 to 59, green 60 to 74, blue 75 and up.</td></tr></table>';
  }
  function emailPrioritiesHtml(model) {
    var m = normalize(model);
    var F = 'font:13px Arial,Helvetica,sans-serif;color:#252423';
    var th = function (t, al) { return '<td' + (al ? ' align="' + al + '"' : '') + ' style="padding:6px 8px;font-size:12px;font-weight:bold">' + t + '</td>'; };
    var h = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;border-collapse:collapse;' + F + '">';
    h += '<tr bgcolor="#F3F2F1">' + th('Priority') + th(esc(cap(m.areaLabel)) + ' and what scored low') + th('Status') + th('Score', 'center') + '</tr>';
    if (!m.gaps.length) {
      return h + '<tr><td colspan="4" style="padding:8px">No answer fell below its threshold, so there is no gap to rank.</td></tr></table>';
    }
    var td = 'padding:8px;border-top:1px solid #EDEBE9;vertical-align:top';
    m.gaps.forEach(function (g, i) {
      var b = band(g.pct);
      h += '<tr><td style="' + td + ';white-space:nowrap"><b>' + (i + 1) + ' ' + esc(g.priority || '') + '</b></td><td style="' + td + '"><b>' + esc(g.dim) + '</b><br>' + esc(g.behaviour || '') +
        '</td><td style="' + td + ';white-space:nowrap"><span style="color:' + b.color + ';font-size:15px">&#9679;</span> ' + esc(b.label) + '</td><td align="center" bgcolor="' + b.tint + '" style="' + td + ';font-weight:bold;white-space:nowrap">' + esc(g.scoreText || g.pct + '%') + '</td></tr>';
      h += '<tr><td></td><td colspan="3" style="padding:0 8px 8px;font-size:12px;color:#605E5C">Next 30 days: ' + esc(g.action30 || '') + '</td></tr>';
    });
    return h + '</table>';
  }

  var api = { band: band, vsTarget: vsTarget, renderDashboard: renderDashboard, buildPdf: buildPdf, emailBarsHtml: emailBarsHtml, emailPrioritiesHtml: emailPrioritiesHtml, tokens: T, clean: clean };
  root.MAIReport = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : this);
