# AI Fluency Curriculum, phase 1: conversation record

Date: 17 October 2026. Working session with Claude Code (session `96b57109`).
Status: **outlines delivered, waiting for owner approval. Phase 2 (lessons, decks, exercises) has not started and must not start until the decisions below are recorded.**

## 1. The brief (as given)

Act as curriculum architect for M.A.I. Consulting. Review and cross-reference mai4consulting.com, the AI Tips LinkedIn newsletter and the M.A.I. Consulting LinkedIn Page articles. Design a practical, progressive curriculum across the seven capability levels (L1 Not started, L2 Occasional, L3 Structured, L4 Set up, L5 Delegating, L6 Building, L7 At the terminal). L1 and L2 are starting points, L3 is the minimum training target. Preserve the existing framework and published duration benchmarks unless there is a clear, evidence-based reason to change them. Build around the 4D framework (Delegation, Description, Discernment, Diligence). Tailor to non-technical professionals in NGOs, international organisations, public institutions and resource-constrained teams.

Phase 1 deliverables, outlines only:

1. Overall curriculum outline (learners, progression logic, prerequisites, outcomes, total duration, teaching vs independent practice, assessment, follow-up).
2. Seven-level comparison table.
3. Detailed outline per level (modules, time per module, individual practice, tangible product, assessment, observable results; instructor-led vs guided vs independent vs elapsed time).
4. Validation points (assumptions, missing information, overlaps, sequencing problems, decisions needing approval).

Rules: realistic role-specific tasks, measurable indicators, no unverified productivity promises, no invented evidence. Approval gate: stop after the outlines.

Owner's added instructions, in order:

- "create the outlines in the downloads. Additionally build an AI Use policy example to show to clients."
- "give me two pages containing a table clearly with the topic and terms and concepts and commands that will be taught in each level for the training. Regarding the policy, give me a concise version as well, no more than 4 pages max. Make these two seperate documents."
- "put this conversation in the MAI Consulting repo, I will come back to it."

## 2. What was produced

All in `outputs/` (Word and PDF of each):

| File | Pages | What it is |
|---|---|---|
| `MAI_AI_Fluency_Curriculum_Outlines_v0.1` | 25 | The phase 1 deliverable: sections 0 to 4 as listed in the brief, plus a source cross-reference table (4.6) |
| `MAI_Sample_AI_Use_Policy_v1.0` | 13 | Client-facing sample policy for an invented 60-person NGO, "Example Relief Foundation", with annexes A to H |
| `MAI_Curriculum_Terms_and_Commands_by_Level_v0.1` | 2 | Landscape table: topics, terms and concepts, commands and prompts taught at each level |
| `MAI_Sample_AI_Use_Policy_Concise_v1.0` | 4 | The same policy with annexes, contents and templates removed; one table for role permissions and one for records |

Generators in `build/` (docx-js). See `README.md` for how to rebuild.

## 3. Sources used

- `docs/LEVELS.md` (canonical seven-level spec: Understand / Do / Tools / Risks / Skip / Proof per level). All level content derives from it.
- Site pages: services (training, policy, support), transformation journey, playbook, use-cases for levels 3, 4 and 7, `knowledge/articles.json` (104 articles) for the practical lessons.
- LinkedIn: the AI Tips edition list (175 titles) and recent drafts, and the AI Consulting series (30 titles), read from the local publication queues in `linkedin-content-agent/` and `LinkedIn-Strategy/`. **Live LinkedIn was not re-read.** Recorded as assumption A6 in the outlines.

## 4. Design decisions taken (and where the owner may disagree)

- Published day benchmarks kept exactly: 3 / 5 / 6.5 / 8 / 10 cumulative days (level 3 to 7). Level names, proofs and skip lists kept.
- One delivery day = 6 contact hours (assumption A1). Whole ladder: 60 contact hours (22.75 instructor-led, 37.25 guided practice on the learner's own tasks) plus about 40 hours of independent practice; 11 to 14 weeks elapsed.
- Planning-assumption percentages from LEVELS.md appear only as the figure each engagement measures itself against at 90 days. They never appear in learner material.
- Assessment is by proof artefact with a 0 to 3 rubric per check, cold runs by a colleague at levels 4, 6 and 7, and an aggregate 90-day re-timing. The end-of-level record is a "record of attendance and proof of level", not a certificate.
- Level 5 was resequenced so that the never-delegate list, escalation path and near-miss log (module 5.3) are taught before the learner's first real delegation.
- Two proposed changes to published wording, flagged with reasons: (S2) a documented level 5 to 7 exception for solo power users via a half-day bridge; (S4) full-ladder elapsed time stated as 11 to 14 weeks rather than "two to six weeks", because levels 4, 6 and 7 each need a second person to run something cold.
- The policy sample uses an invented organisation, is marked illustrative throughout, and states it is not legal advice or certification. EU AI Act Article 4 (deployer AI-literacy duty, as amended 2026) is referenced as the reason for the training record.
- No prices anywhere in these files (repo is public; pricing stays in the private proposal calculator).

## 5. Open decisions for the owner (section 4.5 of the outlines, D1 to D10)

Record a yes/no or a value for each before phase 2:

| # | Decision | Recommended in the outlines |
|---|---|---|
| D1 | Contact hours per delivery day, and independent-practice hours sold with the engagement | 6 contact hours; about 40 independent hours across the ladder, stated in the quote |
| D2 | Elapsed-time wording (S4) | Option (b): state 11 to 14 weeks for the full ladder |
| D3 | Assessment thresholds | Rubric 2 or above on all criteria; test set 5 of 5 at level 5; seeded-error catch rate recorded, not graded |
| D4 | Level 5 to 7 exception for individuals (S2) | Option (b): documented exception via a half-day bridge |
| D5 | Whether planning-assumption percentages appear in learner materials | Nowhere in learner materials |
| D6 | Name of the end-of-level record | "Record of attendance and proof of level", not "certificate" |
| D7 | Platform scope | Levels 4 and 5 on the client's platform with the same modules; level 7 on Claude Code only; phase 2 writes platform notes, not three curricula |
| D8 | Who runs the cold-run and second-person tests on the individual course | Another participant in session, then a colleague at work within two weeks; never the instructor alone |
| D9 | Optional half-day manager's module for level 2 sponsors | Add as optional, outside the ladder |
| D10 | Whether the 90-minute department lab sits inside level 3 or is a separate product | Inside level 3 for the curriculum; priced as today |

The full wording, options and reasons are in the outlines document, section 4.5. A separate question not in that list: whether the policy sample is ever linked from the public site, or stays a sales document.

## 6. Problems met and how they were resolved

- Skill tooling for LibreOffice and `pdftoppm` is not available on this Windows machine; PDFs were produced with Word COM (`ExportAsFixedFormat`) and page images with PyMuPDF.
- The contents heading listed itself in the TOC; fixed with a plain styled paragraph (`ContentsTitle`).
- The landscape overview table left a half-empty page; fixed by allowing rows to split.
- Both long documents ended on a nearly empty page; fixed by moving the closing callouts.
- The concise policy's document-control row initially carried a wrong next-review date; corrected to 1 May 2027.

## 7. Next steps when the owner returns

1. Read the outlines document, section 4 (validation points), and record D1 to D10.
2. Decide whether the policy sample is published before anything from `outputs/` is linked from the site.
3. Then phase 2 can start, level 3 first, using the source cross-reference table (section 4.6) to quote the right page or article for each module.
4. Keep `docs/LEVELS.md` as the canonical spec; if a decision changes a benchmark, change LEVELS.md and the site page together.
