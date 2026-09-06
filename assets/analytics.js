/* =============================================================================
   M.A.I. Consulting — cookieless analytics and funnel instrumentation

   Design constraints, in order:
     1. No cookies, no localStorage, no device or browser fingerprint.
     2. No personal data. Event names and page paths only, never form values,
        never an email address, never a score attached to an identity.
     3. No consent banner needed, because nothing here identifies a visitor.
     4. Nothing loads at all until PROVIDER and SITE are both set below.

   TO SWITCH IT ON: set PROVIDER and SITE, commit, done. Until then this file
   is inert: mai.track() is safe to call from every page and simply returns.

     Plausible   PROVIDER='plausible'   SITE='mai4consulting.com'
     Umami       PROVIDER='umami'       SITE='<website-id>'   (set HOST too)
     GoatCounter PROVIDER='goatcounter' SITE='<your-code>'

   THE SEVEN EVENTS this site reports, wired where they happen:
     estimator_opened      the price page loaded
     estimate_shown        a numeric range was rendered for a real scope
     estimate_sent         the scope was emailed to the team
     assessment_started    the first question was answered
     assessment_completed  every question was answered
     report_downloaded     the PDF was generated
     contact_submitted     the contact form was sent
   ========================================================================== */
(function (w, d) {
  "use strict";

  var PROVIDER = "";                 // 'plausible' | 'umami' | 'goatcounter' | ''
  var SITE     = "";                 // site id / domain / code for that provider
  var HOST     = "";                 // self-hosted script origin, Umami only

  var q = [];
  var ready = false;

  function loadScript(src, attrs) {
    var el = d.createElement("script");
    el.src = src;
    el.defer = true;
    Object.keys(attrs || {}).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    d.head.appendChild(el);
    return el;
  }

  function boot() {
    if (!PROVIDER || !SITE) return;           // inert until configured
    if (PROVIDER === "plausible") {
      w.plausible = w.plausible || function () { (w.plausible.q = w.plausible.q || []).push(arguments); };
      loadScript("https://plausible.io/js/script.js", { "data-domain": SITE });
    } else if (PROVIDER === "umami") {
      loadScript((HOST || "https://cloud.umami.is") + "/script.js", { "data-website-id": SITE });
    } else if (PROVIDER === "goatcounter") {
      loadScript("https://gc.zgo.at/count.js", { "data-goatcounter": "https://" + SITE + ".goatcounter.com/count" });
    }
    ready = true;
    q.splice(0).forEach(function (e) { send(e[0], e[1]); });
  }

  function send(name, props) {
    if (!ready) { q.push([name, props]); return; }
    try {
      if (PROVIDER === "plausible" && w.plausible) {
        w.plausible(name, props ? { props: props } : undefined);
      } else if (PROVIDER === "umami" && w.umami) {
        w.umami.track(name, props || {});
      } else if (PROVIDER === "goatcounter" && w.goatcounter && w.goatcounter.count) {
        w.goatcounter.count({ path: "event/" + name, title: name, event: true });
      }
    } catch (e) { /* analytics must never break a page */ }
  }

  /* Public API. Safe to call unconditionally; a no-op when unconfigured.
     `props` must never carry anything that identifies a person: pass shapes
     ("ngo", "s3", "50-200"), not values a visitor typed. */
  var mai = {
    track: function (name, props) {
      if (typeof name !== "string" || !name) return;
      send(name, props);
    },
    /* Fires `name` once per page load, however many times it is called. */
    once: (function () {
      var seen = {};
      return function (name, props) {
        if (seen[name]) return;
        seen[name] = 1;
        mai.track(name, props);
      };
    })()
  };

  w.mai = w.mai || mai;
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", boot);
  else boot();
})(window, document);
