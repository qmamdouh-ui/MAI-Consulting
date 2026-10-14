/* M.A.I. Consulting: privacy-friendly page-view counting.
   Inert until CODE is set. GoatCounter is cookieless, stores no personal profile and honours Do Not Track.
   To switch on: create a free site at goatcounter.com, put its code below (the part before .goatcounter.com),
   then add the sentence in docs/SITE_OPERATIONS.md to privacy/index.html. */
(function(){
"use strict";
var CODE = "";
if (!CODE || navigator.doNotTrack === "1" || location.hostname !== "mai4consulting.com") return;
var s = document.createElement("script");
s.async = true;
s.src = "https://gc.zgo.at/count.js";
s.setAttribute("data-goatcounter", "https://" + CODE + ".goatcounter.com/count");
document.head.appendChild(s);
})();
