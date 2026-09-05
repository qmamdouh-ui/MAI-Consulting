# Claude for Business. M.A.I. Consulting

*Source: `Save Claude Tokens.htm`*

M.A.I. Consulting

Use Cases Skills / CLAUDE.md Claude Code Save Credits Get in Touch

Claude for Business

## Put Claude to Work

Across Your Organization

From custom AI workflows to structured CLAUDE.md files, skills, and token-efficient prompting, practical guidance for getting real value out of Claude without burning through credits.

Explore Use Cases Save on Tokens →

Core Applications

### What Claude Actually Does Well

Claude's most reliable value isn't chat, it's structured, repeatable work embedded into real business workflows. These are the use cases where it consistently outperforms alternatives.

📄

#### Document Analysis & Extraction

Feed Claude contracts, reports, SOPs, or RFPs and extract structured data, summarize key clauses, flag anomalies, or produce comparison tables. Works best when you define the output schema explicitly.

High ROI

✍️

#### Long-Form Drafting

Strategy memos, grant proposals, board decks, client reports. Claude handles first drafts and iterative rewrites well. The 200K context window means it can hold an entire document in scope while editing.

Daily Use

🔁

#### Multi-Step Research Workflows

Web search + synthesis + citation in a single pass. Claude can search, read multiple sources, and compile an evidence-based summary without needing a human to relay content between steps.

Agentic

💻

#### Code Generation & Review

Generate, explain, refactor, or debug code in Python, JavaScript, SQL, and most common languages. Most effective when given explicit requirements, existing code context, and the environment constraints upfront.

Engineering

📊

#### Data Interpretation

Upload CSVs, Excel files, or describe datasets and Claude can write analysis code, interpret statistical outputs, spot trends, and produce narratives. Combine with code execution for in-context calculations.

Analytics

🤖

#### Custom Assistants & Tools

Build purpose-built tools using the API, internal knowledge bots, client intake processors, automated report generators, using CLAUDE.md and skill files to control behavior precisely.

Custom Build

Structure & Control

### Skills & CLAUDE.md Files

Two mechanisms that let you encode persistent instructions, domain knowledge, and behavioral rules directly into Claude's working context, without restating them every session.

#### What is CLAUDE.md?

CLAUDE.md is a Markdown file Claude reads at the start of every session within a project or directory. It acts as standing instructions, your organization's style guide, terminology, prohibited behaviors, output formats, and domain context, all loaded automatically.

In Claude Code, CLAUDE.md files are hierarchical: a root-level file sets global defaults, while subdirectory files add context for specific modules or workstreams. This means a legal team and an engineering team can operate with different rules without manual switching.

Practical tip: Put your most-used constraints in CLAUDE.md rather than in every prompt. Anything you repeat more than 3 times per week, response format, tone, citation rules, domain vocabulary, belongs there.

#### CLAUDE.md Structure

# CLAUDE.md. Project: Consulting Engagements ## Role You are a strategy analyst at M.A.I. Consulting. Responses must be professional, evidence-based, and free of hedging language. ## Output Rules - Use Markdown tables for comparisons - Keep section headings concise - Never add preamble before answers - Cite sources inline as [Source, Year] ## Domain Context Client industry: Public sector + NGOs Primary frameworks: Logic models, ToC, SWOT Internal acronyms: ToR = Terms of Reference ## Prohibited - Do not invent data - Do not recommend tools without evidence - Do not use the word "leverage"

#### Skills (Slash Commands)

Skills are modular instruction files, typically Markdown, stored in a /skills/ directory and referenced by Claude when a specific task type is triggered. Think of them as specialized agents within a project: one skill for writing reports, another for code review, another for client intake processing.

📋

#### SKILL.md Anatomy

Each skill file has a name, a description (used to trigger it automatically), and a body with exact instructions. The description is critical, it's what determines when Claude picks up the skill.

📁

#### File Organization

Store skills under /skills/public/ for shared use and /skills/user/ for user-specific overrides. Claude reads both and the user-level file wins on conflict.

🔗

#### Reference Files

Skills can reference sub-documents (branding guides, templates, code snippets) stored alongside them. This keeps the main SKILL.md short and readable while offloading detail into targeted references Claude reads when needed.

⚡

#### Slash Commands

In Claude.ai Projects, you can invoke a skill manually with a slash command. This gives teams a shared palette of pre-configured workflows accessible without remembering any syntax.

Developer Tools

### Claude Code

Claude Code is a command-line agentic coding tool, not a chat interface, not a copilot plugin. It operates autonomously on your local filesystem, runs commands, reads and writes files, and executes multi-step tasks with minimal hand-holding.

