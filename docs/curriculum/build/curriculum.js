const L = require('./lib');
const { P, Small, H1, H2, H3, Bullets, Numbered, Break, Tbl, Spacer, Callout, TitleBlock, section, build, save, TableOfContents, PORTRAIT_W, LANDSCAPE_W } = L;
const W = PORTRAIT_W, LW = LANDSCAPE_W;
const OUT = process.argv[2];

// ---------------------------------------------------------------- cover + contents
const cover = [
  ...TitleBlock('M.A.I. Consulting · AI Fluency Curriculum',
    'Curriculum outlines for review and approval',
    'Seven capability levels, built on the 4D AI Fluency framework (Delegation, Description, Discernment, Diligence)',
    ['Phase 1 deliverable: outlines only. No lessons, scripts, slide decks or production-ready exercises are included.',
     'Version 0.1 · 17 October 2026 · Prepared for the owner\'s review',
     'Sources cross-referenced: mai4consulting.com (Services, Levels, Knowledge hub, sample playbook, level pages 3 to 7, docs/LEVELS.md), the AI Tips newsletter editions, and the M.A.I. Consulting LinkedIn Page articles (AI Consulting series) and posts.',
     'Status: DRAFT. Stops at the approval gate. Nothing in this document is a learning material.']),
  Break(),
  L.ContentsTitle(),
  new TableOfContents('Contents', { hyperlink: true, headingStyleRange: '1-2' }),
  P('If the table does not show page numbers, update it in Word (right-click, Update field).', { size: 18, color: L.GREY }),
  Break(),
];

// ---------------------------------------------------------------- 0. how to read
const howToRead = [
  H1('0. How to read this document'),
  P('This is the first of two phases. It contains four parts, in the order you asked for: the overall curriculum outline, the seven-level overview table, a detailed outline per level, and the validation points that need your decision before anything is written in full.'),
  P('Three conventions apply throughout.'),
  ...Bullets([
    '**Published benchmarks are preserved.** Delivery days per level (3 · 5 · 6.5 · 8 · 10, cumulative from level 2), the level names, the proof of each level, the "skip for now" lists and the planning-assumption percentages are taken unchanged from docs/LEVELS.md and the live training page. Where this outline proposes a change, it says so and gives the reason (section 4).',
    '**Hours are split four ways.** Instructor-led (IL): presentation, demonstration, discussion. Guided practice (GP): hands-on work in the session on the learner\'s own task with the instructor present. Independent practice (IP): work between sessions on real tasks, logged. Elapsed: calendar time from the first session to the proof. IL plus GP equals contact time; one delivery day is assumed to be six contact hours (assumption A1).',
    '**No productivity promise.** The percentages on the site are planning assumptions on tasks in scope. In this curriculum they appear only in the "expected results" column as the figure each engagement measures itself against at ninety days; they are not taught as outcomes and not printed on any learner material.',
  ]),
  Spacer(),
  Callout(['**The one idea the whole curriculum turns on.** The same study that measured a 25% speed gain on tasks inside the tool\'s competence found AI users 19 percentage points less likely to be correct on a task outside it (Dell\'Acqua et al., HBS 2023). Every level above 2 is therefore taught with its own refusal cases, and every proof of level includes work the learner declined to delegate, not only work they delegated.']),
];

