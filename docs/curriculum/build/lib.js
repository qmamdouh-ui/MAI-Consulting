// Shared docx-js helpers for the M.A.I. Consulting documents.
const docx = require('docx');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, ShadingType, AlignmentType, BorderStyle, LevelFormat, PageBreak,
  Footer, Header, PageNumber, PageOrientation, VerticalAlign, TableOfContents,
} = docx;

const NAVY = '002855', BLUE = '003E8A', GOLD = 'C9A84C', GREY = '6B7280',
      LIGHT = 'F6F8FC', TXT = '1A1A2E', WHITE = 'FFFFFF', ZEBRA = 'FBF9F8';
const HFONT = 'Georgia', BFONT = 'Calibri';

const A4W = 11906, A4H = 16838, MARGIN = 1134;
const PORTRAIT_W = A4W - 2 * MARGIN;   // 9638
const LANDSCAPE_W = A4H - 2 * MARGIN;  // 14570

// --- inline markup: **bold** and _italic_ (underscore pairs) ---
function runs(text, base = {}) {
  const out = [];
  const parts = String(text).split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith('**') && part.endsWith('**')) {
      out.push(new TextRun({ ...base, text: part.slice(2, -2), bold: true }));
    } else if (part.startsWith('__') && part.endsWith('__')) {
      out.push(new TextRun({ ...base, text: part.slice(2, -2), italics: true }));
    } else {
      out.push(new TextRun({ ...base, text: part }));
    }
  }
  return out;
}

function P(text, opts = {}) {
  const base = { font: BFONT, size: opts.size || 21, color: opts.color || TXT };
  return new Paragraph({
    children: runs(text, base),
    spacing: { after: opts.after ?? 120, before: opts.before ?? 0, line: 276 },
    alignment: opts.align,
    keepNext: opts.keepNext,
  });
}
function Small(text) { return P(text, { size: 18, color: GREY }); }
function H1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text, font: HFONT, size: 34, color: NAVY, bold: true })], spacing: { before: 360, after: 160 }, keepNext: true });
}
function H2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text, font: HFONT, size: 27, color: BLUE, bold: true })], spacing: { before: 280, after: 120 }, keepNext: true });
}
function H3(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text, font: BFONT, size: 22, color: NAVY, bold: true })], spacing: { before: 200, after: 80 }, keepNext: true });
}
function Bullets(items, level = 0) {
  return items.map(t => new Paragraph({
    children: runs(t, { font: BFONT, size: 21, color: TXT }),
    numbering: { reference: 'bullets', level },
    spacing: { after: 60, line: 264 },
  }));
}
let numInstance = 0;
function Numbered(items) {
  numInstance += 1;
  return items.map(t => new Paragraph({
    children: runs(t, { font: BFONT, size: 21, color: TXT }),
    numbering: { reference: 'numbers', level: 0, instance: numInstance },
    spacing: { after: 60, line: 264 },
  }));
}
function Break() { return new Paragraph({ children: [new PageBreak()] }); }

const thin = { style: BorderStyle.SINGLE, size: 4, color: 'D0D5DD' };
const borders = { top: thin, bottom: thin, left: thin, right: thin, insideHorizontal: thin, insideVertical: thin };

function cellParas(content, opts = {}) {
  const items = Array.isArray(content) ? content : String(content).split('\n');
  return items.map(line => {
    if (line.startsWith('- ')) {
      return new Paragraph({ children: runs(line.slice(2), { font: BFONT, size: opts.size || 18, color: opts.color || TXT, bold: opts.bold }), numbering: { reference: 'bullets', level: 0 }, spacing: { after: 30, line: 240 } });
    }
    return new Paragraph({ children: runs(line, { font: BFONT, size: opts.size || 18, color: opts.color || TXT, bold: opts.bold }), spacing: { after: 40, line: 240 } });
  });
}

// headers: string[]; rows: (string|string[])[][]; widths: number[] (DXA, sum = table width)
function Tbl(headers, rows, widths, opts = {}) {
  const size = opts.size || 18;
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => new TableCell({
      children: cellParas(h, { size, color: WHITE, bold: true }),
      width: { size: widths[i], type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: NAVY, color: 'auto' },
      margins: { top: 60, bottom: 60, left: 90, right: 90 },
      verticalAlign: VerticalAlign.CENTER,
    })),
  });
  const bodyRows = rows.map((r, ri) => new TableRow({
    cantSplit: opts.cantSplit ?? true,
    children: r.map((c, i) => new TableCell({
      children: cellParas(c, { size, bold: opts.boldFirst && i === 0 }),
      width: { size: widths[i], type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: ri % 2 === 1 ? ZEBRA : WHITE, color: 'auto' },
      margins: { top: 50, bottom: 50, left: 90, right: 90 },
    })),
  }));
  return new Table({
    rows: [headerRow, ...bodyRows],
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: widths,
    borders,
  });
}
function Spacer(after = 160) { return new Paragraph({ children: [], spacing: { after } }); }

