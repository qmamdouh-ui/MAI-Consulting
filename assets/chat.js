/* M.A.I. Consulting — site assistant
   Retrieval-only. Every answer below is taken from copy that exists on this website.
   No language model is called, so the assistant cannot invent an answer: if a question
   does not match the knowledge base with enough confidence it says so and offers to send
   the question to the team. To teach it a new answer, add an entry to KB. */
(function(){
"use strict";

/* ──────────────────────────── knowledge base ────────────────────────────
   id · k = weighted keywords (phrase:weight) · q = example questions · a = answer · l = link · t = link label */
var KB = [
 /* services */
 {id:"services",k:{"services":4,"your service":4,"what services":6,"what do you offer":6,"what do you do":5,"how can you help":5,"offer":1,"what do you do":6,"what you do":5,"what do you sell":6},
  q:["what services do you offer","what do you do","how can you help"],
  a:"Four AI services, sold singly or in packages: AI Readiness Assessment (2–3 weeks), AI Use Policy (3–4 weeks), Team AI Training (2–6 weeks) and Fluency Support (3–12 months). Every engagement is fixed-price and fixed-scope, agreed before we start.",
  l:"services/",t:"See services and prices"},
 {id:"assessment-svc",k:{"readiness assessment":4,"assessment":3,"where do we stand":3,"score":2,"diagnos":2,"baseline":2,"ten dimensions":3},
  q:["what is the readiness assessment","what does the assessment cover"],
  a:"The AI Readiness Assessment is a scored report across ten dimensions — fluency, governance, data protection, workforce impact, internal politics, psychological safety, future-readiness — with a ranked 90-day priority list, mapped to ISO/IEC 42001, the NIST AI Risk Management Framework and EU AI Act Article 4. It takes 2–3 weeks and is priced from CHF 6,900 (nonprofit rate).",
  l:"services/",t:"Read about the assessment"},
 {id:"policy-svc",k:{"ai policy":6,"use policy":6,"ai use policy":7,"policy service":5,"write a policy":6,"write our policy":6,"governance":3,"allowed to do":5,"permitted":4,"red lines":4,"prohibit":3,"acceptable use":5,"what are our people allowed":6,"ai policies":6,"write ai":6,"write policies":6,"policies":4,"draft a policy":6,"policy for us":6},
  q:["what is the ai use policy","what are our people allowed to do","do you write ai policies"],
  a:"The AI Use Policy is a board-ready policy that starts with permissions, not prohibitions: permitted uses by role, the red lines, a data classification table, disclosure rules for funders and beneficiaries, an escalation path and an approved tool list. Written so that required work stays compliant. 3–4 weeks, from CHF 8,400 (nonprofit rate).",
  l:"services/",t:"Read about the policy service"},
 {id:"training-svc",k:{"training":4,"train":3,"workshop":2,"session":2,"lab":2,"department":3,"team training":4,"course":2,"learn":1},
  q:["what does the training look like","how is training delivered","do you train departments"],
  a:"Team AI Training is one organisation-wide session on the shared ground rules, then a 90-minute lab per department built on that department's real tasks and real documents. Each lab ends with that team's one-page cheatsheet. 2–6 weeks, from CHF 12,000 for the organisation-wide session plus four department labs (nonprofit rate).",
  l:"services/",t:"Read about training"},
 {id:"support-svc",k:{"support":3,"retainer":3,"fluency support":4,"office hours":3,"decay":2,"ongoing":2,"monthly":2,"keep":1,"after":1},
  q:["what is fluency support","what happens after the engagement","do you offer ongoing support"],
  a:"Fluency Support is monthly office hours for whoever is stuck, cheatsheet updates as the tools change, coaching for your internal champions, and a re-score at six months so you can show the board what moved. 3–12 months, from CHF 1,400 per month with a three-month minimum.",
  l:"services/",t:"Read about support"},
 {id:"cheatsheet",k:{"cheatsheet":5,"cheat sheet":5,"one page":3,"page":2,"deliverable":3,"receive":2,"get":1,"sample":3,"actually receive":6,"we receive":5,"what do we get":6,"what do i get":6,"end up with":5,"take away":4},
  q:["what is the cheatsheet","what does a team actually receive","can i see a sample"],
  a:"Each department receives one page built from its own tasks: five things to hand to AI and three never to, three prompt patterns that work on their files, the four checks before anything leaves the building, and what has to be logged and disclosed. A full sample for a fundraising team is on the site.",
  l:"cheatsheet/",t:"Open the sample cheatsheet"},

 /* packages and prices */
 {id:"packages",k:{"package":4,"packages":4,"bundle":2,"foundation":3,"adoption":3,"institution":3,"option":1},
  q:["what packages do you have","tell me about the packages","which package should i choose"],
  a:"Three packages. Foundation (up to 50 staff, about 3 weeks, from CHF 3,900): short assessment, one organisation-wide session, one shared cheatsheet. Adoption (50–500 staff, about 8 weeks, from CHF 19,500): full assessment, AI Use Policy, organisation-wide session, four department labs and cheatsheets, re-score at 90 days. Institution (regulated, audited or multi-site, about 12 weeks then 12 months, from CHF 39,000 plus support): everything in Adoption plus a governance gap plan, an EU AI Act Article 4 evidence file, train-the-trainer and twelve months of support.",
  l:"services/",t:"Compare the packages"},
 {id:"price",k:{"price":5,"prices":5,"cost":5,"costs":5,"how much":6,"fee":4,"fees":4,"pricing":5,"chf":4,"expensive":6,"cheap":5,"budget":3,"afford":5,"rates":3},
  q:["how much does it cost","what are your prices","what is the pricing"],
  a:"Prices are published. Packages start at CHF 3,900 (Foundation), CHF 19,500 (Adoption) and CHF 39,000 (Institution). Individual services from CHF 6,900 (assessment), CHF 8,400 (policy), CHF 12,000 (training) and CHF 1,400 per month (support). These are nonprofit rates; rates for private-sector and international organisations differ. Prices exclude VAT and travel.",
  l:"services/",t:"See all prices"},
 {id:"terms",k:{"payment":5,"payment terms":7,"how do we pay":6,"invoice":3,"deposit":4,"charge vat":5,"include vat":5,"plus vat":5,"scope change":5,"fixed price":5,"fixed scope":5,"contract terms":4},
  q:["what are the payment terms","do you charge vat","what if the scope changes"],
  a:"Every engagement is fixed-price and fixed-scope, agreed before we start. Payment is 40% on signature and 60% on delivery; support retainers are billed monthly in advance. Prices exclude VAT and travel. Scope changes of more than 20% are re-quoted rather than absorbed quietly.",
  l:"services/",t:"See the terms on the services page"},
 {id:"duration",k:{"how long":5,"duration":4,"weeks":3,"timeline":4,"take":2,"time":2,"when":1,"start":2},
  q:["how long does it take","what is the timeline","how quickly can we start"],
  a:"Most engagements run three to eight weeks: the assessment 2–3 weeks, the policy 3–4 weeks, training 2–6 weeks. Foundation is about 3 weeks, Adoption about 8, Institution about 12 weeks followed by 12 months of support. Support retainers run 3–12 months.",
  l:"services/",t:"See durations by service"},

 /* who it is for */
 {id:"who-for",k:{"who is this for":5,"for whom":3,"right for":3,"suitable":3,"fit":2,"size":3,"staff":2,"small":2,"ngo":3,"nonprofit":3,"un":2,"agency":2,"government":3,"public":2,"sector":2,"clients":3,"work with":3,"do you work with":6,"work with":4,"small ngo":6,"small ngos":6,"ngos":4,"un agency":6,"un agencies":6,"international organisation":5,"international organization":5,"foundations":3,"public institution":5,"help a":3,"help an":3},
  q:["who is this for","do you work with small ngos","do you work with un agencies","who are your clients"],
  a:"Mission-driven and international organisations of 20 to 500 staff — NGOs, foundations, UN agencies and public institutions — with no in-house AI function and with beneficiary, donor or personal data in their daily work. We talk first to the executive director or the data protection officer. Under 20 staff, a free course will usually serve you better and we will say so. Private-sector work is taken on referral only.",
  l:"our-clients/",t:"See who we work with"},
 {id:"private",k:{"private sector":4,"company":3,"business":2,"corporate":3,"enterprise":2,"commercial":2},
  q:["do you work with private companies","do you serve the private sector"],
  a:"Private-sector work is taken on referral only. It is not what this practice is built around; the offer is designed for mission-driven and international organisations.",
  l:"our-clients/",t:"See who we work with"},
 {id:"funders",k:{"funder":7,"funders":7,"work with funders":9,"work with foundations":8,"work with donors":8,"foundation":3,"donor":4,"donors":4,"grantee":5,"grantees":5,"portfolio":5,"philanthrop":3,"development agency":3,"cohort":3},
  q:["do you work with funders","what do you offer foundations","can a donor fund this for grantees"],
  a:"Yes — foundations, donors and development agencies can fund this across a portfolio. Portfolio Baseline (up to 15 grantees, about 4 weeks, from CHF 12,000) runs the assessment across the cohort and gives you one portfolio report. Portfolio Programme (up to 12 grantees, about 16 weeks, from CHF 52,000) adds a shared policy each grantee adapts, cohort training, a cheatsheet per organisation and a re-score. A Grantee Drawdown Fund (from CHF 30,000, 15% below list) lets grantees draw down engagements over 12 months.",
  l:"for-funders/",t:"See portfolio programmes"},
 {id:"not-for",k:{"build ai":6,"build an ai":6,"ai system":6,"ai systems":6,"fine-tun":6,"fine tun":6,"deploy":4,"deployment":5,"data pipeline":6,"implement ai":5,"integrate ai":5,"train a model":6,"custom model":6,"llm":4},
  q:["do you build ai systems","can you fine-tune a model","do you do implementation"],
  a:"No. We build no AI systems — no model fine-tuning, no data pipelines, no custom deployment. The four services are all about the people who use AI, not the infrastructure that runs it. We also cannot staff thirty trainers across four countries next month; this is a boutique practice with finite capacity.",
  l:"about/",t:"What the practice is and is not"},

 /* method */
 {id:"4d",k:{"4d":5,"four d":4,"framework":4,"delegation":4,"description":3,"discernment":4,"diligence":4,"method":3,"methodology":3,"approach":2,"anthropic":2,"methodology":5,"method":4,"how do you approach":5},
  q:["what framework do you use","what is the 4d framework","what is your methodology"],
  a:"Everything runs on four words: Delegation (what to hand to AI, what to keep human), Description (how to ask, with your context in the request), Discernment (how to check an output before relying on it) and Diligence (what to log, disclose and own). This is the AI Fluency framework published by Anthropic with Rick Dakan and Joseph Feller. It is public, so you can audit the method. The same four are the axes of your score, the sections of every cheatsheet, the clause groups of your policy and the modules of every session.",
  l:"about/",t:"Read about the method"},
 {id:"standards",k:{"iso":4,"42001":5,"nist":4,"rmf":3,"standard":4,"standards":4,"gdpr":3,"oecd":3,"unesco":3,"compliance":2,"mapped":2,"certif":1},
  q:["which standards do you follow","are you aligned with iso 42001","what about nist"],
  a:"The work is mapped to ISO/IEC 42001:2023, the NIST AI Risk Management Framework 1.0, the EU AI Act (Regulation (EU) 2024/1689), GDPR, the OECD AI Principles and the UNESCO Recommendation on the Ethics of AI. The Institution package includes a governance gap plan against ISO/IEC 42001 and the NIST AI RMF.",
  l:"about/",t:"See the standards"},
 {id:"article4",k:{"article 4":6,"art 4":5,"ai act":5,"eu ai act":6,"literacy":3,"obligation":3,"regulation":3,"legal":2,"law":2,"comply":2,"required":2,"mandatory":3},
  q:["what is article 4","are we obliged to train staff under the eu ai act","is ai literacy mandatory"],
  a:"Since 2 February 2025, Article 4 of the EU AI Act has required organisations deploying AI to ensure that staff — and contractors acting on their behalf — have AI literacy proportionate to their role, context and risk. It is outcome-based: you have to be able to demonstrate it. Department-specific training, a documented policy and an attendance record are what that demonstration looks like. The site carries a briefing on what a 60-person organisation actually has to do.",
  l:"eu-ai-act-article-4/",t:"Read the Article 4 briefing"},
 {id:"how-runs",k:{"process":4,"how does it work":5,"steps":4,"engagement":3,"how do you work":5,"discovery":3,"handover":3,"what happens":3,"after we sign":7,"once we sign":7,"what happens":4,"next steps":5,"onboarding":5,"kick off":5,"kick-off":5},
  q:["how does an engagement run","what is your process","what happens after we sign"],
  a:"Four steps. A 30-minute discovery call: what is already happening with AI in your organisation and which service you actually need, including none. Baseline: the assessment, plus interviews where the package includes them. Delivery: policy drafted with your people, sessions built on your teams' real tasks. Handover: a re-score, the evidence file and the cheatsheets in your hands. Engagements close with a capability you own, not a dependency.",
  l:"our-clients/",t:"See how engagements run"},
 {id:"evidence",k:{"evidence":4,"audit":3,"auditor":3,"regulator":3,"prove":3,"demonstrate":3,"file":2,"record":2,"attendance":3,"due diligence":4},
  q:["what evidence do we get","can we show this to an auditor","what do we have at the end"],
  a:"You leave with a scored baseline, your own approved policy, one page per department, a tool inventory, an attendance record and two scores (before and at 90 days). Together they form the file a donor, an auditor or a regulator asks to see.",
  l:"services/",t:"See what each package leaves behind"},

 /* tools */
 {id:"free-assessment",k:{"free assessment":6,"free":3,"quiz":2,"test":2,"twelve minutes":3,"12 minutes":3,"28 questions":4,"try":2,"self":2},
  q:["is there a free assessment","how long does the free assessment take","can i try something first"],
  a:"Yes. The free AI Readiness Assessment is twenty-eight questions across the four competencies of AI fluency and takes about twelve minutes. You get a score, a breakdown by dimension and a ranked list of what to fix first, and you keep the report whether or not you ever speak to us.",
  l:"explore-your-ai-readiness/",t:"Take the free assessment"},
 {id:"extended-assessment",k:{"extended":5,"extensive":4,"60 questions":5,"sixty":3,"ten dimension":4,"10 dimension":4,"full assessment":3},
  q:["what is the extended assessment","what is the difference between the two assessments"],
  a:"The extended assessment is sixty questions across ten dimensions — fluency, governance, data protection and ethics, workforce impact, operations and politics, psychological safety and future-readiness — mapped to ISO/IEC 42001, the NIST AI RMF, the EU AI Act, GDPR, OECD and UNESCO instruments. It is the instrument behind the paid AI Readiness Assessment. The free version is the shorter, 28-question one.",
  l:"extensive-ai-readiness-analysis/",t:"Open the extended assessment"},

 /* the practice */
 {id:"about",k:{"about":3,"who are you":5,"practice":3,"boutique":3,"company":2,"firm":3,"team":2,"how big":3,"founded":3,"history":2,"background":2},
  q:["who are you","tell me about the practice","how big is your team"],
  a:"M.A.I. Consulting is a boutique practice founded in 2023 and based in Geneva. It is not a large firm — there is no bench and no 24-hour turnaround, and capacity is finite. It sells no software and takes no partner commissions. The practice is certified across the AI fluency, responsible-AI and applied-tooling curricula of Anthropic and of the United Nations College with Microsoft, including the qualifications for teaching AI fluency, and is a member of the Anthropic Claude Partner Network.",
  l:"about/",t:"About the practice"},
 {id:"location",k:{"where are you":6,"located":5,"location":4,"based in":5,"you based":5,"switzerland":4,"your office":4,"remote":5,"remotely":5,"on-site":5,"onsite":5,"on site":5,"come to us":4,"travel to":4},
  q:["where are you based","do you work remotely","can you come on-site"],
  a:"Based in Geneva, Switzerland, and delivered anywhere — remote or on-site. Travel outside Geneva is billed at cost.",
  l:"about/",t:"How engagements run"},
 {id:"languages",k:{"language":5,"languages":5,"arabic":6,"french":6,"english":4,"multilingual":4,"translate":2},
  q:["which languages do you work in","do you deliver in arabic","can you train in french"],
  a:"Sessions and materials in English, French or Arabic. Arabic material is written natively, not translated.",
  l:"about/",t:"See delivery details"},
 {id:"independent",k:{"vendor":5,"independent":5,"neutral":4,"which tool":5,"which ai tool":6,"recommend a tool":5,"sell software":7,"selling software":7,"licence":4,"license":4,"resell":5,"commission":4,"partner of":4,"affiliated":4},
  q:["are you vendor independent","which ai tool do you recommend","do you sell software"],
  a:"We sell no licences and take no partner commissions. If the free tier of a tool is enough for your team, we will tell you so. Tool choices come out of your own policy — the approved tool list is written for your data and your work, not for a vendor.",
  l:"about/",t:"What the practice is and is not"},
 {id:"clients",k:{"reference":4,"references":4,"testimonial":4,"case study":4,"previous clients":4,"worked with":3,"track record":3,"experience":2,"ai for good":5,"blackbird":5,"worked with":6,"clients":5,"who have you":5,"past clients":6,"customers":4},
  q:["who have you worked with","do you have references","can you share a case study"],
  a:"Clients include the AI for Good Foundation and BlackBird Training Center; their words are on the Who We Work With page. The practice is young and the client list is short — we say so openly. What you can inspect before committing is the instrument, the framework, the sample cheatsheet and the published prices. Disclosure: the practice's principal also holds a role at the AI for Good Foundation.",
  l:"our-clients/",t:"See client voices"},

 /* alternatives */
 {id:"compare",k:{"compare":5,"comparison":5,"competitor":5,"competitors":5,"alternative":4,"alternatives":4,"versus":3,"vs":3,"instead":2,"other providers":4,"market":3},
  q:["how do you compare to alternatives","who are your competitors","why you and not someone else"],
  a:"Every alternative a mission-driven organisation would consider is on the Compare page with its published price and a linked source — free cohorts, course platforms, certifications, governance consultancies, global firms, and the two most common options of all: doing nothing and doing it in-house. It also lists where we lose.",
  l:"compare/",t:"Compare the market"},
 {id:"free-options",k:{"free course":5,"free programme":5,"free program":5,"nethope":4,"nten":4,"coursera":3,"linkedin learning":4,"why pay":5,"cheaper":3,"subsidised":3},
  q:["why pay you when there are free options","is there a free programme we could use instead"],
  a:"You should use them. Free introductory courses on this framework exist, published by the people who wrote it, and subsidised cohort programmes exist for smaller nonprofits. If one of those is the right first step, we will say so on the call. Note that the best free programme is open to US-based nonprofits only and the main subsidised accelerator caps at under 100 staff. Come to us for the four things a course or cohort cannot do: write your policy, use your team's actual tasks, clear your own data rules, and produce the evidence a funder or regulator asks for.",
  l:"compare/",t:"See the comparison"},
 {id:"value",k:{"value":4,"roi":5,"return":3,"worth":4,"benefit":3,"why":2,"save":3,"saving":3,"productivity":3,"hours":3},
  q:["what is the return on investment","is it worth it","what value do we get"],
  a:"Four lines you can find in your own accounts: revenue at risk when a funder asks about AI governance and you have nothing to send; the per-seat arithmetic (a catalogue licence for 150 staff costs roughly two and a half times the Adoption engagement, every year, and leaves no artefacts); proposal and report hours as the measurable saving; and the beneficiary-data exposure you cannot price. We will not quote you an ROI percentage before seeing your documents — anyone who does is guessing.",
  l:"compare/",t:"Read the value case"},

 /* contact */
 {id:"contact",k:{"contact":5,"book":5,"call":4,"meeting":4,"talk":3,"speak":3,"appointment":4,"schedule":3,"reach":3,"email":3,"phone":2,"get in touch":5,"discovery call":4,"talk to":5,"speak to":5,"speak with":5,"talk with":5,"someone":3,"a human":5,"a person":4,"your email":5,"email address":5,"email you":5,"how do we start":6,"get started":5,"next step":4},
  q:["how do i book a call","how can i contact you","i want to talk to someone"],
  a:"Book a 30-minute call through the contact form; we reply within one business day. On the call we tell you which of the four services you need — or that you do not need us yet. You can also email q.mamdouh@mai4consulting.com. Office hours Monday to Friday, 9:00–18:00 CET.",
  l:"contact-us/",t:"Go to the contact form"},
 {id:"knowledge",k:{"article":4,"articles":4,"blog":4,"read":2,"resources":4,"knowledge":4,"linkedin":4,"publication":3,"writing":2},
  q:["do you have articles","where can i read more","do you publish on linkedin"],
  a:"Everything published is filed under the service it belongs to on the Knowledge page — the sample cheatsheet, the EU AI Act Article 4 briefing, the two assessments and references on the tools. Articles go on LinkedIn first and are mirrored there.",
  l:"knowledge/",t:"Open the Knowledge page"},
 {id:"privacy",k:{"privacy":5,"data protection":3,"personal data":4,"my data":4,"store":3,"gdpr":2,"cookies":3,"with my data":7,"my information":6,"data protection":4,"do with my":6,"personal information":5},
  q:["what do you do with my data","do you have a privacy policy"],
  a:"The privacy policy is on its own page. It covers what is collected through the site and the contact form, the legal basis under GDPR and Swiss law, retention, and your rights. This assistant stores nothing; a question you choose to send to the team goes by email and nowhere else.",
  l:"privacy/",t:"Read the privacy policy"},
 {id:"problem",k:{"problem":3,"pain":2,"why does this matter":4,"shadow ai":5,"staff using":4,"already using":4,"beneficiary data":4,"risk":3,"chatbot":2,"exposure":3},
  q:["why does this matter","what is the problem you solve","our staff already use ai"],
  a:"Programme, fundraising and operations staff are already drafting donor reports and proposals with consumer AI tools — weekly, often with beneficiary data in hand — and the organisation has no rules that permit it, no training built for their actual role, and no answer when a funder asks. We score where you stand, write a policy that permits, train each department on its own tasks, and leave the evidence file.",
  l:"services/",t:"See how it is solved"}
];

/* ──────────────────────────── matching ──────────────────────────── */
var SYN = {"cost":"price","costs":"price","pricing":"price","prices":"price","fee":"price","fees":"price","charge":"price",
  "courses":"course","workshops":"workshop","trainings":"training","sessions":"session",
  "donors":"donor","funders":"funder","grantees":"grantee","foundations":"foundation",
  "ngos":"ngo","charity":"ngo","charities":"ngo","nonprofits":"nonprofit","non-profit":"nonprofit","not-for-profit":"nonprofit",
  "organisation":"organization","organisations":"organization","organizations":"organization",
  "policies":"policy","governance":"policy",
  "cheatsheets":"cheatsheet","cheat-sheet":"cheatsheet",
  "languages":"language","arab":"arabic","francais":"french","français":"french",
  "located":"location","based":"location","where":"location",
  "book":"contact","booking":"contact","appointment":"contact","call":"contact","meeting":"contact",
  "packages":"package","bundles":"package",
  "competitor":"compare","competitors":"compare","alternatives":"alternative","comparison":"compare",
  "duration":"how long","timeline":"how long","weeks":"how long"};
var STOP = /^(the|a|an|and|or|of|to|in|on|for|is|are|do|does|you|your|we|our|i|it|this|that|with|can|could|would|will|be|me|my|us|about|any|some|what|which|how|there|have|has|had|please|tell|want|need|like|know|if|at|by|as|from|into)$/;
function norm(s){return s.toLowerCase().replace(/[’']/g,"'").replace(/[^a-z0-9%&' -]/g," ").replace(/\s+/g," ").trim();}
function stem(w){return w.replace(/(ings?|ed|es|s)$/,"");}
function tokens(s){return norm(s).split(" ").filter(function(w){return w && !STOP.test(w);}).map(function(w){return SYN[w]||w;});}
function score(entry,qtext,qtoks){
  var sc=0, nq=norm(qtext);
  for(var k in entry.k){ if(nq.indexOf(k)>-1){ sc+=entry.k[k]; } }
  var stq=qtoks.map(stem);
  entry.q.forEach(function(v){ tokens(v).map(stem).forEach(function(t){ if(stq.indexOf(t)>-1) sc+=0.6; }); });
  return sc;
}
var OFFTOPIC=/\b(seo|search engine|web ?site design|build (us|our|a) website|weather|ceo|founder|owner|salary|salaries|hiring|recruit|job|jobs|career|careers|vacanc|intern|cancel|cancellation|refund|guarantee|warranty|vat number|tax number|iban|bank account|company number|registration number|dubai|riyadh|cairo|london|paris|new york|spanish|german|italian|portuguese|chinese|russian|turkish|discount code|coupon|free trial|api|sdk|integration with|plugin|zapier|salesforce|hubspot|crm|accounting software|legal advice|lawyer|insurance)\b/i;
function answer(q){
  var qt=tokens(q);
  if(!norm(q)) return null;
  var ranked=KB.map(function(e){
    var nq=norm(q), specific=0, sc=0;
    for(var k in e.k){ if(nq.indexOf(k)>-1){ sc+=e.k[k]; if(e.k[k]>=4) specific=Math.max(specific,e.k[k]); } }
    var stq=qt.map(stem);
    e.q.forEach(function(v){ tokens(v).map(stem).forEach(function(t){ if(t.length>3 && stq.indexOf(t)>-1) sc+=0.5; }); });
    return {e:e,s:sc,specific:specific};
  }).sort(function(a,b){return b.s-a.s;});
  var best=ranked[0], second=ranked[1]?ranked[1].s:0;
  if(!best) return null;
  /* a clearly out-of-scope term with no strong specific match: refuse */
  if(OFFTOPIC.test(q) && best.specific<6) return null;
  /* must have at least one specific keyword hit, clear the bar, and beat the runner-up */
  if(best.specific<4) return null;
  if(best.s<5) return null;
  if(best.s - second < 1.5 && best.specific<6) return null;
  return best.e;
}
var GREET=/^(hi|hello|hey|good (morning|afternoon|evening)|salut|bonjour|marhaba|مرحبا)\b/i;
var THANKS=/\b(thanks|thank you|merci|shukran|شكرا)\b/i;

/* ──────────────────────────── UI ──────────────────────────── */
var P = (function(){ var s=document.querySelector('script[src*="assets/chat.js"]'); if(!s) return ""; var m=s.getAttribute("src").match(/^(.*?)assets\/chat\.js/); return m?m[1]:""; })();
var CSS = '\
.mai-chat-btn{position:fixed;right:1.1rem;bottom:1.1rem;z-index:950;display:flex;align-items:center;gap:.5rem;background:#C9A84C;color:#001830;border:none;border-radius:100px;padding:.75rem 1.1rem .75rem .95rem;font:700 .85rem Inter,system-ui,sans-serif;cursor:pointer;box-shadow:0 8px 24px rgba(0,24,48,.25);transition:transform .15s,background .2s}\
.mai-chat-btn:hover{background:#e8c86a;transform:translateY(-1px)}\
.mai-chat-btn svg{width:18px;height:18px}\
.mai-chat{position:fixed;right:1.1rem;bottom:4.6rem;z-index:951;width:min(380px,calc(100vw - 2.2rem));max-height:min(640px,calc(100vh - 6rem));display:none;flex-direction:column;background:#fff;border:1px solid rgba(0,62,138,.16);border-radius:14px;box-shadow:0 18px 50px rgba(0,24,48,.25);overflow:hidden;font-family:Inter,system-ui,sans-serif}\
.mai-chat.open{display:flex}\
.mai-chat-h{background:linear-gradient(140deg,#00122e,#003E8A);color:#fff;padding:.85rem 1rem;display:flex;align-items:center;justify-content:space-between;gap:.75rem}\
.mai-chat-h b{font:800 .95rem "Playfair Display",Georgia,serif}\
.mai-chat-h small{display:block;font-size:.68rem;color:rgba(255,255,255,.6);margin-top:.15rem;font-weight:400}\
.mai-chat-x{background:none;border:none;color:#fff;font-size:1.2rem;cursor:pointer;padding:.2rem .4rem;line-height:1}\
.mai-chat-m{flex:1;overflow-y:auto;padding:.9rem;background:#f6f8fc;display:flex;flex-direction:column;gap:.6rem}\
.mai-msg{max-width:92%;padding:.65rem .85rem;border-radius:10px;font-size:.84rem;line-height:1.6;color:#1a1a2e}\
.mai-msg.bot{background:#fff;border:1px solid rgba(0,62,138,.12);align-self:flex-start;border-bottom-left-radius:3px}\
.mai-msg.user{background:#003E8A;color:#fff;align-self:flex-end;border-bottom-right-radius:3px}\
.mai-msg a{color:#003E8A;font-weight:700;text-decoration:none}\
.mai-msg a.more{display:inline-block;margin-top:.5rem;font-size:.78rem}\
.mai-chips{display:flex;flex-wrap:wrap;gap:.35rem;padding:0 .9rem .6rem;background:#f6f8fc}\
.mai-chip{background:#fff;border:1px solid rgba(0,62,138,.25);color:#003E8A;border-radius:100px;padding:.3rem .7rem;font-size:.74rem;cursor:pointer;font-family:inherit}\
.mai-chip:hover{background:rgba(0,62,138,.08)}\
.mai-chat-f{display:flex;gap:.4rem;padding:.6rem .7rem;border-top:1px solid rgba(0,62,138,.12);background:#fff}\
.mai-chat-f input{flex:1;border:1px solid rgba(0,62,138,.25);border-radius:8px;padding:.55rem .7rem;font:.86rem Inter,system-ui,sans-serif;color:#1a1a2e}\
.mai-chat-f button{background:#003E8A;color:#fff;border:none;border-radius:8px;padding:.55rem .85rem;font:700 .82rem Inter,system-ui,sans-serif;cursor:pointer}\
.mai-chat-n{font-size:.66rem;color:#6b7280;padding:.35rem .9rem .6rem;background:#fff;line-height:1.45}\
.mai-send{margin-top:.55rem;display:flex;flex-direction:column;gap:.4rem}\
.mai-send input{border:1px solid rgba(0,62,138,.25);border-radius:6px;padding:.45rem .6rem;font:.8rem Inter,system-ui,sans-serif}\
.mai-send .row{display:flex;gap:.4rem;flex-wrap:wrap}\
.mai-send button,.mai-send a.b{border-radius:6px;padding:.45rem .8rem;font:700 .76rem Inter,system-ui,sans-serif;cursor:pointer;text-decoration:none;display:inline-block}\
.mai-send .go{background:#C9A84C;color:#001830;border:none}\
.mai-send a.b{background:transparent;color:#003E8A;border:1px solid #003E8A}\
@media(max-width:560px){.mai-chat{right:.5rem;left:.5rem;width:auto;bottom:4.2rem;max-height:calc(100vh - 5.2rem)}.mai-chat-btn{right:.6rem;bottom:.6rem}}\
@media print{.mai-chat,.mai-chat-btn{display:none !important}}';

var CHIPS=["What does it cost?","Who is this for?","What is the cheatsheet?","Do you work with funders?","What is Article 4?","How do I book a call?"];

function el(t,c,h){var e=document.createElement(t); if(c) e.className=c; if(h!=null) e.innerHTML=h; return e;}
function esc(s){return s.replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}

function build(){
  var st=document.createElement("style"); st.textContent=CSS; document.head.appendChild(st);
  var btn=el("button","mai-chat-btn",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-6a8 8 0 1 1 18-5z"/></svg>Ask about the services');
  btn.setAttribute("aria-label","Open the site assistant"); btn.setAttribute("aria-expanded","false");
  var box=el("div","mai-chat"); box.setAttribute("role","dialog"); box.setAttribute("aria-label","Site assistant");
  box.innerHTML='<div class="mai-chat-h"><div><b>Site assistant</b><small>Answers come only from this website</small></div><button class="mai-chat-x" aria-label="Close">&times;</button></div>'+
    '<div class="mai-chat-m" id="mai-chat-m"></div><div class="mai-chips" id="mai-chips"></div>'+
    '<form class="mai-chat-f" id="mai-chat-f"><input id="mai-chat-i" type="text" placeholder="Ask about services, prices, who it is for…" autocomplete="off" aria-label="Your question"/><button type="submit">Ask</button></form>'+
    '<div class="mai-chat-n">This assistant repeats what is written on the site and cannot invent an answer. If it does not know, it will offer to send your question to the team.</div>';
  document.body.appendChild(btn); document.body.appendChild(box);
  var m=box.querySelector("#mai-chat-m"), chips=box.querySelector("#mai-chips"), f=box.querySelector("#mai-chat-f"), inp=box.querySelector("#mai-chat-i");
  function add(kind,html){var d=el("div","mai-msg "+kind,html); m.appendChild(d); m.scrollTop=m.scrollHeight; return d;}
  function renderChips(list){chips.innerHTML=""; list.forEach(function(c){var b=el("button","mai-chip",esc(c)); b.type="button"; b.onclick=function(){ask(c);}; chips.appendChild(b);});}
  function unanswered(q){
    var d=add("bot","I don't have that on the website, so I won't guess. Two options: send the question to the team and they will reply, or use the contact form.");
    var w=el("div","mai-send",'<input type="email" placeholder="Your email (optional, so they can reply)" aria-label="Your email"/><div class="row"><button type="button" class="go">Send to the team</button><a class="b" href="'+P+'contact-us/">Contact form</a></div>');
    d.appendChild(w);
    w.querySelector(".go").onclick=function(){
      var email=w.querySelector("input").value.trim(); var b=this; b.disabled=true; b.textContent="Sending…";
      sendToTeam(q,email).then(function(){ w.innerHTML='<span style="font-size:.8rem;color:#1a7a4a;font-weight:700">Sent. The team will reply'+(email?' to '+esc(email):'')+'.</span>'; })
        .catch(function(){ w.innerHTML='<span style="font-size:.8rem;color:#a8271a">Could not send. Please use the <a href="'+P+'contact-us/">contact form</a>.</span>'; });
    };
  }
  function ask(q){
    q=(q||"").trim(); if(!q) return; add("user",esc(q)); inp.value="";
    if(THANKS.test(q) && q.length<40){ add("bot","You're welcome. If anything else is unclear, the contact form goes straight to the team."); renderChips(CHIPS); return; }
    if(GREET.test(q) && q.length<30){ add("bot","Hello. Ask me anything about the services, prices, who they are for, or how an engagement runs."); renderChips(CHIPS); return; }
    var e=answer(q);
    if(!e){ unanswered(q); renderChips(CHIPS); return; }
    add("bot",esc(e.a)+'<br/><a class="more" href="'+P+e.l+'">'+esc(e.t)+' &rarr;</a>');
    var rel=CHIPS.filter(function(c){return answer(c)!==e;}).slice(0,4); renderChips(rel);
  }
  f.addEventListener("submit",function(ev){ev.preventDefault(); ask(inp.value);});
  function open(o){ box.classList.toggle("open",o); btn.setAttribute("aria-expanded",o?"true":"false"); if(o){ if(!m.children.length){ add("bot","Ask me about the services, what they cost, who they are for, or how an engagement runs. I only repeat what is on this site."); renderChips(CHIPS);} inp.focus(); } }
  btn.onclick=function(){open(!box.classList.contains("open"));};
  box.querySelector(".mai-chat-x").onclick=function(){open(false);};
  document.addEventListener("keydown",function(e){ if(e.key==="Escape") open(false); });
}

/* ──────────────────────────── hand-off to the team ──────────────────────────── */
function loadEmailJS(){
  return new Promise(function(res,rej){
    if(window.emailjs) return res();
    var s=document.createElement("script"); s.src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.onload=function(){res();}; s.onerror=rej; document.head.appendChild(s);
  });
}
function sendToTeam(q,email){
  return loadEmailJS().then(function(){
    try{ window.emailjs.init({publicKey:"JJs3lu55OHI_pbjth"}); }catch(e){}
    return window.emailjs.send("service_an94235","template_bv6m1l3",{
      from_name:"Website assistant — unanswered question",
      from_email: email || "no-reply@mai4consulting.com",
      organization:"—", job_title:"—", sector:"—", team_size:"—",
      service:"Website assistant — question the assistant could not answer",
      referral:"Site assistant", preferred: email ? "Email" : "—",
      message:"Question the assistant could not answer:\n\n"+q+"\n\nPage: "+location.href+"\nTime: "+new Date().toISOString()+(email?"\nVisitor email: "+email:"\nVisitor email: not given"),
      to_email:"q.mamdouh@mai4consulting.com"
    });
  });
}

if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",build); else build();
window.__maiChat={answer:answer,KB:KB};
})();
