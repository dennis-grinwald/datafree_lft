'use strict';
// Rendered comparison: samples 300–600 inclusive at 10 fps.
const comparisonGif = 'static/gifs/comparison_L16_critical_300_600_hd.gif?v=hd1600-clean';
if (comparisonGif) {
  const img = document.createElement('img');
  img.src = comparisonGif;
  img.width = 1600; img.height = 1504;
  img.style.width = '100%'; img.style.height = 'auto';
  document.getElementById('comparison-gif').classList.add('gif-loaded');
  img.alt = 'L16 critical-phase HMC reference beside saved CVSI configurations';
  document.getElementById('comparison-gif').replaceChildren(img);
}
async function loadResults() {
  const status = document.getElementById('results-status');
  try {
    const response = await fetch('static/data/results.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (data.schema_version !== 1 || data.rows.length !== 9) throw new Error('Unexpected result schema');
    const phases = ['symmetric','critical','broken'];
    data.rows.sort((a,b)=>a.L-b.L || phases.indexOf(a.phase)-phases.indexOf(b.phase));
    const body = document.getElementById('results-body');
    for (const r of data.rows) {
      const tr = document.createElement('tr');
      for (const v of [r.L,r.phase,r.n.toLocaleString('en-US'),(100*r.ess).toFixed(2)+'%',r.f.toFixed(6)+' ± '+r.f_err.toPrecision(2),r.f_hmc.toFixed(6)+' ± '+r.f_hmc_err.toPrecision(2),(r.z>=0?'+':'')+r.z.toFixed(2)]) {
        const td = document.createElement('td'); td.textContent = v; tr.append(td);
      }
      body.append(tr);
    }
    status.textContent = 'Snapshot from the repository’s exported results. Source file checksums and checkpoint identities are included in ';
    const link = document.createElement('a'); link.href='static/data/results.json';link.textContent='results.json';status.append(link);
  } catch (error) {
    status.textContent = `Cannot load results: ${error.message}. Serve the page with a local HTTP server (see README).`;
  }
}
loadResults();
