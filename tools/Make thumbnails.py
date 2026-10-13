"""
make_thumbnails.py - makes small, fast copies of your photos.

Phone photos are often 3-8 MB each. With 90+ photos that makes the site slow,
especially on mobile data. This script creates, for every photo in PHOTOS/:

    PHOTOS/thumbs/<same name>   480 x 480 square crop   (used in the grid)
    PHOTOS/full/<same name>     longest side 1600 px    (used in the big viewer)

Your original files are NOT changed or deleted.

HOW TO RUN (from the jazlee-website folder, in a terminal):
    pip install pillow
    python tools/make_thumbnails.py

    (On some computers the commands are  pip3  and  python3.)
Optional: use another folder name:  python tools/make_thumbnails.py MyFolder
"""

import sys
from pathlib import Path

from PIL import Image, ImageOps

THUMB_SIZE = 480
FULL_MAX_SIDE = 1600
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


def main() -> None:
    folder = Path(sys.argv[1] if len(sys.argv) > 1 else "PHOTOS")
    if not folder.is_dir():
        sys.exit(f'Folder "{folder}" not found. Run this from the jazlee-website folder.')

    thumbs_dir = folder / "thumbs"
    full_dir = folder / "full"
    thumbs_dir.mkdir(exist_ok=True)
    full_dir.mkdir(exist_ok=True)

    photos = sorted(p for p in folder.iterdir() if p.is_file() and p.suffix.lower() in EXTENSIONS)
    if not photos:
        sys.exit(f'No photos found directly inside "{folder}".')

    done = 0
    for photo in photos:
        try:
            with Image.open(photo) as image:
                image = ImageOps.exif_transpose(image)  # keeps phone photos the right way up
                if image.mode not in ("RGB", "L"):
                    image = image.convert("RGB")

                thumb = ImageOps.fit(image, (THUMB_SIZE, THUMB_SIZE), Image.LANCZOS)
                thumb.save(thumbs_dir / photo.name, quality=80, optimize=True)

                big = image.copy()
                big.thumbnail((FULL_MAX_SIDE, FULL_MAX_SIDE), Image.LANCZOS)
                big.save(full_dir / photo.name, quality=82, optimize=True)
            done += 1
        except Exception as error:  # one bad file should not stop the rest
            print(f"Skipped {photo.name}: {error}")

    print(f"Done. Made {done} thumbnails and {done} full-size copies in {folder}/")
    print("Tip: move the original big files out of the website folder before uploading to GitHub.")


if __name__ == "__main__":
    main()