// ---------------------------------------------------------------- 1. overall outline
const overall = [
  Break(),
  H1('1. Overall curriculum outline'),
  H2('1.1 Purpose'),
  P('A practical, progressive curriculum that takes a non-technical professional from wherever they start (level 1 or 2) to the level their work actually needs, one capability at a time, with a tangible product and a recorded proof at each level. Level 3 is the training floor. Levels 1 and 2 are placements, not destinations: nobody is "trained to" level 2.'),
  H2('1.2 Target learners'),
  P('The curriculum is written for people who use AI at work or in study and cannot say what they personally should learn next. Three personas recur in every level, in the order the site uses, and every example in the outlines is drawn from their work:'),
  Tbl(['Persona', 'Typical work the curriculum is built on', 'Usual starting level', 'Usual target'],
    [['NGO and international-organisation staff (programmes, fundraising, finance, HR, communications, leadership, M&E)', 'Donor narrative reports from field notes, logframe indicator wording, funder-template proposals, budget narratives, board papers, press and social copy, translation for review', '2 (occasional, no method)', '3 for all staff; 4 for anyone with a recurring workstream; 5 to 7 for champions and the person who "runs it through the AI"'],
     ['Public-institution and resource-constrained team staff (small organisations, trade-support institutions, agencies)', 'Procedure drafts, procurement comparison tables, stakeholder consultation summaries, plain-language rewriting, multilingual outreach', '1 or 2', '3 for all; 4 for team leads; 6 for one named champion per organisation'],
     ['Representatives sent on a course; students and recent graduates', 'Literature matrices, policy briefs from regulations, meeting follow-ups, thesis chapters under disclosure rules', '1 or 2', '3; 4 where one recurring workstream exists'],
    ], [2600, 3600, 1500, 1938]),
  Spacer(),
  P('Levels are set per person and, in a team engagement, per group. A fundraising team at level 2 and a leadership team at level 4 are trained separately. Levels 6 and 7 are bought for a few staff, not for everyone (training page: "the right target for champions and team leads").'),

  H2('1.3 Progression logic'),
  P('Level 3 carries all the background (what a model is, the brief, the checks, the data rules). Every later level assumes it and adds exactly one capability. Progression is gated by a proof artefact, not by attendance:'),
  Tbl(['From', 'To', 'The one capability added', 'Gate: the proof that must exist before the next level starts'],
    [['1 or 2', '3 Structured', 'A method: brief, ground, verify, log', 'Three real tasks delivered with the four checks recorded (section 3.1)'],
     ['3', '4 Set up', 'Persistent context: nothing briefed twice', 'One Project and one Skill a colleague has run cold at the same quality'],
     ['4', '5 Delegating', 'Whole jobs handed to agents and supervised', 'One multi-step job delegated end to end, with a test set, a permissions note and a verified result'],
     ['5', '6 Building', 'Set-ups built for other people, with owners and evaluation', 'The department\'s set-ups survive a week without the builder; a new colleague can start from the operating guide'],
     ['6', '7 At the terminal', 'Batch work on folders of files, supervised, without code', 'One pipeline on real files with a dry run, a log, and a second person who has run it from the runbook'],
    ], [700, 1500, 3000, 4438]),
  Spacer(),
  P('The ladder is linear in the published framework. Validation point V-S2 asks whether a documented exception (level 5 straight to level 7 for an individual power user who will never build for others) should exist.'),

  H2('1.4 Prerequisites'),
  Tbl(['Level', 'Prerequisites (learner)', 'Prerequisites (organisation or course host)'],
    [['3', 'An account on an approved assistant with file upload. Five real tasks from their own work listed in advance (pre-work, 1 hour), three of which will be delivered during the level. A baseline time noted for each.', 'An approved tool list, or at minimum the "ground rules" (what never goes into a chat, disclosure norm, five agreed terms) set in an afternoon by the manager. Paid or organisational tier with training on inputs turned off, or an explicit decision that free tier is acceptable for public-class data only.'],
     ['4', 'Proof of level 3. One recurring workstream (weekly or monthly) the learner owns. The template, the last two good examples and the rules document for it, with no personal data.', 'A plan that supports Projects, custom instructions and Skills (Claude), Notebooks and agents (Copilot) or Gems (Gemini). Permission to connect one read-only folder.'],
     ['5', 'Proof of level 4. A multi-step job the learner is allowed to delegate, with a known correct answer for five cases.', 'Organisation-approved agent tooling (research mode, a browser agent or one to two MCP connections) and a written note of what each can read and write. A named person to receive escalations.'],
     ['6', 'Proof of level 5. A role as champion, team lead or focal point, with time allocated (about 12 hours of independent practice over three weeks).', 'A team workspace. Authority to approve connectors and write access. An AI use policy in force, or the red lines and data classes agreed. A department willing to be the "customer" of three set-ups.'],
     ['7', 'Proof of level 6 (or the V-S2 exception). A real folder of files with a repetitive job (a year of reports, hundreds of documents, a monthly report from inputs), and a copy of it. A second person who will run the pipeline.', 'Claude Code (or equivalent) installable on the learner\'s machine; IT consent; git; a scheduled-task facility; the MCP servers the organisation has approved.'],
    ], [700, 4400, 4538]),

  H2('1.5 Learning outcomes'),
  P('By the end of the level they are trained to, learners can demonstrate the following. Each outcome is phrased so that it can be observed in a real artefact, not inferred from a quiz.'),
  H3('Level 3 · Structured (the floor)'),
  ...Bullets([
    'Explain, in one sentence each to a colleague, what a language model is and is not, the context window, model tiers, and the difference between web search and the model\'s own knowledge.',
    'Classify a task as delegate, partially delegate, or never, and state the handover point before the first judgement call.',
    'Write a full brief (role, audience, purpose, constraints, format, sources, what good looks like) and ground it in the uploaded source rather than a description of it.',
    'Iterate in short checked steps: options, critique, a second pass with one specific change.',
    'Run the four checks (figures, facts, language, defensibility) on every output and record them.',
    'Apply the organisation\'s data rules and keep a one-line log with disclosure where required.',
  ]),
  H3('Level 4 · Set up'),
  ...Bullets([
    'Build one Project for one recurring workstream with its reference files and instructions, free of personal data.',
    'Write custom instructions that encode audience, tone, format, refusals and when to ask.',
    'Turn five manual steps into one Skill with trigger, inputs, steps, output and checks, and test it against three known inputs.',
    'Connect one read-only folder and state what it exposes. Share and version a set-up so a colleague can run it cold.',
  ]),
  H3('Level 5 · Delegating'),
  ...Bullets([
    'Brief a whole job (inputs, outputs, stopping rules, what to ask about, what never to do) rather than a step.',
    'Map the blast radius of an agent before delegating and set read, write and send permissions per task.',
    'Build a five-case test set and verify agent output against it; run two or three workstreams in parallel and supervise them.',
    'Recognise prompt injection in content the agent reads, and keep the never-delegate list and the escalation path.',
  ]),
  H3('Level 6 · Building'),
  ...Bullets([
    'Design a Skill or agent for someone else: inputs, method, outputs, refusal cases, operating guide, named owner, test set.',
    'Evaluate colleagues\' AI-assisted output against a rubric and feed corrections back into the set-up.',
    'Record connector and MCP permissions at organisation level, including write access and its approval.',
    'Compare models and vendors on cost per completed task, data terms and exit plan; run the six-month playbook review.',
  ]),
  H3('Level 7 · At the terminal'),
  ...Bullets([
    'Set up a working folder with a CLAUDE.md, permission modes and hooks, and never run on the only copy.',
    'Run batch work and a year-wide review on hundreds of files with a dry run first and a log after.',
    'Build one repeatable pipeline with a runbook and a scheduled run that a second person has executed.',
    'State what is still engineering and hand it to an engineer.',
  ]),

  H2('1.6 Total duration and hours'),
  P('Contact time follows the published delivery days exactly. Independent practice and elapsed time are this outline\'s proposals (validation points V-A1, V-D1).'),
  Tbl(['Level', 'Delivery days (published, from the level below)', 'Instructor-led (IL) h', 'Guided practice (GP) h', 'Contact h (IL+GP)', 'Independent practice (IP) h', 'Elapsed (proposed)'],
    [['3 Structured', '3', '6.5', '11.5', '18', '9', '2 to 3 weeks'],
     ['4 Set up', '2', '4.5', '7.5', '12', '6', '2 weeks'],
     ['5 Delegating', '1.5', '3.5', '5.5', '9', '5', '2 weeks'],
     ['6 Building', '1.5', '4.25', '4.75', '9', '12', '3 to 4 weeks'],
     ['7 At the terminal', '2', '4.0', '8.0', '12', '8', '2 to 3 weeks'],
     ['**Whole ladder, 2 to 7**', '**10**', '**22.75**', '**37.25**', '**60**', '**40**', '**11 to 14 weeks**'],
    ], [1500, 1500, 1200, 1200, 1200, 1400, 1638], { boldFirst: true }),
  Spacer(),
  P('Reading the table. About 38% of contact time is instruction and 62% is guided practice on the learner\'s own tasks, which matches the site\'s position that "the gain is in which tasks are handed over and how the output is checked", and the newsletter\'s repeated point that passive training does not change behaviour. Independent practice is deliberately heaviest at level 6, where the proof (set-ups that survive a week without the builder) cannot be compressed into a session.'),
  P('Delivery formats. In person: full days of six contact hours. Online: each delivery day split into two half-days of three hours on separate days, which lengthens elapsed time by about a week per level but not the hours. The three-day level 3 course for up to nine participants follows this outline unchanged; a team engagement maps the general module onto modules 3.2 to 3.9 and the 90-minute department labs onto guided practice in modules 3.5, 3.8 and 3.11.'),

  H2('1.7 Assessment approach'),
  P('Assessment is by proof artefact, not by test. Each level ends with the proof already defined on the site, scored against a short rubric and, from level 4 upward, confirmed by a second person running the set-up cold. Four indicator families are used throughout, measured in aggregate rather than per named individual, so that staff do not perform for the metric.'),
  Tbl(['Indicator family', 'How it is measured', 'Where it appears'],
    [['Output quality', 'A four-criterion rubric scored 0 to 3 (brief completeness, source grounding, checks recorded, defensibility). Proof of level requires every criterion at 2 or above (proposed threshold, V-D3).', 'Every level; the rubric deepens at 6 into the one used to review colleagues'],
     ['Error rate', 'In training: catch rate on a seeded-error exercise (a draft with planted figure, fact, language and omission errors). In work: unverified figures or facts found by the second reviewer per delivered item, aiming at zero before the item leaves the team.', 'Levels 3, 5, 6, 7'],
     ['Task completion time', 'Baseline time for each in-scope task recorded as pre-work; the same tasks timed in aggregate at ninety days. Supervision time versus doing time recorded for delegated jobs. Checking time is counted, never omitted (the verification tax).', 'Levels 3, 4, 5, 7; the ninety-day re-measurement'],
     ['Demonstrated adoption', 'Log entries per week; set-ups used by someone other than the author; cold runs passed; playbook revisions made by the team; attendance and training record kept for the evidence file.', 'Levels 3 to 7; the six-month re-score'],
    ], [1900, 5200, 2538]),
  Spacer(),
  P('Language. The record issued at the end is a "record of attendance and proof of level". It is documentation, not a certificate and not a certification, in line with the Knowledge hub\'s position that the precise label survives questions from boards, funders and auditors.'),

  H2('1.8 Follow-up arrangements'),
  ...Bullets([
    '**Ninety days after each level:** the in-scope tasks are re-timed in aggregate and the learner\'s log is reviewed. This is where the planning-assumption percentage is replaced by the organisation\'s own figure.',
    '**Monthly office hours** (Fluency Support, one delivery day a month) for any learner stuck on live work; patterns that work are added to the playbook in the next revision.',
    '**Six-month re-score** against the original baseline, using the extended readiness instrument, and the six-month playbook review with its four early triggers (departed contact, changed tool, repeated escalation, changed law).',
    '**Champion coaching** for level 6 learners to run the level 3 general module themselves, so questions are answered inside the organisation.',
    '**Onboarding pack** so staff who join after the engagement receive the same playbook, the same rules and the same log template.',
  ]),
];

