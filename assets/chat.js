/* M.A.I. Consulting — site assistant launcher.

   The assistant's knowledge base is ~170 KB across three languages, which is
   several times the weight of the page it sits on. Most visitors never open
   it, so this file ships the button only (about 2 KB) and fetches
   assets/chat-kb.js on the first click. The button looks and behaves the same;
   the difference is that nobody downloads the knowledge base until they ask
   for it.

   To teach the assistant a new answer, edit the KB array in
   assets/chat-kb.js — this file holds no answers. */
(function (w, d) {
  "use strict";

  var CSS =
    '.mai-chat-btn{position:fixed;right:1.1rem;bottom:1.1rem;z-index:950;display:flex;align-items:center;' +
    'gap:.5rem;background:#C9A84C;color:#001830;border:none;border-radius:100px;padding:.75rem 1.1rem .75rem .95rem;' +
    'font:700 .85rem Inter,system-ui,sans-serif;cursor:pointer;box-shadow:0 8px 24px rgba(0,24,48,.25);' +
    'transition:transform .15s,background .2s}' +
    '.mai-chat-btn:hover{background:#e8c86a;transform:translateY(-1px)}' +
    '.mai-chat-btn:focus-visible{outline:2px solid #001830;outline-offset:2px}' +
    '.mai-chat-btn svg{width:18px;height:18px}' +
    '.mai-chat-btn[aria-busy="true"]{opacity:.7;cursor:progress}' +
    '@media(max-width:560px){.mai-chat-btn{right:.6rem;bottom:.6rem}}' +
    '@media print{.mai-chat-btn{display:none!important}}';

  var ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
    '<path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-6a8 8 0 1 1 18-5z"/></svg>';

  /* Resolve assets/ relative to this script, so the launcher works at any depth. */
  function base() {
    var me = d.currentScript || (function () {
      var all = d.getElementsByTagName("script");
      for (var i = all.length - 1; i >= 0; i--) {
        if (/assets\/chat\.js(\?|$)/.test(all[i].src)) return all[i];
      }
      return null;
    })();
    return me && me.src ? me.src.replace(/chat\.js(\?.*)?$/, "") : "assets/";
  }

  function build() {
    if (d.querySelector(".mai-chat-btn")) return;

    var st = d.createElement("style");
    st.textContent = CSS;
    d.head.appendChild(st);

    var btn = d.createElement("button");
    btn.type = "button";
    btn.className = "mai-chat-btn";
    btn.setAttribute("data-stub", "1");
    btn.setAttribute("aria-label", "Open the site assistant");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = ICON + "Ask · Demander · اسأل";

    var loading = false;
    btn.addEventListener("click", function () {
      if (loading) return;
      loading = true;
      btn.setAttribute("aria-busy", "true");

      w.__maiChatReady = function () {
        btn.removeAttribute("aria-busy");
        if (typeof w.__maiOpen === "function") w.__maiOpen();
      };

      var s = d.createElement("script");
      s.src = base() + "chat-kb.js";
      s.onerror = function () {
        loading = false;
        btn.removeAttribute("aria-busy");
        /* If the knowledge base cannot load, send the visitor somewhere that
           can actually answer, rather than leaving a dead button. */
        var a = base().replace(/assets\/$/, "") + "contact-us/";
        w.location.href = a;
      };
      d.head.appendChild(s);
    });

    d.body.appendChild(btn);
  }

  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", build);
  else build();
})(window, document);
