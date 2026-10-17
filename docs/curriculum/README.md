# AI Fluency Curriculum working folder

Phase 1 (outlines only) of the M.A.I. Consulting AI Fluency Curriculum, plus the sample AI Use Policy shown to clients. Status and open decisions are in `CONVERSATION.md`. The canonical level spec stays `../LEVELS.md`.

```
curriculum/
  CONVERSATION.md   what was asked, what was built, decisions taken, decisions open
  build/            docx-js generators (lib.js shared; one script per document)
  outputs/          the four documents, Word and PDF
```

## Rebuilding a document

Needs Node and the `docx` package (version 9.5.1 was used).

```
cd docs/curriculum/build
npm init -y
npm install docx@9.5.1
node curriculum.js     ../outputs/MAI_AI_Fluency_Curriculum_Outlines_v0.1.docx
node policy.js         ../outputs/MAI_Sample_AI_Use_Policy_v1.0.docx
node terms.js          ../outputs/MAI_Curriculum_Terms_and_Commands_by_Level_v0.1.docx
node policy_concise.js ../outputs/MAI_Sample_AI_Use_Policy_Concise_v1.0.docx
```

The two long documents have a table of contents field. Open them in Word, update fields (Ctrl+A, F9), save, then export to PDF. The two short documents have no TOC and export directly.

Do not commit `node_modules` or `package-lock.json` from this folder (both are ignored).

## Notes

- Nothing in this folder contains prices. The repository is public and the site is served from its root, so anything committed here is reachable by URL.
- The policy sample describes an invented organisation and is marked illustrative. Whether it is ever linked from the site is an open question noted in `CONVERSATION.md`.