// ---------------------------------------------------------------- 2. seven-level table (landscape)
const overview = [
  H1('2. Seven-level overview'),
  P('One table, the seven levels side by side. Durations are the published delivery days; elapsed time, practical work, deliverables, results and progression criteria are this outline\'s proposals. Levels 1 and 2 are placements and have no training content, so their rows describe what is observed and what moves the person to level 3.', { size: 20 }),
  Tbl(['Level', 'Objective', 'Competencies (4D emphasis)', 'Duration', 'Practical work', 'Final deliverable', 'Expected results (observable)', 'Criteria to progress'],
    [
      ['**1 · Not started**', 'Placement only. Has not used an assistant for work.', 'None yet. Often the strongest reservations, which are useful: objections are specific and can be answered with their own documents.', 'Starting point. No days.', 'None. A 30-minute first session on one real task is the only intervention, inside level 3 day 1.', 'A self-placement and a list of five real tasks (pre-work).', 'Attends level 3 with three tasks chosen and a baseline time for each.', 'Same entry as level 2: five tasks listed, an approved tool account, pre-work done.'],
      ['**2 · Occasional**', 'Placement only. Asks for a summary, a search or a first draft, without a method.', 'Delegation and Description present but unsystematic; Discernment and Diligence absent. Results vary by person and by day.', 'Starting point. No days.', 'None. Where most organisations sit.', 'Same pre-work as level 1.', 'Same as level 1.', 'Same as level 1.'],
      ['**3 · Structured** (the floor)', 'Write a full brief, ground it in the real document, verify before anything leaves the team, log it.', 'All four, introduced: Delegation (task by task, handover point, never list); Description (the brief, the source, iteration); Discernment (four checks, calibrated trust); Diligence (log, disclose, own).', '3 delivery days · 18 contact h · 9 IP h · 2 to 3 weeks', 'Three real tasks from own work carried end to end; a seeded-error hunt; a role track (reports for many audiences, defensible research, meetings, M&E, translation).', 'Three delivered tasks with checks recorded; one-page personal playbook (5 to hand over, 3 never, patterns, checks, log); a log with at least three entries.', 'Three items went out with zero unverified figures. Brief completeness 7/7 on each. Baseline times recorded. Planning assumption for the 90-day re-timing: 20 to 30% on tasks in scope.', 'Rubric at 2+ on all four criteria for all three tasks; the never list contains at least one task the learner declined to delegate with the reason; log kept.'],
      ['**4 · Set up**', 'Load context once (Projects, custom instructions, Skills, one read-only connector) so nothing is briefed twice and quality stops depending on who asked.', 'Description becomes context engineering; Diligence adds set-up hygiene (no personal data in shared workspaces, dated files, reviewed instructions). Delegation and Discernment reused unchanged.', '2 days · 12 contact h · 6 IP h · 2 weeks', 'Build one Project for one workstream; write custom instructions; turn five manual steps into one Skill; connect one folder read-only; colleague cold run.', 'One Project (file manifest, instructions), custom instructions, one one-page Skill with three test inputs, a version line and changelog, a cold-run record.', 'A colleague produces the same rubric score on the same task without the author. The recurring task is no longer re-briefed. Planning assumption for re-timing: 30 to 40% on tasks in scope.', 'Cold run passed (colleague\'s output within one rubric point of the author\'s); set-up audit clean (no personal data, no stale file, no biasing instruction); version kept.'],
      ['**5 · Delegating**', 'Hand whole multi-step jobs to agents, supervise rather than type, run workstreams in parallel.', 'Delegation becomes whole-job briefing with stopping rules; Discernment becomes a test set and human review where confidence and competence diverge; Diligence adds permissions, blast radius, escalation and the near-miss log.', '1.5 days · 9 contact h · 5 IP h · 2 weeks', 'Brief a whole job; map blast radius; build a five-case test set; run two or three workstreams in parallel; delegate one real job; review against the test set.', 'Job brief; five-case test set with results; permissions note (read, write, send, per task); verified result; near-miss entry where applicable.', 'One whole job delegated end to end and verified. Test-set pass rate recorded. Supervision time versus doing time recorded. Planning assumption: 40 to 50% on delegated workstreams.', 'Test set passed at the agreed rate (proposed 5/5 on known cases); permissions note complete; one judgement explicitly kept human; escalation contact named.'],
      ['**6 · Building**', 'Build Skills, agents and connections for colleagues; review their output; own the operating guide.', 'Delegation designed for others (refusal cases, owner); Discernment becomes evaluation (rubric, test set, spot checks, reviewing colleagues); Diligence becomes governance (permissions record, injection defences, vendor and cost choices, six-month review).', '1.5 days · 9 contact h · 12 IP h · 3 to 4 weeks', 'Design and build three set-ups the department relies on, each with test set, owner and operating guide; connect approved sources; review colleagues\' output against a rubric; run the "one week away" test.', 'Three documented Skills or agents with test sets, owners and operating guides; a permissions record; a review rubric with corrections fed back; the department playbook with a review date.', 'The set-ups survive a week without the builder. A new colleague starts from the operating guide alone. Number of colleagues using the set-ups recorded. Team-level gain; no personal percentage.', 'One-week-away test passed; a new colleague\'s cold start from the guide passed; every set-up has a named owner who is not the builder\'s only backup.'],
      ['**7 · At the terminal**', 'Run agentic work on folders of files from the terminal (Claude Code), without writing code.', 'Delegation becomes batch work on files; Discernment becomes dry run, log and consolidated result; Diligence becomes secrets out of files, hooks, permission modes, git routine, runbook. Knows what is still engineering.', '2 days · 12 contact h · 8 IP h · 2 to 3 weeks', 'Set up a working folder with CLAUDE.md, hooks and permission modes; batch rename, classify or review hundreds of files with a dry run; one review across a year of reports; build one repeatable pipeline with a runbook and a scheduled run.', 'CLAUDE.md; hooks and permission settings; dry-run and run logs; one pipeline with runbook; the second person\'s run record; a "still engineering" note listing what was handed on.', 'One pipeline runs on real files. Every write preceded by a dry run. No secrets in the folder. A second person ran it from the runbook. Task-dependent gain; batch work can exceed any chat figure.', 'Second-person run passed; secrets scan clean; git routine followed (commit before and after); the engineering boundary stated in writing.'],
    ], [1300, 1700, 2100, 1300, 2000, 2000, 2200, 1970], { size: 16, cantSplit: false }),
];

// ---------------------------------------------------------------- 3. detailed level outlines
function moduleTable(rows) {
  return Tbl(['Module', 'Topics', 'IL h', 'GP h', 'IP h', 'Learners practise individually', 'Product of the module'], rows,
    [1300, 2600, 500, 500, 500, 2200, 2038], { size: 17 });
}
function levelSummary(rows) {
  return Tbl(['Item', 'Outline'], rows, [2200, 7438], { boldFirst: true });
}

