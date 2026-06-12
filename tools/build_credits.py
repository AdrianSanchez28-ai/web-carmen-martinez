#!/usr/bin/env python3
"""Construye assets/credits.json final a partir de los credits crudos de
openverse_fetch.py (uno o varios ficheros, los últimos ganan):
- Reclava por nombre de archivo final: "<id>.webp" (convención del proyecto).
- Corrige src a assets/img/<id>.webp (el crudo apunta a la extensión original).
- Valida que todas las licencias sean comercialmente seguras (cc0, pdm, by, by-sa).
"""
import json, sys
from pathlib import Path

SAFE = {"cc0", "pdm", "by", "by-sa"}
ORDER = ["hero", "salon-1", "salon-2", "salon-3", "promo"] + [f"gal-{i:02d}" for i in range(1, 13)]

merged = {}
for raw_path in sys.argv[1:-1]:
    p = Path(raw_path)
    if not p.exists():
        continue
    merged.update(json.loads(p.read_text(encoding="utf-8")))

bad = {k: v.get("license") for k, v in merged.items() if (v.get("license") or "").lower() not in SAFE}
if bad:
    print(f"LICENCIAS NO SEGURAS: {bad}")
    sys.exit(2)

missing = [i for i in ORDER if i not in merged]
if missing:
    print(f"FALTAN IDS: {missing}")
    sys.exit(3)

out = {}
for item_id in ORDER:
    c = merged[item_id]
    out[f"{item_id}.webp"] = {
        "src": f"assets/img/{item_id}.webp",
        "title": c.get("title") or "Untitled",
        "creator": c.get("creator") or "Unknown",
        "creator_url": c.get("creator_url"),
        "license": (c.get("license") or "").lower(),
        "license_version": c.get("license_version") or "",
        "license_url": c.get("license_url") or "https://creativecommons.org/",
        "foreign_landing_url": c.get("foreign_landing_url") or "",
        "source": c.get("source") or "openverse",
    }

dest = Path(sys.argv[-1])
dest.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"OK {len(out)} créditos → {dest}")
for k, v in out.items():
    print(f"  {k:14s} {v['license'].upper():5s} {v['creator'][:34]:34s} {v['title'][:42]}")
