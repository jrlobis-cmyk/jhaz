"""
check_photos.py - checks your photo list BEFORE you upload the website.

It makes sure every photo named in js/photos.js really exists, with the exact
same capital and small letters (GitHub Pages cares about that, your computer
may not), and warns about files that are too big for a phone.

HOW TO RUN (from the jazlee-website folder):
    python tools/check_photos.py
    (On some computers the command is  python3)
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BIG_FILE_MB = 1.5
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


def exact_names(folder: Path) -> set:
    """Real file names in a folder, exactly as stored (case-sensitive)."""
    return {p.name for p in folder.iterdir() if p.is_file()} if folder.is_dir() else set()


def main() -> None:
    photos_js = ROOT / "js" / "photos.js"
    if not photos_js.exists():
        sys.exit("Could not find js/photos.js. Run this from the jazlee-website folder.")

    lines = [l for l in photos_js.read_text(encoding="utf-8").splitlines() if not l.strip().startswith("//")]
    text = "\n".join(lines)

    folder_match = re.search(r'IMAGE_FOLDER\s*=\s*"([^"]*)"', text)
    folder = ROOT / (folder_match.group(1) if folder_match else "assets/images/")
    listed = re.findall(r'file:\s*"([^"]+)"', text)

    flat = exact_names(folder)
    thumbs = exact_names(folder / "thumbs")
    full = exact_names(folder / "full")

    problems, warnings = [], []

    seen = set()
    for name in listed:
        if name in seen:
            warnings.append(f"Listed twice: {name}")
        seen.add(name)

        if name not in flat and name not in thumbs and name not in full:
            lower = name.lower()
            near = [n for n in flat | thumbs | full if n.lower() == lower]
            hint = f' (a file named "{near[0]}" exists, so the capital letters differ)' if near else ""
            problems.append(f"Missing file: {name}{hint}")
            continue

        if name not in thumbs and name in flat:
            size_mb = (folder / name).stat().st_size / (1024 * 1024)
            if size_mb > BIG_FILE_MB:
                warnings.append(f"Big file with no small copy ({size_mb:.1f} MB): {name}")

    unlisted = sorted(n for n in flat if Path(n).suffix.lower() in EXTENSIONS and n not in seen)

    print(f"Photo folder: {folder.relative_to(ROOT)}")
    print(f"Photos listed in photos.js: {len(listed)}")
    print(f"Small copies found (thumbs/): {len(thumbs)}   Full-size copies found (full/): {len(full)}")

    if unlisted:
        print(f"\nPhotos in the folder that are NOT in photos.js ({len(unlisted)}):")
        for n in unlisted[:15]:
            print("  -", n)
        if len(unlisted) > 15:
            print(f"  ... and {len(unlisted) - 15} more")

    big_flat = [n for n in flat if Path(n).suffix.lower() in EXTENSIONS]
    if big_flat and not thumbs:
        warnings.append("No thumbs/ folder yet. Run:  python tools/make_thumbnails.py  to make the site much faster.")

    if warnings:
        print(f"\nWarnings ({len(warnings)}):")
        for w in warnings[:25]:
            print("  !", w)
        if len(warnings) > 25:
            print(f"  ... and {len(warnings) - 25} more")

    if problems:
        print(f"\nPROBLEMS ({len(problems)}) - fix these before uploading:")
        for p in problems:
            print("  X", p)
        sys.exit(1)

    print("\nOK: every photo in photos.js was found.")


if __name__ == "__main__":
    main()
