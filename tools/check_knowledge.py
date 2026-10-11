#!/usr/bin/env python3
"""QA gate for the Knowledge section. Exit code 1 if anything fails.

Checks every knowledge/content/*.md (front matter, wording rules, related ids) and every
generated knowledge/<slug>/index.html (internal links resolve). Run after build_knowledge.py;
the weekly sync must not commit when this fails.
"""
import glob, os, re, sys
import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
C = "knowledge/content/"
SERVICES = {"assessment", "policy", "training", "support", "agents", "general"}
FORMATS = {"Guide", "Framework", "Explainer", "Analysis", "Briefing"}
LEVELS = {"Entry", "Practitioner", "Advanced"}
bad = []
ids, slugs, featured = set(), {}, 0
rows = []
for p in sorted(glob.glob(C + "*.md")):
    name = os.path.basename(p)
    if name.startswith("_"):
        continue
    t = open(p, encoding="utf8").read()
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", t, re.S)
    if not m:
        bad.append((name, "no front matter")); continue
    try:
        fm = yaml.safe_load(m.group(1))
    except Exception as ex:
        bad.append((name, "yaml: " + str(ex).splitlines()[0])); continue
    body = m.group(2)
    rows.append((name, fm, body))
    ids.add(fm.get("slug"))
    us = fm.get("short_slug") or fm.get("slug")
    if us in slugs:
        bad.append((name, "duplicate url slug with " + slugs[us]))
    slugs[us] = name
    if fm.get("slug") != name[:-3]: bad.append((name, "slug != file name"))
    if fm.get("service") not in SERVICES: bad.append((name, "service"))
    if fm.get("format") not in FORMATS: bad.append((name, "format"))
    if fm.get("level") not in LEVELS: bad.append((name, "level"))
    if not re.match(r"^\d{4}-\d{2}-\d{2}$", str(fm.get("date"))): bad.append((name, "date"))
    s = len(str(fm.get("summary", "")).split())
    if not 12 <= s <= 50: bad.append((name, f"summary words {s}"))
    if len(str(fm.get("title", ""))) > 90: bad.append((name, "title > 90"))
    if str(fm.get("title", "")).endswith("."): bad.append((name, "title ends with full stop"))
    if "—" in t or "–" in t: bad.append((name, "em/en dash"))
    if re.search(r"^#\w+", body, re.M): bad.append((name, "hashtag line"))
    if re.search(r"\[/?(BOLD|BULLET|ITALIC|BLOCKQUOTE|BODY|META)", body): bad.append((name, "export markup"))
    if len(re.findall(r"\w+", body)) < 250: bad.append((name, "body under 250 words"))
    if fm.get("featured"): featured += 1
for name, fm, _ in rows:
    for r in fm.get("related") or []:
        if r not in ids: bad.append((name, "related id not found: " + r))
if featured > 6: bad.append(("(library)", f"{featured} featured, max 6"))
for d in glob.glob("knowledge/*/index.html"):
    h = open(d, encoding="utf8").read()
    for href in re.findall(r'href="(\.\./\.\./[^"#]*)"', h) + re.findall(r'href="(/[^"#]*)"', h):
        tgt = os.path.normpath(os.path.join(os.path.dirname(d), href)) if href.startswith("..") else href.lstrip("/")
        if tgt and not (os.path.exists(tgt) or os.path.exists(os.path.join(tgt, "index.html"))):
            bad.append((d, "broken link " + href))
print(f"{len(rows)} articles checked, {len(bad)} problems")
for b in bad:
    print("FAIL", *b)
sys.exit(1 if bad else 0)