const level3 = [
  H1('3. Detailed outline per level'),
  P('Each level lists its modules with the time allocated, what learners practise individually, the tangible product, the assessment, and the observable results. Instructor-led (IL), guided practice (GP) and independent practice (IP) are in hours; totals per level match section 1.6.'),
  H2('3.1 Level 3 · Structured (the floor)'),
  levelSummary([
    ['Objective', 'From either starting point, reach the floor: brief, ground, verify, log, on the learner\'s own work.'],
    ['Entry', 'Level 1 or 2. Pre-work (1 h, IP): list five real tasks with a baseline time, open the approved tool, read the one-page ground rules.'],
    ['Duration', '3 delivery days · 18 contact h (IL 6.5, GP 11.5) · IP 9 h · elapsed 2 to 3 weeks (day 1, one week, day 2, one to two weeks, day 3).'],
    ['Shape', 'Day 1 Foundations and the brief (Delegation, Description). Day 2 Discernment and the role workflow. Practice weeks. Day 3 Clinic, role track, playbook and proof.'],
    ['Tools', 'One chat assistant with file upload from the approved list (Claude, ChatGPT, Copilot or Gemini). Nothing else.'],
    ['Skip for now (taught as such)', 'Prompt frameworks with acronyms, API keys, agents, automation, model benchmarks, fine-tuning.'],
  ]),
  Spacer(),
  H3('Day 1 · Foundations and the brief'),
  moduleTable([
    ['3.1 Placement and task inventory', 'The seven levels in five minutes; the 4Ds as a vocabulary; the unit of AI value is a task, never a job; choosing three of the five tasks brought.', '0.5', '0.5', '1 (pre-work)', 'Mark their five tasks: frequency, who is harmed if wrong, baseline time. Choose three.', 'Personal task inventory (one page) with baseline times.'],
    ['3.2 What a model is and is not', 'Prediction from patterns, cut-off date, no memory unless added, no files unless given, false things said fluently; context window and "one job per chat"; fast versus strong tiers; web search versus own knowledge; what a language model cannot do; the 19-point finding.', '1.0', '0.25', '', 'Explain each concept to a neighbour in one sentence; pick the tier for three of their tasks.', 'A completed "explain it in a sentence" sheet (self-check).'],
    ['3.3 Data rules and the approved tool', 'Four data classes and the who-is-harmed test; what never goes into a chat (beneficiary, personal, confidential, unpublished financials); free tier versus paid or organisational plan and what happens to inputs; the approved list and its settings; disclosure norm.', '0.75', '0.5', '', 'Classify twelve realistic snippets (field note, grievance line, budget cell, public report) as may enter, may not, or ask.', 'Their own never-paste list, pinned.'],
    ['3.4 Delegation, task by task', 'Delegate, partially delegate, never; finding the handover point just before the first judgement call; when you do not need AI; the role playbooks (programmes, fundraising, finance, HR, communications, leadership) and their red lines.', '0.5', '0.5', '', 'Sort their five tasks into the three columns with the handover point written for each.', 'The "hand over / never" half of their personal playbook.'],
    ['3.5 Description: the full brief', 'Role, audience, purpose, constraints, format, sources, what good looks like; give the source document, never describe it; ask for the file, not the text; let the tool interview you first; name the output format first; make it calculate, not estimate.', '0.5', '1.0', '2 (finish task 1)', 'Write and run the brief for task 1 on their own document; compare against a one-line prompt on the same task.', 'Task 1 first draft with its brief saved.'],
  ]),
  Spacer(),
  H3('Day 2 · Discernment and the role workflow'),
  moduleTable([
    ['3.6 Iteration habits', 'Options, critique without rewriting, a second pass with one change; edit the paragraph, not the whole draft; short checked steps; the single follow-up question that fixes most bad outputs.', '0.5', '0.5', '', 'Three short rounds on their task 1 draft.', 'Task 1 at second-pass quality.'],
    ['3.7 The four checks and calibrated trust', 'Figures, facts, language, defensibility; the usual failure (a plausible figure in no source); reading as an editor, not a customer; which limit did I hit; the verification tax and when checking exceeds the gain; matching scrutiny to the stakes.', '0.75', '1.25', '', 'Seeded-error hunt: a role-specific draft with eight planted errors (two per check). Catch rate recorded. Then the four checks on their own task 1.', 'Check record for task 1; individual catch rate.'],
    ['3.8 Role workflow, end to end', 'One complete workflow for the learner\'s role, demonstrated then practised: donor report section from a logframe; policy brief from a regulation; budget narrative from the spreadsheet; job description and question bank; plain-language rewrite; translation first draft for a bilingual reviewer; meeting notes to follow-up email.', '0.25', '2.0', '6 (tasks 2 and 3 on real work)', 'Task 2 from brief to checked draft, on the real document, in the session.', 'Task 2 draft with brief and check record.'],
    ['3.9 Diligence: log, disclose, own', 'The one-line log (tool, task, date, disclosure yes or no); when funders, universities or employers require disclosure and the rule to name the task and the safeguard; the person who sends it owns it; AI is not a co-author.', '0.5', '0.25', '', 'Write their first three log lines; decide disclosure for each task.', 'Log started; disclosure decision per task.'],
  ]),
  Spacer(),
  H3('Day 3 · Clinic, role track, playbook and proof'),
  moduleTable([
    ['3.10 Clinic on tasks 2 and 3', 'Peer review in pairs against the four checks; the usual errors found in the practice weeks; what to do when the answer sounds right but the numbers are wrong.', '0.25', '1.75', '', 'Review a peer\'s task with the checks; receive the same; fix and re-run.', 'Tasks 2 and 3 at delivered quality with check records.'],
    ['3.11 Role track (choose one)', 'A: recurring reports and updates for many audiences (one source of truth, adapt per audience, check once upstream). B: research a programme officer can defend (source log, quote the passage, citations as leads). C: meetings: prep, follow-up, workshop notes to owned actions. D: monitoring and evaluation: narrative and charts from settled data; outliers, gap-filling and causal claims stay human. E: translation and multilingual outreach: draft once, bilingual review sentence by sentence.', '0.5', '1.5', '', 'One track exercise on their own material.', 'A track-specific pattern added to their playbook.'],
    ['3.12 Personal playbook and proof review', 'Assemble the one-page playbook: five tasks to hand over, three never, three prompt patterns tested on their files, the four checks, the never-paste list, the log line, the escalation contact. Proof review of the three tasks against the rubric.', '0.25', '1.5', '', 'Write the playbook; present one task with its check record to the instructor.', 'One-page personal playbook; rubric scores for three tasks.'],
    ['3.13 Close', 'What to skip for now and why; what level 4 adds and who needs it; the 90-day re-timing plan and how the log feeds it; where questions go afterwards.', '0.25', '', '', 'Book the three tasks for re-timing at 90 days.', 'Re-timing plan agreed.'],
  ]),
  Spacer(),
  levelSummary([
    ['Tangible products', 'Personal task inventory with baseline times; three delivered real tasks, each with its brief and check record; a one-page personal playbook; a log with at least three lines; an attendance record entry.'],
    ['Assessment', 'Portfolio review of the three tasks against the four-criterion rubric (brief completeness, source grounding, checks recorded with evidence, defensibility), 0 to 3 each, proof at 2 or above on all. Seeded-error catch rate recorded for the training record (no pass mark proposed; it is diagnostic, V-D3). Never list contains at least one declined task with the reason.'],
    ['Observable results', 'Three items left the team with zero unverified figures or facts. Every brief has all seven elements. The log exists and is in use at day 3. Baseline times exist for the 90-day re-measurement. Planning assumption for that re-measurement: 20 to 30% on tasks in scope, replaced by the organisation\'s own figure.'],
    ['Refusal cases taught', 'A beneficiary list in a field note; a grievance line; a payroll cell; a plausible figure not in the source; a confident wrong citation; a task that is rare, already fast, one-off or unrecoverable, where the honest answer is "you do not need AI for this".'],
  ]),
];

