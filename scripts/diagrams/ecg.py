"""
Generates the original schematic ECG strips used by image questions.
Run: python3 scripts/diagrams/ecg.py  → writes public/images/ecg/*.svg
Standard calibration: 25 mm/s, 10 mm/mV. 1 mm = 4 px.
"""
import math, os

PX = 4                     # px per mm
MM_PER_S = 25
W_MM, H_MM = 100, 36       # 4-second strip
BASE_MM = 24               # baseline height from top (mm)

def g(t, mu, sigma, amp):  # gaussian wave (t, mu, sigma in seconds; amp in mm)
    return amp * math.exp(-((t - mu) ** 2) / (2 * sigma ** 2))

def beat_wpw(t):
    # P at 0.06; PR (P onset → QRS onset) = 0.10 s (short); QRS ≈ 0.12 s with a slurred delta upstroke
    v = g(t, 0.05, 0.020, 1.5)
    q0 = 0.10
    if q0 <= t < q0 + 0.065:                    # delta wave: slow, slurred rise to ~4.5 mm over 65 ms
        v += 4.5 * ((t - q0) / 0.065) ** 0.9
    elif q0 + 0.065 <= t < q0 + 0.09:           # rapid R upstroke to 12 mm
        v += 4.5 + (12 - 4.5) * (t - q0 - 0.065) / 0.025
    elif q0 + 0.09 <= t < q0 + 0.12:            # downstroke to small S
        v += 12 - 13.5 * (t - q0 - 0.09) / 0.03
    elif q0 + 0.12 <= t < q0 + 0.135:
        v += -1.5 + 1.5 * (t - q0 - 0.12) / 0.015
    v += g(t, 0.44, 0.055, 2.6) * (1 if t > q0 + 0.135 else 0)   # T wave
    return v

def beat_hyperk(t):
    # Flattened, broad P; wide QRS (~0.16 s); tall, narrow-based, symmetric peaked T
    v = g(t, 0.05, 0.035, 0.4)
    q0 = 0.16
    if q0 <= t < q0 + 0.10:                     # broad, slurred R (100 ms)
        v += 7 * math.sin(math.pi * (t - q0) / 0.10)
    elif q0 + 0.10 <= t < q0 + 0.18:            # broad S (80 ms) → QRS ≈ 180 ms
        v += -3.0 * math.sin(math.pi * (t - q0 - 0.10) / 0.08)
    v += g(t, 0.49, 0.032, 10.5) * (1 if t > q0 + 0.18 else 0)
    return v

def grid():
    parts = []
    for i in range(W_MM + 1):
        x = i * PX
        bold = i % 5 == 0
        parts.append(f'<line x1="{x}" y1="0" x2="{x}" y2="{H_MM*PX}" stroke="{"#e7a3a3" if bold else "#f6d6d6"}" stroke-width="{1 if bold else 0.5}"/>')
    for j in range(H_MM + 1):
        y = j * PX
        bold = j % 5 == 0
        parts.append(f'<line x1="0" y1="{y}" x2="{W_MM*PX}" y2="{y}" stroke="{"#e7a3a3" if bold else "#f6d6d6"}" stroke-width="{1 if bold else 0.5}"/>')
    return "\n".join(parts)

def strip(beat, rr, label, fname, title):
    pts = []
    n = W_MM * PX
    for xi in range(n + 1):
        t = xi / (MM_PER_S * PX)               # seconds
        tb = (t - 0.25) % rr                    # small lead-in before first beat
        v = beat(tb)
        pts.append(f"{xi},{(BASE_MM - v) * PX:.1f}")
    # 1 mV calibration pulse (10 mm tall, 0.2 s wide) at start
    cal = f'<polyline points="4,{BASE_MM*PX} 8,{BASE_MM*PX} 8,{(BASE_MM-10)*PX} 28,{(BASE_MM-10)*PX} 28,{BASE_MM*PX} 32,{BASE_MM*PX}" fill="none" stroke="#111" stroke-width="1.6"/>'
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W_MM*PX} {H_MM*PX}" width="{W_MM*PX}" height="{H_MM*PX}" role="img" aria-label="{title}">
<title>{title}</title>
<rect width="100%" height="100%" fill="#fff"/>
{grid()}
<g transform="translate(36,0)">
<polyline points="{' '.join(pts)}" fill="none" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/>
</g>
{cal}
<text x="{W_MM*PX-6}" y="14" text-anchor="end" font-family="Arial, sans-serif" font-size="12" fill="#333">{label} · 25 mm/s · 10 mm/mV</text>
</svg>'''
    out = os.path.join(os.path.dirname(__file__), '../../public/images/ecg', fname)
    open(out, 'w').write(svg)
    print('wrote', fname)

strip(beat_wpw, 0.80, 'Lead II', 'wpw-lead-ii.svg', 'Schematic lead II ECG: sinus rhythm with short PR interval, delta wave and broad QRS')
strip(beat_hyperk, 0.80, 'Lead II', 'hyperkalaemia-lead-ii.svg', 'Schematic lead II ECG: flattened P waves, broad QRS and tall peaked T waves')
