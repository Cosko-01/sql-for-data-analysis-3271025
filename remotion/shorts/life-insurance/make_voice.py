# Synthesizes the voice-over beat by beat with Kokoro (local ONNX TTS). usage: python make_voice.py <model.onnx> <voices.bin> [voice]
import json, sys, soundfile as sf
from kokoro_onnx import Kokoro
model, voices = sys.argv[1], sys.argv[2]
voice = sys.argv[3] if len(sys.argv) > 3 else "am_michael"
SPEED = float(sys.argv[4]) if len(sys.argv) > 4 else 1.0
BEATS = [
 ("hook", "Rich people borrow millions, often pay no income tax on it, and one of their favorite tools is life insurance."),
 ("setting", "Meet Mr. Gold. He pours huge premiums into a permanent life policy. Inside it, a pot of cash value grows, and the taxman looks away."),
 ("action1", "When Mr. Gold needs cash, he does not sell his shares, because selling means a tax bill. He borrows from the policy instead."),
 ("action2", "A policy loan is not income, so no tax. No credit check. No payment schedule. The insurer just adds interest to the balance."),
 ("action3", "Some go even bigger. They borrow from a bank to pay the premiums, and the policy itself is the collateral. Debt, funding more shelter."),
 ("snap", "But it only works while the policy stays alive. Let the loan outgrow the pot, and the policy collapses, and years of hidden gains hit as taxable income, all at once."),
 ("deadpan", "Luckily, Mr. Gold has advisers. Unluckily, the advisers get commissions."),
 ("explanation", "Think of a pawn shop that never taxes you. Mr. Gold pawns his own piggy bank, again and again, and never sells a thing. When he dies, the payout clears the debt, tax-free, and the rest goes to his heirs. Put the policy in a trust, and it can sit outside his taxable estate."),
 ("consequence", "It is legal, but it was built for people who can feed premiums for decades. Fees are heavy, and early on there is almost nothing to borrow."),
 ("twist", "Mr. Gold never sold a single share. His taxman is still waiting."),
]
k = Kokoro(model, voices)
out = {}
for name, text in BEATS:
    audio, sr = k.create(text, voice=voice, speed=SPEED, lang="en-us")
    sf.write(f"voice/{name}.wav", audio, sr)
    out[name] = round(len(audio) / sr, 3)
    print(name, out[name])
json.dump({"voice": voice, "sr": sr, "seconds": out}, open("voice/durations.json", "w"), indent=1)