const level4 = [
  Break(),
  H2('3.2 Level 4 · Set up'),
  levelSummary([
    ['Objective', 'Load context once, in Projects, custom instructions and Skills, so nothing is briefed twice and quality stops depending on who asked.'],
    ['Entry', 'Proof of level 3. One recurring workstream the learner owns; its template, the last two good examples and the rules document, with no personal data (pre-work, 1 h).'],
    ['Duration', '2 delivery days · 12 contact h (IL 4.5, GP 7.5) · IP 6 h · elapsed 2 weeks.'],
    ['Shape', 'Day 1 Context engineering, the Project, instructions, the connector, the Skill design. Practice week. Day 2 Build and test the Skill, cross-tool equivalents, sharing and versioning, the cold-run proof.'],
    ['Tools', 'Claude Projects and Skills, Copilot Notebooks and agents, Gemini Gems, custom instructions in any assistant; one read-only connector to the folder the workstream uses.'],
    ['Skip for now', 'Building agents, MCP, automation platforms, the terminal.'],
  ]),
  Spacer(),
  H3('Day 1 · Standing context'),
  moduleTable([
    ['4.1 Context engineering, not prompt engineering', 'Quality depends on what the model has in front of it; persistent set-ups put the right material there every time; stale files and biasing instructions; your team\'s AI already has settings; your AI remembers you now (memory on or off, and how to control it).', '0.75', '0.25', '', 'Audit what their assistant already remembers and what settings are on.', 'A settings and memory note for their account.'],
    ['4.2 Projects: one per workstream', 'A Project holds standing files and instructions for one workstream, not one per task or per person; what goes in (template, two best examples, rules, glossary) and what never does (personal data); sharing a workspace shares its files.', '0.5', '1.5', '', 'Build the Project for their workstream from the pre-work files; write its instructions.', 'A working Project with a file manifest (name, date, purpose).'],
    ['4.3 Custom instructions', 'Who you are, who you write for, tone and format defaults, what to refuse, when to ask a clarifying question; instructions, not wishes ("never invent a figure; write not in source").', '0.5', '0.75', '', 'Write and test custom instructions on two outputs; compare before and after.', 'Custom instructions in force, with the two comparison outputs.'],
    ['4.4 Read-only connectors', 'Connect a folder, not a drive; look at what it can see before relying on it; what a read connector exposes; where the organisation\'s policy allows it.', '0.5', '0.5', '', 'Connect one folder read-only (or document why not yet) and list what it exposes.', 'Connector note: scope, what it exposes, approval.'],
    ['4.5 Skills: from five manual steps to one Skill', 'What a Skill is in plain language; how a Skill remembers what a chat forgets; when a Skill beats a better question and when it does not; the one-page design: trigger, inputs, steps, output, checks; the first Skill every small team should build.', '0.5', '0.25', '4 (draft the Skill)', 'Choose the weekly task; write the five manual steps as they do them today (the written method is the readiness test).', 'Skill design sheet, one page.'],
  ]),
  Spacer(),
  H3('Day 2 · Build, share, prove'),
  moduleTable([
    ['4.6 Build and test the Skill', 'Turning the design sheet into a Skill on the learner\'s platform; testing against three known inputs before trusting it; why "automate everything" is the wrong goal for a first Skill.', '0.25', '1.75', '', 'Build the Skill; run three known inputs; fix what fails.', 'Working Skill with three test results.'],
    ['4.7 Cross-tool equivalents', 'Projects, Notebooks and Gems side by side; choose by where the work lives, not by a ranking; one paid assistant used daily; switching tools without losing the workflow.', '0.75', '0.25', '', 'Map their set-up onto the organisation\'s second tool, if any.', 'A one-paragraph portability note.'],
    ['4.8 Sharing, versioning, set-up hygiene', 'A date in the file name and a changelog line at the top; a set-up only you can use is not finished; the set-up audit (no personal data, no stale file, no instruction that silently biases every output); who owns the set-up.', '0.5', '0.5', '', 'Version both set-ups; run the audit checklist on a peer\'s Project.', 'Versioned set-ups; audit checklist completed.'],
    ['4.9 Cold-run proof', 'A colleague runs the Project and the Skill without the author on the same task; outputs scored against the level 3 rubric; time compared with the level 3 baseline.', '0.25', '1.75', '2 (repeat on real work with a colleague)', 'Act as the cold-running colleague for a peer, then receive the same.', 'Cold-run record: who, what, rubric scores, time.'],
  ]),
  Spacer(),
  levelSummary([
    ['Tangible products', 'One Project with manifest and instructions; custom instructions; one one-page Skill with three test results; a connector note; a version line and changelog; a cold-run record.'],
    ['Assessment', 'Cold run: the colleague\'s output scores within one rubric point of the author\'s on the same task, without the author present. Set-up audit clean on three items (no personal data, no stale reference file, no biasing instruction). Version kept.'],
    ['Observable results', 'The recurring task is no longer re-briefed (the brief lives in the Project). A colleague reproduces the quality. Time per task recorded against the level 3 baseline for the 90-day re-measurement; planning assumption 30 to 40% on tasks in scope.'],
    ['Refusal cases taught', 'A Project that contains a beneficiary list because it was convenient; a connector to a whole drive; last year\'s template still shaping this year\'s report; a tone rule that was right once.'],
  ]),
];

const level5 = [
  Break(),
  H2('3.3 Level 5 · Delegating'),
  levelSummary([
    ['Objective', 'Hand whole multi-step jobs to agents, supervise rather than type, run workstreams in parallel, with permissions set deliberately.'],
    ['Entry', 'Proof of level 4. A real multi-step job the learner is allowed to delegate, with five cases whose correct answer is known (pre-work, 1 h).'],
    ['Duration', '1.5 delivery days · 9 contact h (IL 3.5, GP 5.5) · IP 5 h · elapsed 2 weeks.'],
    ['Shape', 'Day 1 What an agent is, blast radius and permissions, the never list and escalation, the whole-job brief, the test set. Practice week: one real job delegated. Half day 2 Parallel work and supervision, review clinic, proof. (The never list and the escalation path are taught before the learner first delegates a real job.)'],
    ['Tools', 'Claude agents and research mode, Claude in Chrome, Copilot agents, Gemini deep research; one or two MCP connections approved by the organisation.'],
    ['Skip for now', 'Building your own MCP server, the terminal, orchestration frameworks.'],
  ]),
  Spacer(),
  H3('Day 1 · Briefing a whole job safely'),
  moduleTable([
    ['5.1 Agents: what they gain and what they cost', 'An agent plans, acts with tools, checks and repeats; whole jobs and parallel work versus less visibility, more verification and real actions in real systems; deep research and long-running tasks and how to brief them; agents, subagents and skills: what each is for.', '0.75', '0.25', '', 'Classify three of their jobs: chat, Skill, or agent (does the task have to decide what happens next?).', 'A "which tool" note for three jobs.'],
    ['5.2 Blast radius and permissions', 'What the agent can reach on its worst day; read, write and send separated; access per task, not per agent; browser agents inherit the logged-in session, so judge the session, not the task; MCP at the user level: what a connection reads, writes, and who approved it; indirect prompt injection in one page.', '1.0', '0.75', '', 'Draw the blast radius of their job; write the permissions note.', 'Permissions note (read, write, send, per task, approver).'],
    ['5.3 The never list, escalation and the near-miss log', 'Tasks never automated with an agent (safeguarding referrals, eligibility decisions, payment authorisation, public statements on live matters, employment decisions); the escalation path and the 24-hour rule; notice, name, narrow: the near-miss log. Taught before the first real delegation.', '0.5', '0.25', '', 'Mark which of their candidate jobs touch the never list; name their escalation contact; adopt the near-miss log template.', 'Escalation contact named; never-list check on their job; near-miss log opened.'],
    ['5.4 Brief a whole job', 'Inputs, outputs, stopping rules, what to ask about, what never to do; write the method before you buy the agent; the five questions before delegating.', '0.5', '1.0', '', 'Write the whole-job brief for their real job and have a peer attack it ("what would the agent do wrong with this?").', 'Whole-job brief, peer-tested.'],
    ['5.5 The five-case test set', 'Five known cases with expected results; run before trusting; where confidence and competence diverge, put the human review there, not at the end; batch approvals are oversight in name only.', '0.25', '0.75', '5 (delegate the real job end to end)', 'Build their five cases; run two of them live.', 'Test set with the first two results.'],
  ]),
  Spacer(),
  H3('Half day 2 · Parallel work, review and proof'),
  moduleTable([
    ['5.6 Parallel workstreams and supervision', 'Running two or three jobs at once; what to watch; supervising rather than typing; orchestrating work as the goal, not doing it faster.', '0.25', '0.5', '', 'Run two workstreams in parallel on sample material and keep a supervision log.', 'Supervision log for a parallel run.'],
    ['5.7 Review clinic', 'Results against the test set; what failed and why (the limit hit); supervision time versus doing time; cost of the run; the near-miss entries from the practice week.', '0.25', '1.25', '', 'Present their delegated job, test-set results, times and any near-miss entry to a peer reviewer.', 'Verified result; test-set scorecard; time and cost record; near-miss entry where applicable.'],
    ['5.8 Proof review', 'The job brief, test set, permissions note and verified result reviewed against the rubric.', '', '0.75', '', 'Proof presentation.', 'Rubric record for level 5.'],
  ]),
  Spacer(),
  levelSummary([
    ['Tangible products', 'Whole-job brief; five-case test set with results; permissions note; supervision log; verified result; near-miss entry; a named escalation contact.'],
    ['Assessment', 'Test set passed at the agreed rate (proposed: all five known cases, V-D3); permissions note complete and read-only wherever possible; one judgement explicitly kept human; the result verified by the four checks before use.'],
    ['Observable results', 'One whole job delegated end to end and verified. Supervision time versus doing time recorded for the 90-day comparison; planning assumption 40 to 50% on delegated workstreams. No agent action in a live system without a reviewed write permission.'],
    ['Refusal cases taught', 'A web page that instructs the agent; an agent that sends, deletes or pays; a runaway research run; a browser agent in a session where irreversible actions are available; a judgement delegated that must stay human.'],
  ]),
];

