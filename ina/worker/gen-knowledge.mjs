// Regenerates ../knowledge.md from the KB array in ../../assets/chat.js (English answers; the model translates).
// Run after editing the KB: node gen-knowledge.mjs && node build.mjs
import { readFileSync, writeFileSync } from "node:fs";
const src = readFileSync(new URL("../../assets/chat.js", import.meta.url), "utf8");
const a = src.indexOf("var KB=[");
const b = src.indexOf("\n];", a);
if (a < 0 || b < 0) throw new Error("KB array not found in assets/chat.js");
const KB = (0, eval)("(" + src.slice(a + 7, b + 2) + ")");
const out = KB.filter((e) => e.a && e.a.en)
  .map((e) => "## " + e.id + (e.t && e.t.en ? " (" + e.t.en + ")" : "") + (e.l ? "\nPage: " + e.l : "") + "\n" + e.a.en)
  .join("\n\n");
writeFileSync(
  new URL("../knowledge.md", import.meta.url),
  "# Ina knowledge base (generated from assets/chat.js KB, English answers; the model translates)\n\n" + out + "\n"
);
console.log("knowledge.md written:", KB.length, "entries,", out.length, "characters");
