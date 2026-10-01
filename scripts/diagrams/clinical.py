"""
Original schematic clinical diagrams for image questions.
Run: python3 scripts/diagrams/clinical.py
"""
import math, os
OUT = os.path.join(os.path.dirname(__file__), '../../public/images')
FONT = 'font-family="Arial, sans-serif"'

def save(rel, svg):
    open(os.path.join(OUT, rel), 'w').write(svg)
    print('wrote', rel)

# ---------------------------------------------------------------- CTG: late decelerations
def ctg():
    W, minutes = 760, 10
    px_min = (W - 60) / minutes
    fy0, fy1, fmin, fmax = 20, 230, 60, 210          # FHR panel
    uy0, uy1 = 270, 380                               # contraction panel (0–100 mmHg)
    X = lambda t: 50 + t * px_min
    FY = lambda b: fy1 - (b - fmin) / (fmax - fmin) * (fy1 - fy0)
    UY = lambda p: uy1 - p / 100 * (uy1 - uy0)
    peaks = [1.6, 4.8, 8.0]                           # contraction peaks (min), ~every 3 min
    def toco(t):
        return 12 + sum(58 * math.exp(-((t - p) ** 2) / (2 * 0.22 ** 2)) for p in peaks)
    def fhr(t):
        v = 150 + 2.5 * math.sin(t * 9.1) + 1.5 * math.sin(t * 23.7)   # reduced variability (< 5 bpm)
        for p in peaks:                                                # late decel: nadir ~35 s after peak
            v -= 25 * math.exp(-((t - (p + 0.6)) ** 2) / (2 * 0.3 ** 2))
        return v
    g = []
    for b in range(fmin, fmax + 1, 10):
        g.append(f'<line x1="50" x2="{W-10}" y1="{FY(b):.1f}" y2="{FY(b):.1f}" stroke="{"#e6a6a6" if b % 30 == 0 else "#f5dada"}" stroke-width="{1 if b % 30 == 0 else .6}"/>')
        if b % 30 == 0:
            g.append(f'<text x="44" y="{FY(b)+4:.1f}" text-anchor="end" font-size="11" {FONT} fill="#555">{b}</text>')
    for p in range(0, 101, 25):
        g.append(f'<line x1="50" x2="{W-10}" y1="{UY(p):.1f}" y2="{UY(p):.1f}" stroke="#f0dada" stroke-width=".6"/>')
        g.append(f'<text x="44" y="{UY(p)+4:.1f}" text-anchor="end" font-size="11" {FONT} fill="#555">{p}</text>')
    for m in range(minutes + 1):
        for y0, y1 in ((fy0, fy1), (uy0, uy1)):
            g.append(f'<line x1="{X(m):.1f}" x2="{X(m):.1f}" y1="{y0}" y2="{y1}" stroke="#e6a6a6" stroke-width=".8"/>')
    fp = ' '.join(f'{X(t/40):.1f},{FY(fhr(t/40)):.1f}' for t in range(0, minutes * 40 + 1))
    up = ' '.join(f'{X(t/40):.1f},{UY(toco(t/40)):.1f}' for t in range(0, minutes * 40 + 1))
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} 410" width="{W}" height="410" role="img" aria-label="Schematic cardiotocograph">
<title>Schematic CTG: baseline about 150 bpm with reduced variability and recurrent decelerations that begin after each contraction peak</title>
<rect width="100%" height="100%" fill="#fff"/>
{chr(10).join(g)}
<polyline points="{fp}" fill="none" stroke="#111" stroke-width="1.6"/>
<polyline points="{up}" fill="none" stroke="#111" stroke-width="1.6"/>
<text x="50" y="14" font-size="12" {FONT} fill="#333">Fetal heart rate (bpm)</text>
<text x="50" y="262" font-size="12" {FONT} fill="#333">Uterine contractions (mmHg)</text>
<text x="{W-10}" y="402" text-anchor="end" font-size="11" {FONT} fill="#555">1 square = 1 minute</text>
</svg>'''
    save('obg/ctg-late-decelerations.svg', svg)

# ---------------------------------------------------------------- Audiogram: otosclerosis (right ear)
def audiogram():
    freqs = [250, 500, 1000, 2000, 4000, 8000]
    W, H = 520, 420
    x0, x1, y0, y1 = 70, 490, 40, 390
    X = lambda i: x0 + i * (x1 - x0) / (len(freqs) - 1)
    Y = lambda db: y0 + (db + 10) / 130 * (y1 - y0)     # −10 to 120 dB HL, downward
    ac = [45, 45, 40, 35, 30, 30]                         # air conduction (O)
    bc = [5, 5, 10, 25, 10, None]                         # bone conduction ([) with dip at 2 kHz
    g = [f'<rect x="{x0}" y="{y0}" width="{x1-x0}" height="{y1-y0}" fill="#fff" stroke="#999"/>']
    for db in range(-10, 121, 10):
        g.append(f'<line x1="{x0}" x2="{x1}" y1="{Y(db):.1f}" y2="{Y(db):.1f}" stroke="#ddd"/>')
        g.append(f'<text x="{x0-8}" y="{Y(db)+4:.1f}" text-anchor="end" font-size="11" {FONT} fill="#555">{db}</text>')
    for i, f in enumerate(freqs):
        g.append(f'<line x1="{X(i):.1f}" x2="{X(i):.1f}" y1="{y0}" y2="{y1}" stroke="#ddd"/>')
        g.append(f'<text x="{X(i):.1f}" y="{y0-10}" text-anchor="middle" font-size="11" {FONT} fill="#555">{f if f < 1000 else str(f//1000)+"k"}</text>')
    g.append(f'<polyline points="{" ".join(f"{X(i):.1f},{Y(v):.1f}" for i, v in enumerate(ac))}" fill="none" stroke="#c0392b" stroke-width="2"/>')
    for i, v in enumerate(ac):
        g.append(f'<circle cx="{X(i):.1f}" cy="{Y(v):.1f}" r="7" fill="#fff" stroke="#c0392b" stroke-width="2"/>')
    pts = [(i, v) for i, v in enumerate(bc) if v is not None]
    g.append(f'<polyline points="{" ".join(f"{X(i)-12:.1f},{Y(v):.1f}" for i, v in pts)}" fill="none" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="5 4"/>')
    for i, v in pts:
        x, y = X(i) - 12, Y(v)
        g.append(f'<polyline points="{x+5:.1f},{y-8:.1f} {x:.1f},{y-8:.1f} {x:.1f},{y+8:.1f} {x+5:.1f},{y+8:.1f}" fill="none" stroke="#c0392b" stroke-width="2"/>')
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H+30}" width="{W}" height="{H+30}" role="img" aria-label="Pure-tone audiogram of the right ear">
<title>Right-ear audiogram: air conduction around 30–45 dB HL, bone conduction near normal except a dip to 25 dB at 2 kHz</title>
<rect width="100%" height="100%" fill="#fff"/>
{chr(10).join(g)}
<text x="{(x0+x1)/2}" y="16" text-anchor="middle" font-size="12" {FONT} fill="#333">Frequency (Hz) — RIGHT ear</text>
<text x="18" y="{(y0+y1)/2}" text-anchor="middle" font-size="12" {FONT} fill="#333" transform="rotate(-90 18 {(y0+y1)/2})">Hearing level (dB HL)</text>
<circle cx="{x0+10}" cy="{H+12}" r="6" fill="#fff" stroke="#c0392b" stroke-width="2"/><text x="{x0+22}" y="{H+16}" font-size="11" {FONT} fill="#333">Air conduction</text>
<polyline points="{x0+142},{H+4} {x0+137},{H+4} {x0+137},{H+20} {x0+142},{H+20}" fill="none" stroke="#c0392b" stroke-width="2"/><text x="{x0+150}" y="{H+16}" font-size="11" {FONT} fill="#333">Bone conduction (masked)</text>
</svg>'''
    save('ent/audiogram-otosclerosis-right.svg', svg)