const level6 = [
  Break(),
  H2('3.4 Level 6 · Building'),
  levelSummary([
    ['Objective', 'Build Skills, agents and connections for colleagues; review their output; own the operating guide. For champions and team leads, not for everyone.'],
    ['Entry', 'Proof of level 5. A champion, team lead or focal-point role with about 12 hours over three weeks. A department that will use the three set-ups. The organisation\'s red lines and data classes agreed (a policy in force, or at least the ground rules).'],
    ['Duration', '1.5 delivery days · 9 contact h (IL 4.25, GP 4.75) · IP 12 h · elapsed 3 to 4 weeks.'],
    ['Shape', 'Day 1 Designing for others, evaluation, organisation-level connectors, injection in depth, models and vendors. Two to three weeks: three set-ups built, operating guide, the one-week-away test. Half day 2 Review, the review cycle, proof.'],
    ['Tools', 'Shared Skills, a team workspace (Claude for Team or Enterprise, Copilot Studio), MCP connections, an evaluation sheet.'],
    ['Skip for now', 'Coding, custom software, model training.'],
  ]),
  Spacer(),
  H3('Day 1 · Designing, evaluating, governing'),
  moduleTable([
    ['6.1 Designing for someone else', 'Inputs, method, outputs, refusal cases, operating guide, named owner, test set: what makes a set-up survive its author; agent, skill or tool and what each costs to build, run and govern; the apprenticeship problem (Draft, Review, Own) so juniors still learn.', '0.75', '0.75', '', 'Write the design sheet for set-up 1 with a "customer" from the department.', 'Design sheet 1 with refusal cases and owner.'],
    ['6.2 Evaluation', 'Rubrics, test sets, spot checks; reviewing colleagues\' AI-assisted output: judge the decisions, not just the output; feeding corrections back into the set-up; the attendance and training record as evidence.', '0.5', '1.0', '', 'Score three colleague outputs with the rubric; write one correction into a set-up.', 'Department review rubric, first use recorded.'],
    ['6.3 Connectors and MCP at organisation level', 'Which servers exist, what each exposes, write access and its approval, logging; the permissions record; the trust ladder for an experimental feature (sandbox to standard, with a fallback and an owner at each step).', '0.75', '0.25', '', 'Draft the permissions record for the department\'s connections.', 'Permissions record (draft).'],
    ['6.4 Injection and exfiltration in depth', 'Prompt injection for people who will never write a filter; the document store as an attack surface; scoping read access, curating trusted sources, logging what the agent reads; safeguarding language checks as a built rule; the policy clauses that apply.', '0.75', '0.25', '', 'Threat-walk one of their set-ups: what could an edited document make it do?', 'Injection note per set-up.'],
    ['6.5 Models, vendors and cost', 'Cost per completed task (including failed attempts, review and rework); reading a vendor benchmark; data terms and the exit plan (method, data, workflow, account control); time saved is not value: hours to capacity, outcomes and budget lines.', '0.75', '0.25', '12 (build three set-ups, operating guide, one-week-away test)', 'Fill a completed-task ledger for one set-up.', 'Completed-task ledger, one row.'],
  ]),
  Spacer(),
  H3('Half day 2 · Review and proof'),
  moduleTable([
    ['6.6 Review of the three set-ups', 'Each set-up against its test set; what broke during the week away; corrections; ownership confirmed.', '0.25', '1.25', '', 'Present the three set-ups and the week-away evidence.', 'Three set-ups at reviewed quality.'],
    ['6.7 The operating guide and the review cycle', 'The department playbook belongs to the team, not the trainer; the six-month review and its four early triggers; the rationale ledger (why each boundary exists) so the "why" survives turnover; institutional memory.', '0.5', '0.5', '', 'Write the review date, triggers and rationale lines into the operating guide.', 'Operating guide with review cycle and rationale ledger.'],
    ['6.8 Proof review', 'Operating guide, owners, test sets and the new-colleague cold start reviewed.', '', '0.5', '', 'Proof presentation.', 'Rubric record for level 6.'],
  ]),
  Spacer(),
  levelSummary([
    ['Tangible products', 'Three documented Skills or agents, each with a test set, a named owner and an operating guide; a permissions record; a department review rubric with corrections fed back; the department playbook with a review date and rationale ledger.'],
    ['Assessment', 'The one-week-away test: the set-ups ran for a week without the builder and the log shows it. A new colleague started from the operating guide alone and produced an acceptable output. Every set-up has an owner other than the builder.'],
    ['Observable results', 'Number of colleagues using the set-ups; corrections fed back per month; the department playbook revised by the team, not the trainer. Team-level gain; no personal percentage is claimed.'],
    ['Refusal cases taught', 'A set-up everyone depends on with nobody owning it; a connector with write access nobody reviewed; a champion who leaves with the method in their head; a vendor benchmark taken as evidence.'],
  ]),
];

const level7 = [
  Break(),
  H2('3.5 Level 7 · At the terminal'),
  levelSummary([
    ['Objective', 'Run agentic work on folders of files from the terminal (Claude Code), without writing code: the same thing done to a hundred documents in one supervised run.'],
    ['Entry', 'Proof of level 6 (or the V-S2 exception). A real folder with a repetitive job and a copy of it. Claude Code installed with IT consent. A second person identified.'],
    ['Duration', '2 delivery days · 12 contact h (IL 4.0, GP 8.0) · IP 8 h · elapsed 2 to 3 weeks.'],
    ['Shape', 'Day 1 The terminal, Claude Code without code, dry runs and batch work, git and secrets. Practice week: a batch job on the copy. Day 2 The year-wide review, the repeatable pipeline, the engineering boundary, the second-person proof.'],
    ['Tools', 'Claude Code (or an equivalent terminal agent), a terminal, git, a scheduled task, approved MCP servers. A copy of the real folder, never the only copy.'],
    ['Skip for now', 'Learning a programming language. It is a different course.'],
  ]),
  Spacer(),
  H3('Day 1 · Files and folders as the unit of work'),
  moduleTable([
    ['7.1 The terminal and the working folder', 'A text window: type what to do and where; one folder per job; copy the files in; never run on the only copy.', '0.5', '0.5', '', 'Create the working folder from a copy of their real files; open the terminal in it.', 'A working folder, copied.'],
    ['7.2 Claude Code without code', 'CLAUDE.md (what the files are, the rules, the output format, what never to touch); permission modes (ask before every write until you trust the run; never "allow all" on real files); hooks that block deletes and writes outside the folder; Skills and slash commands for repeated jobs; MCP servers in the terminal.', '1.0', '1.0', '', 'Write their CLAUDE.md; set permission mode; add one hook that blocks deletion.', 'CLAUDE.md and a hooks setting, tested.'],
    ['7.3 Dry run and batch work', '"List what you would change. Change nothing."; rename, restructure, classify or review a hundred files in one run; the log after; reading the log before trusting the result.', '0.5', '1.5', '', 'Dry run, then live run, of one batch job on the sample folder; read the log.', 'Dry-run log and run log for one batch job.'],
    ['7.4 git in three commands; secrets out of files', 'Commit before the run, commit after; what versioning protects; no passwords, tokens or keys in the folder or in CLAUDE.md; a secrets scan.', '0.5', '0.5', '6 (batch job on the real copy; draft the pipeline)', 'Run the three commands around a job; scan the folder for secrets.', 'A commit history; secrets scan clean.'],
  ]),
  Spacer(),
  H3('Day 2 · The pipeline and the proof'),
  moduleTable([
    ['7.5 One review across a year of reports', 'The same review applied to every file with a reference to each file and page; one consolidated result; spot-checking the consolidation against three source files.', '0.25', '1.25', '', 'Run a year-wide review on their copy; spot-check three references.', 'Consolidated review with references; spot-check record.'],
    ['7.6 The repeatable pipeline', 'The monthly job from a folder of inputs; runbook a colleague can follow; a scheduled run and a person who reads the log; what to do when it fails.', '0.5', '2.0', '', 'Build the pipeline; write the runbook; schedule it; fail it on purpose and read the log.', 'Pipeline, runbook, schedule, failure note.'],
    ['7.7 What is still engineering', 'A database, a public interface, other people\'s credentials, an integration that can fail silently: hand it to an engineer; level 7 is batch document work on your own files, not software.', '0.5', '', '', 'Write the engineering boundary for their job: what was handed on and to whom.', '"Still engineering" note.'],
    ['7.8 Proof: the second person', 'A second person runs the pipeline from the runbook, cold; the dry run, the log and the result reviewed.', '0.25', '1.25', '2 (second-person run on the real copy)', 'Act as the second person for a peer, then receive the same.', 'Second-person run record.'],
  ]),
  Spacer(),
  levelSummary([
    ['Tangible products', 'CLAUDE.md; hooks and permission settings; dry-run and run logs; a consolidated year-wide review; one pipeline with runbook and schedule; a commit history; a secrets scan; a "still engineering" note; the second person\'s run record.'],
    ['Assessment', 'The second-person run passed from the runbook alone. Every write in the logs is preceded by a dry run. Secrets scan clean. Commit before and after each run. The engineering boundary is stated in writing.'],
    ['Observable results', 'One pipeline runs on real files on a schedule and a named person reads its log. Elapsed time of the batch job recorded against the manual baseline; task-dependent, and batch work can exceed any chat figure, so no percentage is set.'],
    ['Refusal cases taught', 'An agent allowed to delete because nobody asked for a dry run; a token in CLAUDE.md; a pipeline only its author can run; a job that was software all along.'],
  ]),
];

