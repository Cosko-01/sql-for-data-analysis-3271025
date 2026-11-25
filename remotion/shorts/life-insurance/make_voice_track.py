# Places each voice beat at the start of its scene (+0.15 s) and writes voice/voice.wav. usage: python make_voice_track.py
import json, numpy as np, soundfile as sf
d = json.load(open("voice/durations.json")); names = list(d["seconds"]); sr = d["sr"]
timing = [round(v + 0.5, 2) for v in d["seconds"].values()]
total = int((sum(timing) + 0.5) * sr); out = np.zeros(total, dtype="float32"); at = 0.0
for n, t in zip(names, timing):
    a, _ = sf.read(f"voice/{n}.wav", dtype="float32"); i = int((at + 0.15) * sr); out[i:i + len(a)] += a; at += t
out /= max(1.0, float(np.abs(out).max()) / 0.95)
sf.write("voice/voice.wav", out, sr); print("voice.wav", round(len(out) / sr, 2), "s")
