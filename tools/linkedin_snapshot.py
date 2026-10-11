#!/usr/bin/env python3
"""Read-only snapshot of what is published on the owner's LinkedIn profile and the MAI Consulting Page.

Opens three pages in a persistent Chromium profile that the owner logged into himself (the one made by
linkedin-content-agent/scripts/login_setup.py), scrolls a little, reads titles, links and dates, and
writes JSON. It never clicks, types, posts, edits or deletes anything, and never handles a password.

Exit codes: 0 ok, 2 not logged in / auth wall, 3 page loaded but nothing readable, 4 other error.
Usage: python tools/linkedin_snapshot.py --out logs/linkedin-snapshot/2026-10-16.json [--headed]
"""
import argparse, json, pathlib, re, sys, time
from datetime import datetime

PROFILE_DIR = pathlib.Path(r"C:\Users\qmamd\linkedin-content-agent\playwright-profile")
PAGES = [
    ("profile", "https://www.linkedin.com/in/qmamdouh/"),
    ("profile_articles", "https://www.linkedin.com/in/qmamdouh/recent-activity/articles/"),
    ("page_published", "https://www.linkedin.com/company/94284867/admin/page-posts/published/"),
]

EXTRACT = r"""() => {
  const seen = {};
  document.querySelectorAll('a[href*="/pulse/"], a[href*="/newsletters/"], a[href*="/feed/update/"], a[href*="/posts/"]').forEach(a => {
    const h = a.href.split('?')[0];
    const t = (a.innerText || '').trim().split('\n')[0].slice(0, 200);
    if (!seen[h] || t.length > seen[h].length) seen[h] = t;
  });
  const dates = [...document.querySelectorAll('time, span.update-components-actor__sub-description, .feed-shared-actor__sub-description')]
      .map(e => (e.getAttribute('datetime') || e.innerText || '').trim()).filter(Boolean).slice(0, 60);
  return {
    url: location.href,
    title: document.title,
    links: Object.entries(seen).map(([url, text]) => ({url, text})),
    dates: dates,
    text: document.body ? document.body.innerText.slice(0, 20000) : ''
  };
}"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True)
    ap.add_argument("--headed", action="store_true")
    args = ap.parse_args()
    from playwright.sync_api import sync_playwright
    result = {"taken_at": datetime.now().isoformat(timespec="seconds"), "pages": {}}
    code = 0
    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            user_data_dir=str(PROFILE_DIR), headless=not args.headed,
            viewport={"width": 1400, "height": 1000})
        try:
            page = ctx.pages[0] if ctx.pages else ctx.new_page()
            page.set_default_timeout(45000)
            for name, url in PAGES:
                page.goto(url, wait_until="domcontentloaded")
                page.wait_for_timeout(4000)
                if re.search(r"/(login|authwall|checkpoint|uas/)", page.url):
                    print(f"AUTH: redirected to {page.url} (session not logged in)", file=sys.stderr)
                    code = 2
                    break
                for _ in range(5):                      # light scroll to load a few more items
                    page.mouse.wheel(0, 2500)
                    page.wait_for_timeout(1500)
                data = page.evaluate(EXTRACT)
                result["pages"][name] = data
                print(f"{name}: {len(data['links'])} links, {len(data['text'])} chars, final url {data['url']}")
                page.wait_for_timeout(3000)
            if code == 0 and not any(d["links"] for d in result["pages"].values()):
                code = 3
        except Exception as ex:
            print("ERROR:", type(ex).__name__, str(ex)[:300], file=sys.stderr)
            code = 4
        finally:
            ctx.close()
    out = pathlib.Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(result, ensure_ascii=False, indent=1), encoding="utf-8")
    print("snapshot written:", out, "exit", code)
    sys.exit(code)


if __name__ == "__main__":
    main()
