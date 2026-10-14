#!/usr/bin/env python3
"""Copy current manuscript and export a compact, traceable website snapshot."""
import argparse, hashlib, json, shutil, subprocess
from pathlib import Path
p = argparse.ArgumentParser()
p.add_argument('--source', type=Path, default=Path(__file__).resolve().parents[2])
a = p.parse_args()
root = Path(__file__).resolve().parents[1]
source = a.source.resolve()
paper = source/'paper/DataFreeLFT'
artifacts = {}
def record(path):
    artifacts[str(path.relative_to(source))] = hashlib.sha256(path.read_bytes()).hexdigest()
for name in ('main', 'supplement'):
    f = paper/f'{name}.pdf'
    shutil.copy2(f, root/f'static/pdfs/{name}.pdf')
    record(f)
for src, dest in [('fig_estimator_variance', 'variance'), ('fig_estimators_ess_vs_L_main_log', 'ess'), ('fig_observables_diff', 'observables'), ('fig_estimators_total_df_vs_L_main', 'free_energy')]:
    f = paper/f'figures/{src}.pdf'
    subprocess.run(['pdftoppm', '-png', '-singlefile', '-scale-to', '1800', str(f), str(root/f'static/images/{dest}')], check=True)
    record(f)
f = source/'final_results/method_results/results.json'
record(f)
keys = ['L','phase','n','ess','ess_err','f','f_err','f_hmc','f_hmc_err','checkpoint','checkpoint_sha256']
rows = [{k:r[k] for k in keys} for r in json.loads(f.read_text()) if r['method']=='df_cvsi']
for r in rows:
    r['z'] = (r['f']-r['f_hmc'])/(r['f_err']**2+r['f_hmc_err']**2)**.5
snapshot = {'schema_version':1, 'paper_commit':subprocess.check_output(['git','-C',str(paper),'rev-parse','HEAD'],text=True).strip(), 'source_checksums':artifacts, 'rows':rows}
(root/'static/data/results.json').write_text(json.dumps(snapshot, indent=2)+'\n')
print('Copied manuscript, supplement, four figures and nine CVSI result rows.')
