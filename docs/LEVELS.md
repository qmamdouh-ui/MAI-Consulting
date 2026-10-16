# The seven capability levels (canonical spec, 16 October 2026)

This file is the single source of truth for the levels. `services/training/`, `transformation-journey/`, `use-cases/` and its level sub-pages, the estimator, `assets/chat.js` and the Knowledge hub all follow it. Change it here first.

## Who the levels are for

People who use AI at work or in study and are tired of guessing: NGO and international-organisation staff, employees of small and mid-size organisations, public-sector staff, students and recent graduates, and the representatives organisations send to a course. Most of them have opened free courses, watched videos and read vendor pages, and still cannot say what they personally should learn next, in which order, and what they can safely skip.

The promise of the levels: **the minimum sufficient background for your own work, in order, with nothing you do not need.** The research is done for you. Each level names what you must understand, what you can ignore at that level, the tools, the risks that enter at that level, and the proof that you have reached it. A free page per level on this site shows the method, a cheat sheet and prompt examples, so you can see exactly what the course covers before you book.

The levels are per person, set per group in a team engagement. A fundraising team at level 2 and a leadership team at level 4 are trained separately.

## The ladder

| Level | Name | One line | Delivery days to reach (from the level below) | Planning assumption, time saved on the tasks in scope |
|---|---|---|---|---|
| 1 | Not started | Has not used an assistant for work. | starting point | — |
| 2 | Occasional | Asks for a summary, a search or a first draft, without a method. Results vary by person and by day. | starting point | — |
| 3 | Structured | Writes a full brief, grounds it in the real document, verifies before anything leaves the team. **The floor.** | 3 | 20–30% |
| 4 | Set up | Loads context once (Projects, custom instructions, Skills), so nothing is briefed twice and quality stops depending on who asked. | 2 more (5 total from 2) | 30–40% |
| 5 | Delegating | Hands whole multi-step jobs to agents, supervises rather than types, runs workstreams in parallel. | 1.5 more (6.5 total) | 40–50% on delegated workstreams |
| 6 | Building | Builds Skills, agents and connections for colleagues; reviews their output; owns the operating guide. | 1.5 more (8 total) | team-level; not a personal percentage |
| 7 | At the terminal | Runs agentic work on folders of files from the terminal (Claude Code), without writing code. | 2 more (10 total) | task-dependent; batch work can exceed any chat figure |