function Callout(text, width = PORTRAIT_W, fill = LIGHT) {
  const lines = Array.isArray(text) ? text : [text];
  return new Table({
    rows: [new TableRow({ children: [new TableCell({
      children: lines.map(l => P(l, { size: 20, after: 60 })),
      width: { size: width, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill, color: 'auto' },
      margins: { top: 120, bottom: 80, left: 180, right: 180 },
      borders: { top: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL }, left: { style: BorderStyle.SINGLE, size: 24, color: GOLD } },
    })] })],
    width: { size: width, type: WidthType.DXA },
    columnWidths: [width],
    borders: { top: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.NIL }, left: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL }, insideHorizontal: { style: BorderStyle.NIL }, insideVertical: { style: BorderStyle.NIL } },
  });
}

function ContentsTitle() {
  return new Paragraph({ children: [new TextRun({ text: 'Contents', font: HFONT, size: 34, color: NAVY, bold: true })], spacing: { before: 360, after: 160 } });
}
function TitleBlock(kicker, title, subtitle, meta) {
  const out = [
    new Paragraph({ children: [new TextRun({ text: kicker, font: BFONT, size: 20, color: GOLD, bold: true, allCaps: true, characterSpacing: 20 })], spacing: { before: 1800, after: 200 } }),
    new Paragraph({ children: [new TextRun({ text: title, font: HFONT, size: 52, color: NAVY, bold: true })], spacing: { after: 240 } }),
    new Paragraph({ children: [new TextRun({ text: subtitle, font: BFONT, size: 26, color: BLUE })], spacing: { after: 600 } }),
  ];
  for (const m of meta) out.push(P(m, { size: 20, color: GREY, after: 60 }));
  return out;
}

function section(children, { landscape = false, headerText = '', first = false } = {}) {
  const page = landscape
    ? { size: { width: A4W, height: A4H, orientation: PageOrientation.LANDSCAPE }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } }
    : { size: { width: A4W, height: A4H }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } };
  return {
    properties: { page, titlePage: first },
    headers: {
      default: new Header({ children: [new Paragraph({ children: [new TextRun({ text: headerText, font: BFONT, size: 16, color: GREY })], alignment: AlignmentType.RIGHT, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD, space: 4 } } })] }),
      ...(first ? { first: new Header({ children: [new Paragraph({ children: [] })] }) } : {}),
    },
    footers: {
      default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: 'M.A.I. Consulting  ·  mai4consulting.com  ·  Page ', font: BFONT, size: 16, color: GREY }),
        new TextRun({ children: [PageNumber.CURRENT], font: BFONT, size: 16, color: GREY }),
      ] })] }),
      ...(first ? { first: new Footer({ children: [new Paragraph({ children: [] })] }) } : {}),
    },
    children,
  };
}

function build(sections, meta) {
  return new Document({
    creator: 'M.A.I. Consulting', title: meta.title, description: meta.description || '',
    styles: {
      default: { document: { run: { font: BFONT, size: 21, color: TXT } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: HFONT, size: 34, bold: true, color: NAVY }, paragraph: { spacing: { before: 360, after: 160 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: HFONT, size: 27, bold: true, color: BLUE }, paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 1 } },
        { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: BFONT, size: 22, bold: true, color: NAVY }, paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 2 } },
      ],
    },
    numbering: {
      config: [
        { reference: 'bullets', levels: [
          { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 240 } } } },
          { level: 1, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 800, hanging: 240 } } } },
        ] },
        { reference: 'numbers', levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 460, hanging: 300 } } } },
        ] },
      ],
    },
    sections,
  });
}

async function save(doc, path) {
  const buf = await Packer.toBuffer(doc);
  require('fs').writeFileSync(path, buf);
  console.log('wrote', path, buf.length, 'bytes');
}

module.exports = { P, Small, H1, H2, H3, Bullets, Numbered, Break, Tbl, Spacer, Callout, TitleBlock, ContentsTitle, section, build, save, TableOfContents, Paragraph, TextRun, PORTRAIT_W, LANDSCAPE_W, GOLD, NAVY, BLUE, GREY, LIGHT };
