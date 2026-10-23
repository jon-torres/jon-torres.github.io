"""Run the Portuguese copy through Clarice's NLP style rules.

Usage:
    CLARICE_REPO=/path/to/cla-genai-apis-v5 python3 scripts/check-pt.py

Extracts every multi-word string literal from src/content/pt.ts and reports
the rules each one trips. Proper-noun lists and quoted titles are expected
false positives; announcement colons, "não apenas... mas também", stacked
adjectives and -mente adverbs are the ones to fix.
"""

from __future__ import annotations

import json
import logging
import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "src" / "content" / "pt.ts"


def strings() -> list[str]:
    text = SOURCE.read_text(encoding="utf-8")
    found = [m.group(1).replace("\\'", "'") for m in re.finditer(r"'((?:[^'\\]|\\.)*)'", text)]
    return [s for s in found if re.search(r"\S+\s+\S+\s+\S+", s) and not s.startswith(("http", "/"))]


def main() -> int:
    repo = os.environ.get("CLARICE_REPO")
    if not repo or not (Path(repo) / "src" / "nlp").is_dir():
        print("CLARICE_REPO is not set or does not point at the Clarice NLP service; skipping.")
        return 0
    paragraphs = strings()
    python = Path(repo) / ".venv" / "bin" / "python"
    runner = r'''
import json, sys, logging
logging.disable(logging.WARNING)
from src.nlp import run_nlp_rules_on_paragraphs
from src.nlp.loader import load_nlp
paras = json.load(sys.stdin)
items, offset = [], 0
for p in paras:
    items.append({"description": p, "offset": offset}); offset += len(p) + 2
res = run_nlp_rules_on_paragraphs(items, nlp=load_nlp())
out = []
for g in res:
    for d in g.get("detections") or []:
        out.append({"paragraph": g["paragraph_text"], "rule": d.get("rule"), "text": d.get("text")})
print(json.dumps(out, ensure_ascii=False))
'''
    proc = subprocess.run(
        [str(python if python.exists() else "python3"), "-c", runner],
        input=json.dumps(paragraphs),
        capture_output=True,
        text=True,
        cwd=repo,
        env={**os.environ, "PYTHONPATH": repo},
    )
    if proc.returncode != 0:
        print(proc.stderr[-2000:])
        return 1
    findings = json.loads(proc.stdout.strip().splitlines()[-1])
    for f in findings:
        print(f"[{f['rule']}] {f['text']!r}\n    in: {f['paragraph'][:90]!r}")
    print(f"\n{len(findings)} findings over {len(paragraphs)} strings")
    return 0


if __name__ == "__main__":
    logging.disable(logging.WARNING)
    sys.exit(main())