**The percentages.** Planning assumptions, not promises, and they apply to the tasks in scope, never to a whole job. Anchors: 40% less time on professional writing tasks at higher rated quality (Noy and Zhang, Science 2023); 25% faster and 12% more tasks on realistic consulting work (Dell'Acqua et al., HBS 2023); 14% more output across 5,179 support agents, 34% for the least experienced (Brynjolfsson et al., NBER 2023). Level 3 sits at the lower edge of those studies because verification is added to the work. Levels 4 and 5 are extrapolations: no published field experiment has yet measured persistent set-ups or delegated agents at this scale, so they are planning figures that each engagement replaces with its own before-and-after timing at ninety days. Levels 6 and 7 pay off through other people and through volume, so no personal percentage is honest.

**Why the days are not linear.** Level 3 is the longest step because it carries all the background (what a model is, the brief, the checks, the data rules). Every later level assumes it and adds one capability.

## What each level must understand, from 3 upward

Each level lists: **Understand** (the background, kept to the minimum sufficient), **Do** (the skills), **Tools**, **Risks that enter here**, **Skip for now** (what the free content pushes at you that you do not need yet), **Proof** (how we know you are there).

### Level 3 · Structured

- **Understand**
  - What a large language model (LLM) is: a system that predicts text from patterns, trained on data up to a cut-off date. It has no memory between conversations unless a feature adds it, no access to your files unless you give them, and it can state false things fluently.
  - Context window: everything you paste or upload plus the conversation is the model's working memory for that chat. Long chats degrade; start fresh for a new task.
  - Model tiers (fast and cheap versus slow and strong) and why the choice matters for cost and quality. Web search versus the model's own knowledge.
  - The four competencies (Delegation, Description, Discernment, Diligence) as a working vocabulary.
  - Your organisation's data rules: what may never go into a prompt (beneficiary, personal, confidential data), and what the tool does with your inputs under the plan you are on.
- **Do**
  - Write a full brief: role, audience, purpose, constraints, format, sources, what good looks like.
  - Ground the request in the real document: upload or paste the source rather than describing it.
  - Iterate: ask for options, critique, a second pass with a specific change.
  - Run the four checks before anything leaves the team: figures, facts, language, defensibility.
  - Keep a one-line log of what was AI-assisted, where disclosure is required.
- **Tools**: a chat assistant (Claude, ChatGPT, Copilot, Gemini) with file upload; the organisation's approved tool list.
- **Risks that enter here**: hallucinated figures and citations; pasting data that must not leave the building; over-trusting a confident tone; using the free tier where inputs may be used for training.
- **Skip for now**: prompt-engineering "frameworks" with acronyms, API keys, agents, automation, model benchmarks, fine-tuning.
- **Proof**: three real tasks from your own work, briefed, grounded, checked and delivered, with the checks recorded.

### Level 4 · Set up

- **Understand**
  - Context engineering: quality depends on what the model has in front of it, not on clever wording. Persistent set-ups put the right material there every time.
  - Projects (a workspace with standing files and instructions), custom instructions (standing rules about you and your output), Skills (a reusable method the assistant follows for a type of task), memory (what the assistant keeps across chats and how to control it).
  - Connectors, read-only: letting the assistant read a Drive, SharePoint or mailbox, and what that exposes.
  - Templates and house style as files, not as things re-explained.
- **Do**
  - Build a Project for one recurring workstream with its reference documents and instructions.
  - Write custom instructions that encode your audience, tone and format once.
  - Build or adopt one Skill for a task your team repeats weekly (a report format, a review checklist, a translation review).
  - Share set-ups with colleagues and keep a version.
- **Tools**: Claude Projects and Skills, Copilot Notebooks and agents, Gemini Gems, custom instructions in any assistant; one read-only connector.
- **Risks that enter here**: a Project that contains data the whole team should not see; stale reference files; instructions that silently bias every output; connectors that read more than intended.
- **Skip for now**: building agents, MCP, automation platforms, the terminal.
- **Proof**: one Project and one Skill that a colleague can use without you, producing the same quality on the same task.

### Level 5 · Delegating

- **Understand**
  - Agentic AI: an agent plans, acts with tools (search, files, browser, code), checks and repeats until the job is done, instead of answering one message. What this gains (whole jobs, parallel work) and what it costs (less visibility, more verification, real actions in real systems).
  - Deep research and long-running tasks: when to use them and how to brief them.
  - Computer and browser agents (Claude in Chrome, Copilot actions, Cowork-style tools): they operate inside a logged-in session, so they can do whatever you can do there.
  - MCP (Model Context Protocol) at the user level: the standard plug that connects an assistant to a tool or data source. What a connection can read, what it can write, and who approved it.
  - Blast radius: before delegating, know what the agent can reach and what the worst wrong action would be.
- **Do**
  - Brief a whole job (not a step): inputs, outputs, stopping rules, what to ask about and what never to do.
  - Run two or three workstreams in parallel and supervise them.
  - Build a small test set (five known cases) and check agent output against it before trusting it.
  - Set permissions deliberately: read-only where possible, write only where reviewed.
- **Tools**: Claude agents and research mode, Claude in Chrome, Copilot agents, Gemini deep research, one or two MCP connections approved by the organisation.
- **Risks that enter here**: prompt injection (a document or web page instructs the agent); an agent acting in a live system (sending, deleting, paying); runaway cost; delegating judgement that must stay human.
- **Skip for now**: building your own MCP server, the terminal, orchestration frameworks.
- **Proof**: one multi-step job delegated end to end, with a test set, a permissions note and a verified result.

### Level 6 · Building

- **Understand**
  - How to design a Skill or an agent for someone else: inputs, method, outputs, refusal cases, the operating guide, the named owner.
  - MCP and connectors at the organisation level: which servers exist, what each exposes, write access and approval, logging.
  - Evaluation: rubrics, test sets, spot checks, and reviewing colleagues' AI-assisted output.
  - Prompt injection and data exfiltration in depth; the policy clauses that apply.
  - Choosing models and vendors: cost per completed task, data terms, exit plan.
- **Do**
  - Build and document three Skills or agents the department relies on, each with a test set and an owner.
  - Connect approved sources (with write access where justified) and record the permissions.
  - Review others' output against a rubric and feed corrections back into the set-ups.
  - Run the six-month review of the department's playbook.
- **Tools**: shared Skills, team workspaces (Claude for Team or Enterprise, Copilot Studio), MCP connections, an evaluation sheet.
- **Risks that enter here**: a set-up everyone depends on with nobody owning it; a connector with write access nobody reviewed; a champion who leaves with the method.
- **Skip for now**: coding, custom software, model training.
- **Proof**: the department's set-ups survive a week without you, and the operating guide is enough for a new colleague.

### Level 7 · At the terminal

- **Understand**
  - What a terminal is and why it matters: it works on folders and files, not on one conversation, so it can do the same thing to a hundred documents.
  - Claude Code basics without code: the working folder, a `CLAUDE.md` with standing instructions, Skills, slash commands, hooks that stop dangerous actions, MCP servers added to the terminal, permission modes.
  - Files and folders as the unit of work; versioning (a simple git routine) so nothing is lost; scheduled runs.
  - What is still engineering and should go to an engineer: anything with a database, a public interface, credentials of other people, or an integration that can fail silently.
- **Do**
  - Batch work: rename, restructure, classify or review hundreds of files in one run.
  - Run the same review across a year of reports and get one consolidated result.
  - Build one repeatable pipeline (for example: monthly donor report from a folder of inputs) with a dry run and a log.
  - Keep secrets out of files; use hooks and permission modes to limit what the agent can touch.
- **Tools**: Claude Code (or equivalent), a terminal, git, a scheduled task, MCP servers.
- **Risks that enter here**: an agent that deletes or overwrites; credentials in files; a pipeline nobody else can run; work that should have been software.
- **Skip for now**: learning a programming language. It is not needed for this level, and it is a different course.
- **Proof**: one pipeline that runs on real files, with a dry run, a log and a second person who has run it.

## Course for individuals and representatives

Three delivery days reach level 3 from 1 or 2. Higher levels add the days in the ladder. Online or in person; in person adds venue, hotel and hospitality at cost. Price is per delivery day (see `docs/SITE_OPERATIONS.md` §4).
