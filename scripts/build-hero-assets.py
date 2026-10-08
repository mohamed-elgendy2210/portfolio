#!/usr/bin/env python3
"""Build the seamless looping hero clip, portrait still and OG image.

Usage:  python3 scripts/build-hero-assets.py [intro.mp4] [portrait.jpg]
Needs:  ffmpeg (libx264, libvpx-vp9, libopus), numpy, Pillow.
Optional env overrides for the crop: CROP_X, CROP_W, CROP_H.
"""
import os, subprocess, sys, tempfile, wave
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "intro.mp4")
PHOTO = sys.argv[2] if len(sys.argv) > 2 else os.path.join(ROOT, "portrait-bust.jpg")
PUB = os.path.join(ROOT, "public")
OUT = os.path.join(PUB, "hero")
OUT_W, OUT_H = 768, 960   # 4:5, matches the CSS aspect-ratio 768/960
XF = 0.5                  # cross-fade length in seconds
FPS = 24
SR = 48000
os.makedirs(OUT, exist_ok=True)


def run(cmd):
    r = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True)
    if r.returncode:
        sys.exit(r.stderr)


def ffprobe(*args):
    return subprocess.run(["ffprobe", "-v", "error", *args, SRC], capture_output=True, text=True, check=True).stdout.strip()


W, H = [int(v) for v in ffprobe("-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0:s=x").split("x")]
DUR = min(float(ffprobe("-show_entries", "format=duration", "-of", "csv=p=0")), 10.0)
DUR = int(DUR * FPS) / FPS  # snap to whole frames


def detect():
    """Bounding box of the person (pixels that differ from the backdrop)."""
    sw = 336
    sh = int(sw * H / W)
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", SRC, "-t", str(DUR), "-vf", f"fps=4,scale={sw}:{sh},format=gray",
                          "-f", "rawvideo", "-"], capture_output=True, check=True).stdout
    fr = np.frombuffer(raw, np.uint8).reshape(-1, sh, sw).astype(float)
    bg = float(np.median(fr[:, :12, :12]))
    mask = np.abs(fr - bg) > 25
    cols = np.where(mask.any(axis=(0, 1)))[0]
    rows = np.where(mask.any(axis=(0, 2)))[0]
    k = W / sw
    return cols.min() * k, (cols.max() + 1) * k, rows.min() * k, (rows.max() + 1) * k, bg


x0, x1, y0, y1, bg = detect()
ch = int(os.environ.get("CROP_H", min(H, (y1 - y0) * 1.06)))
cw = int(os.environ.get("CROP_W", min(W, ch * OUT_W / OUT_H)))
ch -= ch % 2
cw -= cw % 2
cx = int(os.environ.get("CROP_X", max(0, min(W - cw, (x0 + x1) / 2 - cw / 2))))
cy = int(max(0, min(H - ch, (y0 + y1) / 2 - ch / 2)))
lvl = round(max(0.5, bg / 255 - 0.04), 3)  # a little below the backdrop so compression noise clamps to pure white
print(f"person x:{x0:.0f}-{x1:.0f} y:{y0:.0f}-{y1:.0f} -> crop={cw}:{ch}:{cx}:{cy} white-level={lvl}")

# ---- audio: sample-accurate equal-power cross-fade (numpy) -------------------
tmp = tempfile.mkdtemp()
wav_in, wav_out = os.path.join(tmp, "in.wav"), os.path.join(tmp, "out.wav")
run(["ffmpeg", "-y", "-i", SRC, "-t", str(DUR), "-vn", "-ac", "1", "-ar", str(SR), "-c:a", "pcm_s16le", wav_in])
with wave.open(wav_in) as w:
    a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float64)
n_x = int(XF * SR)
a = np.pad(a, (0, max(0, int(round(DUR * SR)) - len(a))))[: int(round(DUR * SR))]
head, body = a[:n_x].copy(), a[n_x:].copy()          # body = [XF, DUR)  head = [0, XF)
t = np.linspace(0, np.pi / 2, n_x)
body[-n_x:] = body[-n_x:] * np.cos(t) + head * np.sin(t)  # the tail melts into the head
with wave.open(wav_out, "wb") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(np.clip(body, -32768, 32767).astype(np.int16).tobytes())

# ---- video: same structure with ffmpeg xfade ---------------------------------
vf = (f"[0:v]trim=0:{DUR},setpts=PTS-STARTPTS,crop={cw}:{ch}:{cx}:{cy},scale={OUT_W}:{OUT_H}:flags=lanczos,"
      f"colorlevels=rimax={lvl}:gimax={lvl}:bimax={lvl},fps={FPS},format=yuv420p,split=2[a][b];"
      f"[a]trim=start={XF}:end={DUR},setpts=PTS-STARTPTS[B];"
      f"[b]trim=start=0:end={XF},setpts=PTS-STARTPTS[H];"
      f"[B][H]xfade=transition=fade:duration={XF}:offset={DUR - 2 * XF}[v]")
common = ["ffmpeg", "-y", "-v", "error", "-i", SRC, "-i", wav_out, "-filter_complex", vf, "-map", "[v]", "-map", "1:a", "-shortest"]
run(common + ["-c:v", "libx264", "-crf", "24", "-preset", "slow", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k",
              "-movflags", "+faststart", os.path.join(OUT, "hero.mp4")])
run(common + ["-c:v", "libvpx-vp9", "-crf", "32", "-b:v", "0", "-row-mt", "1", "-pix_fmt", "yuv420p", "-c:a", "libopus",
              "-b:a", "80k", os.path.join(OUT, "hero.webm")])

# ---- portrait still + OG image ----------------------------------------------
if os.path.exists(PHOTO):
    im = Image.open(PHOTO).convert("RGB")
    iw, ih = im.size
    th, tw = ih, int(ih * 0.8)
    if tw > iw:
        tw, th = iw, int(iw / 0.8)
    left = (iw - tw) // 2
    bust = im.crop((left, 0, left + tw, th)).resize((480, 600), Image.LANCZOS)
    bust.save(os.path.join(PUB, "portrait-bust.webp"), quality=84, method=6)
    og = Image.new("RGB", (1200, 630), (244, 242, 238))
    og.paste(bust.resize((420, 525)), (720, 52))
    d = ImageDraw.Draw(og)
    try:
        f1 = ImageFont.truetype("DejaVuSans-Bold.ttf", 72)
        f2 = ImageFont.truetype("DejaVuSans.ttf", 34)
    except OSError:
        f1 = f2 = ImageFont.load_default()
    d.text((70, 230), "Mohamed Elgendy", fill=(13, 13, 13), font=f1)
    d.text((70, 330), "Frontend Developer", fill=(119, 117, 111), font=f2)
    og.save(os.path.join(PUB, "og.jpg"), quality=88)
print("done ->", OUT)
