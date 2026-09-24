#!/usr/bin/env python3
"""Generate og-card.png, the Open Graph / Twitter social card for this deck.

Colours and type mirror .title-slide in style.css.

Libertinus Serif is not a system font, so SVG renderers that only see
installed fonts silently fall back to sans-serif. This draws the card with
Pillow instead, pointing at the font files directly.

    pip install pillow
    curl -sLo /tmp/l.zip https://github.com/alerque/libertinus/releases/download/v7.051/Libertinus-7.051.zip
    unzip -q -d /tmp /tmp/l.zip
    LIBERTINUS_DIR=/tmp/Libertinus-7.051/static/OTF python3 og-card.py
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (255, 255, 248)
FG = (0, 0, 0)
MUTED = (102, 102, 102)

FONT_DIR = os.environ.get("LIBERTINUS_DIR", "")

LINES = [
    # (text, file, size, colour, baseline y)
    ("A Robust Measure of Collective Power", "LibertinusSerif-Bold.otf", 62, FG, 252),
    ("Measuring what agents can achieve, alone and together,", "LibertinusSerif-Regular.otf", 28, FG, 316),
    ("and failure modes from using it as an objective", "LibertinusSerif-Regular.otf", 28, FG, 354),
    ("Jaime Ruiz Serra", "LibertinusSerif-Semibold.otf", 25, FG, 462),
    ("PIBBSS Fellowship Project · September 2026", "LibertinusSerif-Regular.otf", 21, MUTED, 502),
]


def load(name, size):
    path = os.path.join(FONT_DIR, name)
    if not os.path.isfile(path):
        sys.exit(f"Font not found: {path}\nSet LIBERTINUS_DIR (see the docstring).")
    return ImageFont.truetype(path, size)


def main():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    for text, font_file, size, colour, y in LINES:
        d.text((W // 2, y), text, font=load(font_file, size), fill=colour, anchor="ms")
    d.line([(450, 410), (750, 410)], fill=FG, width=1)
    img.save(os.path.join(os.path.dirname(os.path.abspath(__file__)), "og-card.png"))


if __name__ == "__main__":
    main()
