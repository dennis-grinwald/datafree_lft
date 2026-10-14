# Data Free LFT — project page

Local academic project page based on [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template). Nothing has been deployed by this setup.

## Preview

```bash
cd /Users/dg/Projects/Research/lft_gen/datafree_lft
./preview.sh
```

Open http://127.0.0.1:8088. Use HTTP rather than opening index.html directly, because the results table loads a JSON snapshot.

## Update from the paper

```bash
python3 tools/sync_paper.py --source ..
```

Requires Poppler (`pdftoppm`). Copies the existing manuscript and supplement PDFs, renders four existing paper figures to PNG, and extracts nine CVSI result rows from `final_results/method_results/results.json`. `static/data/results.json` records source checksums and checkpoint identities. It does not recompute scientific measurements or modify the paper. Rebuild the paper upstream before syncing if its PDFs are stale.

## GIFs

The comparison is **L16 critical phase only**, κ=0.2705, λ=0.022: archived HMC beside saved CVSI samples, using the paper-selected round-2000 model. The six-panel GIF shows configurations 300–600 at 10 fps, including magnetization traces and autocorrelations.

The GIF is in `static/gifs/comparison_L16_critical_300_600_hd.gif`; its path is configured as `comparisonGif` in `static/js/index.js`. No video is embedded. Original template media are retained but unreferenced.

## Edit

- Content: `index.html`
- Palette/layout: `static/css/index.css` (variables at the top)
- GIF configuration/table rendering: `static/js/index.js`
- Results: generated `static/data/results.json`

No publication venue or arXiv identifier is invented; links point to the supplied manuscript, supplement and code. Template attribution and CC BY-SA 4.0 link remain in the footer.

The preview defaults to port 8088 (`./preview.sh 8090` selects another port).
Requests to `/props`, `/v1/models`, `/tools`, or `/build.json` are not made by
this page. This is a static site, not an API server; such requests from other
clients will receive 404/501 responses. Open the root URL shown by the launcher.
