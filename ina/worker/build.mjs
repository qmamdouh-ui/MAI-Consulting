// Bundles ../prompt.md and ../knowledge.md into src/content.js. Run before `wrangler deploy`.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
const prompt = readFileSync(new URL("../prompt.md", import.meta.url), "utf8");
const knowledge = readFileSync(new URL("../knowledge.md", import.meta.url), "utf8");
mkdirSync(new URL("./src/", import.meta.url), { recursive: true });
writeFileSync(
  new URL("./src/content.js", import.meta.url),
  `export const PROMPT = ${JSON.stringify(prompt)};\nexport const KNOWLEDGE = ${JSON.stringify(knowledge)};\n`
);
console.log("content.js written", prompt.length, knowledge.length);