# ---------------------------------------------------------------- Visual fields: bitemporal hemianopia
def fields():
    W, H, r = 520, 280, 100
    def eye(cx, label, lost_side):
        x = cx - r if lost_side == 'left' else cx
        clip = f'clip-{label.split()[0].lower()}'
        return f'''<clipPath id="{clip}"><circle cx="{cx}" cy="140" r="{r}"/></clipPath>
<rect x="{x}" y="40" width="{r}" height="{2*r}" fill="#444" clip-path="url(#{clip})"/>
<circle cx="{cx}" cy="140" r="{r}" fill="none" stroke="#222" stroke-width="2"/>
<line x1="{cx}" y1="36" x2="{cx}" y2="244" stroke="#888" stroke-dasharray="4 4"/>
<line x1="{cx-r-4}" y1="140" x2="{cx+r+4}" y2="140" stroke="#888" stroke-dasharray="4 4"/>
<text x="{cx}" y="268" text-anchor="middle" font-size="13" {FONT} fill="#222">{label}</text>'''
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="Visual field charts of both eyes">
<title>Visual fields as seen by the patient: loss of the temporal half of the field in each eye</title>
<rect width="100%" height="100%" fill="#fff"/>
{eye(130, 'Left eye', 'left')}
{eye(390, 'Right eye', 'right')}
<text x="{W/2}" y="20" text-anchor="middle" font-size="12" {FONT} fill="#333">Fields plotted as seen by the patient · shaded = field loss</text>
</svg>'''
    save('eye/visual-fields-bitemporal.svg', svg)

ctg(); audiogram(); fields()