#### What it actually does

1

##### Reads your codebase

Claude Code maps your project structure, reads relevant files, and builds context before touching anything. It doesn't require you to paste code into a chat window.

2

##### Executes terminal commands

It can run tests, install packages, call build tools, and interpret the output, then adjust its approach based on what failed or succeeded.

3

##### Handles multi-file changes

A single instruction like "refactor this module to use async/await throughout" results in coordinated edits across multiple files, with Claude tracking dependencies.

4

##### Responds to CLAUDE.md

Drop a CLAUDE.md in any directory and Claude Code reads it automatically. Nested files let you set different rules per subsystem without modifying the main config.

#### Practical applications

#### Codebase onboarding

Ask Claude Code to explain an unfamiliar repository, it reads the structure, key files, and build config and produces a summary more useful than most READMEs.

#### Automated testing

Generate unit and integration tests for existing code, run them, interpret failures, and iterate until they pass, without copying anything into a browser.

#### Migration tasks

API version upgrades, framework migrations, dependency updates, tasks that are mechanical but tedious. Claude Code handles the bulk edits while you review diffs.

#### MCP server integration

Claude Code supports MCP (Model Context Protocol), allowing it to connect to external tools, databases, APIs, file systems, and act on them directly within a session.

Cost note: Claude Code is token-intensive by design. Each agentic step reads files and generates intermediate reasoning. Use /compact mode and targeted file scope to control spend on large repos.

Cost Efficiency

### How to Save Credits & Tokens

Token spend is the primary cost lever when using Claude at scale. Most waste comes from three sources: oversized contexts, repetitive system prompts, and unnecessarily long outputs. Each is fixable.

~75%

of token cost is often from input, not output

200K

token context window, most use less than 10%

3×

typical cost difference between Sonnet and Opus

60%

token reduction possible via prompt caching on repeated system prompts

🗂️

#### Prompt Caching

If you send a long system prompt or large document repeatedly (e.g., a knowledge base), use Anthropic's prompt caching API feature. Cached tokens cost 90% less per re-use. Cache invalidates after 5 minutes of inactivity by default.

API Only High Impact

🎯

#### Model Selection

Don't use Opus for every task. Claude Haiku handles classification, simple extraction, and short Q&A at a fraction of the cost. Sonnet covers most complex workflows. Opus is justified for nuanced reasoning and long-form drafting where quality genuinely matters.

API + UI Structural

✂️

#### Context Trimming

Conversation history grows with every turn. In long sessions, early exchanges often add noise rather than signal. Periodically summarize the conversation state and restart with a condensed context rather than sending the full thread each time.

Workflow

📌

#### Targeted System Prompts

Bloated system prompts, ones that try to cover every possible scenario, inflate input tokens on every call. Keep system prompts focused on the specific task. Put rarely-needed instructions in user messages or skill files loaded on demand.

Prompt Design

📉

#### Output Length Control

Claude defaults to verbose responses unless told otherwise. Explicit instructions like "respond in under 150 words", "use a single sentence", or "no explanation, just the JSON" can cut output tokens by 50–70% on extraction and classification tasks.

Prompt Design Easy Win

🔌

#### Batch API

For high-volume, non-real-time tasks (classification runs, document processing pipelines), Anthropic's Batch API processes requests asynchronously at a 50% discount versus synchronous calls. Results return within 24 hours.

API Only 50% Discount

#### Token Reduction Cheat Sheet

── Input Token Reduction ────────────────────────────────── Prompt caching → Cache static system prompts / documents 90% cost reduction on cache hits Trim conversation → Summarize history every ~10 turns Prevents context from compounding Scope your context → Only include files/data Claude needs In Claude Code: use --include flags ── Output Token Reduction ──────────────────────────────── Max tokens param → Set max_tokens to what you actually need Format constraints → "Return only JSON, no explanation" Explicit length → "Answer in one paragraph" ── Model Selection ─────────────────────────────────────── Haiku → Classification, extraction, simple Q&A Sonnet → Analysis, coding, multi-step workflows Opus → Complex reasoning, long-form, high stakes

Work With Us

### Ready to Build Something Practical?

We help organizations design Claude workflows, build CLAUDE.md systems, and deploy token-efficient AI pipelines that integrate into existing operations.

Visit mai4consulting.com Back to Top ↑

M.A.I. Consulting

Strategy · AI · Impact

mai4consulting.com

© 2025 M.A.I. Consulting. All rights reserved.