// ---------------------------------------------------------------- 4. validation points
const validation = [
  Break(),
  H1('4. Validation points'),
  P('Everything below needs either your confirmation or your decision before phase 2. Items are grouped: assumptions (A), missing information (M), overlaps (O), sequencing (S), decisions (D). Where the outline proposes a change to a published benchmark, it is marked **change** and the reason is given.'),
  H2('4.1 Assumptions made'),
  Tbl(['Ref', 'Assumption', 'Why it matters', 'Please confirm or correct'],
    [['A1', 'One delivery day equals six contact hours (IL plus GP). Online delivery splits a day into two three-hour half-days.', 'All hour totals in sections 1.6 and 3 derive from it. The site publishes days, never hours.', 'Confirm 6 h, or give the figure you plan against.'],
     ['A2', 'Group size is up to nine (the published course limit) for the individual course; team engagements run the same modules per group.', 'Guided-practice hours assume the instructor can review every learner\'s task in session.', 'Confirm.'],
     ['A3', 'Learners bring real tasks and real documents, and have an approved paid or organisational tool with training on inputs off.', 'Every proof is "work that went out". Without real tasks the curriculum collapses into exercises.', 'Confirm; and decide what happens when a client has no approved tool yet (V-M2).'],
     ['A4', 'Independent practice between sessions is time the employer releases (about 40 hours across the ladder).', 'Levels 6 and 7 proofs cannot be reached in contact time alone.', 'Confirm that this is sold as part of the engagement.'],
     ['A5', 'Levels 6 and 7 are delivered to one to three named people per organisation, not to departments.', 'Shapes the proof (the department as "customer") and the pricing of days.', 'Confirm.'],
     ['A6', 'LinkedIn sources were reviewed from the practice\'s own publication files (the AI Tips edition list and drafts, the AI Consulting series list), not scraped from LinkedIn live.', 'Edition titles were cross-referenced; the live pages were not re-read for edits made after publication.', 'Confirm this is acceptable, or ask for a live re-read of specific editions.'],
    ], [600, 3300, 3000, 2738]),

  H2('4.2 Missing information'),
  Tbl(['Ref', 'What is missing', 'Effect on the curriculum', 'What I need from you'],
    [['M1', 'The hours in a delivery day, and whether a day can be sold as two half-days.', 'See A1.', 'A number.'],
     ['M2', 'What the level 3 course does when the client has no approved tool list and no policy.', 'Module 3.3 needs a fallback: the "ground rules in an afternoon" page from the Knowledge hub, or a one-page interim rule set issued by the practice.', 'Decide whether the practice issues an interim rule set, and whether that is a free pre-work item or a billed half day.'],
     ['M3', 'The tool landscape per client (Microsoft 365 Copilot versus Claude versus Gemini).', 'Levels 4, 5 and 7 are platform-specific in practice. Level 7 is Claude Code; there is no Copilot equivalent at the "without code" bar.', 'Confirm that level 7 is taught on Claude Code only, and whether levels 4 and 5 need a Copilot variant of each module.'],
     ['M4', 'Delivery languages.', 'The Institution package promises English, French or Arabic. Level 3 role track E (translation) and the language check differ by language pair.', 'Confirm which levels must exist in French and Arabic in phase 2.'],
     ['M5', 'Existing rubric, attendance record and log templates.', 'If the practice already has them, phase 2 reuses them; if not, they are phase 2 deliverables.', 'Point me to any existing templates.'],
     ['M6', 'The baseline timing method.', 'The Knowledge hub says measure in aggregate, never named individuals. The pre-work asks each learner for a baseline time, which is individual.', 'Decide whether baseline times are collected per learner (kept private to the learner) and only reported in aggregate, or collected only at team level.'],
     ['M7', 'What an "approved MCP connection" means at a typical client.', 'Level 5 assumes one or two exist. Many NGOs will have none.', 'Decide whether level 5 may be taught with research mode and a browser agent only, with MCP as a demonstration.'],
    ], [600, 3000, 3300, 2738]),

  H2('4.3 Overlaps'),
  P('The ladder is a spiral by design: each competency returns at a higher level with one capability added. These are the places where the return risks feeling like repetition, with the proposed treatment.'),
  Tbl(['Ref', 'Overlap', 'Proposed treatment'],
    [['O1', 'The four checks (level 3, module 3.7) and evaluation rubrics (level 6, module 6.2).', 'Level 6 does not re-teach the checks; it turns them into a rubric for reviewing other people and adds "judge the decisions, not just the output". Any level 6 learner who cannot run the four checks unprompted is sent back to the level 3 proof.'],
     ['O2', 'Prompt injection: one page at level 5 (5.2) and in depth at level 6 (6.4).', 'Level 5 covers recognition and the defence a user controls (what the agent reads, permissions). Level 6 covers the organisation\'s defences (scoped access, curated sources, logging) and the policy clauses. Phase 2 must use different examples at each level.'],
     ['O3', 'Permissions: the permissions note (5.2) and the permissions record (6.3).', 'The note is personal and per job; the record is departmental and per connection. Same four columns (read, write, send, approver) so the note rolls up into the record.'],
     ['O4', 'Skills: built for oneself (4.5, 4.6) and built for others (6.1).', 'Level 4 stops at a Skill with three test inputs. Level 6 adds refusal cases, an owner, an operating guide and a test set someone else runs. The newsletter\'s Skills editions (what a Skill is, first Skill, testing a Skill, Skills versus hooks versus subagents) are split accordingly: the first three feed level 4, the last feeds level 5.'],
     ['O5', 'Data rules: level 3 (3.3) and the policy clauses at level 6 (6.4, 6.7).', 'Level 3 teaches the rules as given. Level 6 teaches how to write and review them. No learner at level 6 should be re-taught the four classes.'],
     ['O6', 'The general module for all staff (team engagement) and level 3 day 1 and 2.', 'They are the same content at different depth. Phase 2 should produce one set of material with a "one sitting" cut (the general module) and a "three days" cut (the course), not two sets.'],
     ['O7', 'Role playbooks (3.4) and the role track (3.11).', '3.4 uses the playbooks to sort tasks; 3.11 practises one workflow in depth. Keep both; they serve Delegation and Description respectively.'],
    ], [600, 3400, 5638]),

  H2('4.4 Sequencing problems'),
  Tbl(['Ref', 'Problem', 'Options', 'Recommendation'],
    [['S1', 'Level 3 day 3 depends on tasks 2 and 3 having been done on real work. If the practice weeks are skipped (three consecutive days), the proof becomes an exercise, not work that went out.', '(a) Insist on at least one week between day 2 and day 3. (b) Allow three consecutive days with the proof submitted two weeks later and reviewed remotely.', '(a) as default; (b) only for in-person courses with travel, with the remote proof review priced in.'],
     ['S2', 'The ladder is linear, but a solo "power user" who will never build for others has no reason to pass through level 6 to reach level 7.', '(a) Keep linear. (b) Document a 5 to 7 exception for individuals, with 6.3 (permissions record) and 6.4 (injection in depth) taken as a half-day bridge.', '(b). It preserves the framework (level 6 stays the champion level) and removes an incentive to skip the safety content. **Change** to the published "from level 6" entry for level 7; your call.'],
     ['S3', 'Level 4 assumes a paid plan with Projects or an equivalent; some learners at level 3 are on free tiers.', '(a) Make a paid plan a hard prerequisite. (b) Teach level 4 on the organisation\'s plan only.', '(a). Say so on the level 4 page.'],
     ['S4', 'Level 6\'s proof needs the set-ups to run for a week without the builder, which pushes elapsed time to three to four weeks. The site says a three-to-ten-day scope runs "across two to six weeks".', '(a) Keep the site range and accept a thin level 6 proof. (b) State that the full ladder in one run takes eleven to fourteen weeks and the two-to-six-week range applies per scope, not to the whole ladder.', '(b). **Change** to the published elapsed range wording, not to the days. Reason: the proofs for levels 4, 6 and 7 all need a second person to run something cold, which takes calendar time.'],
     ['S5', 'Module 3.2 (what a model is) comes before 3.5 (the brief) but after 3.1 asks learners to choose tasks, which they may choose badly without 3.4.', 'Accept: the choice is revisited in 3.4, and choosing before knowing is itself the diagnostic.', 'Keep as is.'],
    ], [600, 3000, 3000, 3038]),

  H2('4.5 Decisions requiring your approval'),
  Tbl(['Ref', 'Decision', 'Options', 'Recommendation'],
    [['D1', 'Contact hours per delivery day and the independent-practice hours sold with the engagement.', 'As in A1 and A4, or your figures.', '6 contact hours; about 40 IP hours across the ladder, stated in the quote.'],
     ['D2', 'Elapsed-time wording.', 'S4 (a) or (b).', '(b).'],
     ['D3', 'Assessment thresholds.', 'Rubric 2 or above on all criteria; test set 5 of 5 at level 5; seeded-error catch rate recorded but with no pass mark. Or stricter, or diagnostic only.', 'As proposed. Nothing in the sources supports a specific catch-rate threshold, so it is recorded, not graded.'],
     ['D4', 'The level 5 to 7 exception for individuals.', 'S2 (a) or (b).', '(b).'],
     ['D5', 'Whether the planning-assumption percentages appear anywhere in learner materials.', 'Nowhere (only in the engagement\'s measurement plan); or in the close of each level with the caveats.', 'Nowhere in learner materials.'],
     ['D6', 'Name of the end-of-level record.', '"Record of attendance and proof of level"; or "certificate of completion".', 'The first. The Knowledge hub\'s own position is that documentation is not certification.'],
     ['D7', 'Platform scope.', 'Levels 4 and 5 taught on the client\'s platform (Claude, Copilot or Gemini) with the same modules; level 7 on Claude Code only.', 'As stated. Phase 2 writes platform notes, not three curricula.'],
     ['D8', 'Who does the second-person and cold-run tests at the individual course (no colleague present).', 'Another participant; or a colleague back at work, reviewed remotely; or the instructor.', 'Another participant in session, and a colleague at work within two weeks for the record. Never the instructor alone.'],
     ['D9', 'Whether to add a half-day "manager\'s module" for leaders at level 2 who will not go to level 3 but sponsor it (the "leadership is the least fluent group" problem).', 'Add as an optional 0.5 day outside the ladder; or leave to the general module.', 'Add as optional, outside the ladder, so the seven levels stay as published.'],
     ['D10', 'Whether the department lab (90 minutes, team engagement) is treated as guided practice inside level 3 or as a separate product.', 'Inside level 3 for mapping purposes; separate for pricing.', 'Inside level 3 for the curriculum; priced as today.'],
    ], [600, 3000, 3000, 3038]),
  Spacer(),
  Callout(['**Approval gate.** This document stops here. On your approval of the outlines, with the decisions in 4.5 recorded, phase 2 produces the learning materials level by level, starting with level 3. Section 4.6 is a reference for that phase.']),

  H2('4.6 Source cross-reference'),
  P('Which source each part of the curriculum draws on, so that phase 2 can quote the right page.'),
  Tbl(['Curriculum element', 'Primary source', 'Supporting sources'],
    [['Level names, days, proofs, skip lists, risks', 'docs/LEVELS.md; the training page; the level pages 3 to 7', 'Knowledge: "The seven capability levels, and why Level 3 is the floor"'],
     ['The 4Ds as the module structure', 'Services page ("one framework underpins all five"); the general module', 'AI Tips: "Meet the 4Ds"; "The 4Ds cheat sheet"; Knowledge: "What AI fluency actually means: the 4Ds, reread"'],
     ['Module 3.5 (the brief) and 3.6 (iteration)', 'Level 3 page cheat sheet and example prompts', 'AI Tips editions 6 to 20 (prompt as a brief; what does good look like; first output is a draft; the single follow-up question); "ask for the file, not the text"; "edit the paragraph, not the whole draft"; "make the AI calculate, not estimate"'],
     ['Module 3.7 (the four checks, calibrated trust)', 'Knowledge: "The four checks before anything leaves the building"; "Calibrating trust in AI"; "The verification tax"', 'AI Tips: "Trust in AI should be calibrated not binary"; "Reading an AI answer like an editor"; "The verification habit that takes thirty seconds"; "What to do when AI\'s answer sounds right but the numbers are wrong"'],
     ['Module 3.3 (data rules)', 'Knowledge: "Data classification from zero"; "What personal data means once a prompt leaves the building"; "Ground rules for team AI use"', 'AI Tips: "Quick reference: what to never paste into an AI chat"'],
     ['Module 3.4 and 3.11 (delegation, role workflows)', 'Training page department labs; the six role playbooks; the sample playbook', 'AI Tips role editions (programme officer, communications lead, finance, research); Knowledge: "The unit of AI value is a task"; "Task decomposition: the handover point"; "When you do not need AI"'],
     ['Level 4 modules', 'Level 4 page; Knowledge: "Stop re-explaining yourself: Project or Skill"; "Context engineering vs prompt engineering"', 'AI Tips Skills editions 21 to 35; "Your AI remembers you now"; "Your team\'s AI already has settings"; "Copilot in Word, Excel, PowerPoint, Outlook, Teams"'],
     ['Level 5 modules', 'Level 5 page; Knowledge: "Blast radius"; "Browser agents in a logged-in session"; "Human-in-the-loop"; "Write the method before you buy the agent"; "The tasks we will never automate"', 'AI Consulting series: "Two kinds of AI control"; Knowledge: "AI policy escalation path and the 24-hour rule"; "The near-miss log"'],
     ['Level 6 modules', 'Level 6 page; Knowledge: "Named owner, operating guide, test set"; "Agent, skill or tool"; "Indirect injection"; "Prompt injection explained for executives and DPOs"; "Cost per completed task"; "Vendor concentration and the exit plan"', 'AI Consulting series: "Who tests the tester?"; "Institutional memory"; "The apprenticeship problem"; Knowledge: "Why the playbook belongs to the team"; "AI policy review: the six-month cycle"; "Reading a vendor benchmark"'],
     ['Level 7 modules', 'Level 7 page and its cheat sheet', 'Site page "Save Claude tokens"; "Claude in Chrome" page for the browser boundary'],
     ['Assessment and measurement', 'Services page (no published ROI; time the tasks before and after); Knowledge: "Before/after measurement without surveillance"; "The pilot that produces evidence"; "Time saved is not value"', 'Knowledge: "Before and after: one grant report with AI, honestly measured"; "The attendance record"; "Documentation is not certification"'],
     ['Follow-up arrangements', 'Fluency Support page', 'Knowledge: "Making AI adoption stick"; "Make AI training stick on real work"; "Re-scoring AI readiness"'],
    ], [2600, 3600, 3438]),
];

const HDR = 'AI Fluency Curriculum · Outlines for approval · v0.1 · 17 Oct 2026';
const doc = build([
  section([...cover, ...howToRead, ...overall], { headerText: HDR, first: true }),
  section(overview, { landscape: true, headerText: HDR }),
  section([...level3, ...level4, ...level5, ...level6, ...level7, ...validation], { headerText: HDR }),
], { title: 'M.A.I. Consulting AI Fluency Curriculum: outlines for approval', description: 'Phase 1 curriculum outlines, seven levels, 4D framework' });

save(doc, OUT);
