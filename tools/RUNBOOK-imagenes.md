# RUNBOOK — Sustituir placeholders por fotos reales de Openverse

> Carpeta `tools/` = solo desarrollo. **No subir a Hostinger.** Se puede borrar
> al terminar (este runbook, `openverse-queries.json` y `build_credits.py`).

## Contexto

La web está terminada y con animaciones GSAP ya integradas (rama
`claude/awesome-babbage-7im8xd`). Solo falta sustituir las imágenes
placeholder (degradados) de `assets/img/` por fotos reales de Openverse.
**Este runbook es la única tarea pendiente.**

Requisito de red: el entorno debe permitir `api.openverse.org`,
`upload.wikimedia.org` y `live.staticflickr.com` (probar con
`curl -s -o /dev/null -w "%{http_code}" "https://api.openverse.org/v1/images/?q=test&page_size=1"`
→ debe dar `200`, no `403`).

## Reglas innegociables

- **Mismos nombres exactos**: `hero.webp`, `salon-1.webp`, `salon-2.webp`,
  `salon-3.webp`, `promo.webp`, `gal-01.webp` … `gal-12.webp` (17 archivos).
- **Orientación**: `hero` y `promo` horizontales; `salon-1/2/3` verticales
  (se recortan 4:5 en CSS); `gal-*` cuadradas o casi.
- **Temática**: peluquería, manicura, salón de belleza, secador, tijeras.
- **Licencias**: solo `cc0`, `pdm`, `by`, `by-sa`. ⚠️ El script de la skill
  relaja filtros si no hay resultados y su último intento **quita el filtro
  de licencia** — `tools/build_credits.py` lo re-valida y falla si se coló
  una licencia no segura (p. ej. `by-nc-*`): refetch de ese id.
- **No tocar**: `index.html`, `styles.css`, `main.js`, `lib/manifest.js`,
  enlaces de WhatsApp/Maps, textos.
- **No commitear los originales** descargados (trabajar en `/tmp`).

## Pasos

```bash
SKILL=.claude/skills/adrian-saenz-hostinger-premium-website

# 1. Descargar las 17 imágenes (originales a /tmp, créditos crudos a /tmp)
python3 $SKILL/scripts/openverse_fetch.py \
  --queries tools/openverse-queries.json \
  --target /tmp/ov-src --credits /tmp/ov-credits-raw.json

# 2. Validar orientación + licencia de cada descarga
python3 - << 'EOF'
import json, sys
from pathlib import Path
from PIL import Image  # pip install pillow si falta
need = {"hero": "wide", "promo": "wide", "salon-1": "tall", "salon-2": "tall", "salon-3": "tall"}
need.update({f"gal-{i:02d}": "anyish" for i in range(1, 13)})
creds = json.loads(Path("/tmp/ov-credits-raw.json").read_text())
bad = []
for iid, want in need.items():
    files = list(Path("/tmp/ov-src").glob(iid + ".*"))
    if not files: bad.append((iid, "NO DESCARGADA")); continue
    w, h = Image.open(files[0]).size
    r = w / h
    if want == "wide" and r < 1.15: bad.append((iid, f"no horizontal ({w}x{h})"))
    if want == "tall" and r > 0.95: bad.append((iid, f"no vertical ({w}x{h})"))
    lic = (creds.get(iid, {}).get("license") or "").lower()
    if lic not in {"cc0", "pdm", "by", "by-sa"}: bad.append((iid, f"licencia {lic}"))
print("PROBLEMAS:", bad if bad else "ninguno")
EOF
```

3. **Refetch de ids problemáticos** (query alternativa, créditos a archivo
   aparte para no machacar los buenos):

```bash
python3 $SKILL/scripts/openverse_fetch.py \
  --inline-queries '[{"id":"hero","query":"hairdresser salon mirrors lights","aspect":"wide","size":"large"}]' \
  --target /tmp/ov-src --credits /tmp/ov-credits-retry1.json
# (borrar antes la descarga mala de ese id en /tmp/ov-src para no dejar dos extensiones)
```

   Queries alternativas por si fallan las primarias: hero → "hairdresser
   salon mirrors", "barbershop interior chairs"; salon-* → "salon hair
   washing basin", "nail salon table", "hair styling tools"; gal-* →
   "painted fingernails", "hair scissors barber", "hairdryer", "manicure
   tools", "hair braid", "nail varnish", "woman haircut salon", "hair
   rollers", "spa pedicure", "comb scissors".
   **Mirar las fotos descargadas** (abrirlas) — Openverse a veces devuelve
   resultados raros aunque el título encaje.

4. **Convertir a WebP** (galería más pequeña, el resto con la heurística
   de la skill: hero 2000px/q78, resto 1200px/q80):

```bash
mkdir -p /tmp/ov-src-gal && mv /tmp/ov-src/gal-* /tmp/ov-src-gal/
python3 $SKILL/scripts/webp_convert.py --src /tmp/ov-src     --dst assets/img
python3 $SKILL/scripts/webp_convert.py --src /tmp/ov-src-gal --dst assets/img --max-width 700 --quality 78
```

5. **Cuotas de peso** (checklist §10 de la skill): ningún archivo > 250 KB
   (el hero puede llegar a ~250 KB), `assets/img/` total < 4 MB. Si algo
   pesa de más → reconvertir ese archivo con `--max-width` menor.

6. **Créditos finales** (reclava a `<id>.webp`, corrige `src`, valida licencias):

```bash
python3 tools/build_credits.py /tmp/ov-credits-raw.json /tmp/ov-credits-retry*.json assets/credits.json
# (los retry son opcionales; los últimos archivos pisan a los primeros)
```

7. **Verificar y entregar**:

```bash
python3 $SKILL/scripts/verify_project.py --project .   # debe seguir: 0 warnings, 0 errores
git add -A && git commit -m "Sustituye placeholders por fotos reales de Openverse + créditos"
git push -u origin claude/awesome-babbage-7im8xd
```
