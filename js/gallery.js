// ============================================================
// gallery.js - the Polaroid grid and the lightbox (big photo viewer).
// The list of photos lives in photos.js. Nothing to edit here.
// ============================================================

import { PHOTOS, IMAGE_FOLDER } from "./photos.js";

const TILTS = [-2.2, 1.6, -1, 2.4, -0.5, 1.2, -1.8, 0.8]; // degrees, repeated down the grid

// ---------- Helpers ----------

function normalizePhoto(photo, index) {
  const caption = (photo.caption ?? "").trim();
  return {
    file: photo.file,
    alt: (photo.alt ?? "").trim() || caption || `Photo ${index + 1}`,
    caption,
    date: (photo.date ?? "").trim(),
    note: (photo.note ?? "").trim(),
  };
}

// Where to look for a photo. Photos can live in any of these places inside IMAGE_FOLDER:
//   thumbs/  small copies (used in the grid)    full/  big copies (used in the viewer)
//   or directly in IMAGE_FOLDER itself (one simple folder, no thumbs/full).
const encode = (file) => encodeURIComponent(file);
const thumbUrl = (file) => `${IMAGE_FOLDER}thumbs/${encode(file)}`;
const fullUrl = (file) => `${IMAGE_FOLDER}full/${encode(file)}`;
const flatUrl = (file) => `${IMAGE_FOLDER}${encode(file)}`;

// The first address that works wins. The grid prefers small copies, the viewer big ones.
const gridSources = (file) => [thumbUrl(file), flatUrl(file), fullUrl(file)];
const viewerSources = (file) => [fullUrl(file), flatUrl(file), thumbUrl(file)];

/** A lavender square shown when a photo file can't be found. */
function placeholderUrl(file) {
  const label = String(file).replace(/[<>&"']/g, "");
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">` +
    `<rect width="400" height="400" fill="#F3EAFF"/>` +
    `<rect x="14" y="14" width="372" height="372" rx="10" fill="none" stroke="#C4A1E8" stroke-width="3" stroke-dasharray="10 8"/>` +
    `<text x="200" y="190" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#6A4F8A">Photo not added yet</text>` +
    `<text x="200" y="228" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#6A4F8A">${label}</text>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** Try each URL in turn; if all fail, show the placeholder instead of a broken image. */
function loadImage(img, urls, photo) {
  let attempt = 0;
  const tryNext = () => {
    if (attempt < urls.length) {
      img.src = urls[attempt++];
    } else {
      img.onerror = null;
      img.src = placeholderUrl(photo.file);
      console.warn(`Photo not found: "${photo.file}". Check the file name and the IMAGE_FOLDER in js/photos.js.`);
    }
  };
  img.onerror = tryNext;
  tryNext();
}

// ---------- The grid ----------

function buildGrid(listElement, photos, onOpen) {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo, index) => {
    const item = document.createElement("li");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "polaroid";
    button.style.setProperty("--tilt", `${TILTS[index % TILTS.length]}deg`);
    button.setAttribute("aria-label", `Open photo ${index + 1} of ${photos.length}: ${photo.alt}`);

    const img = document.createElement("img");
    img.className = "polaroid__photo";
    img.alt = ""; // the button already carries the description
    img.width = 480;
    img.height = 480;
    img.loading = "lazy";   // only load photos as they scroll into view
    img.decoding = "async";
    loadImage(img, gridSources(photo.file), photo);
    button.appendChild(img);

    if (photo.caption || photo.date) {
      const caption = document.createElement("span");
      caption.className = "polaroid__caption";
      caption.textContent = photo.caption;
      button.appendChild(caption);
      if (photo.date) {
        const date = document.createElement("span");
        date.className = "polaroid__date";
        date.textContent = photo.date;
        button.appendChild(date);
      }
    } else {
      const spacer = document.createElement("span");
      spacer.className = "polaroid__caption";
      spacer.setAttribute("aria-hidden", "true");
      button.appendChild(spacer);
    }

    button.addEventListener("click", () => onOpen(index, button));
    item.appendChild(button);
    fragment.appendChild(item);
  });

  listElement.replaceChildren(fragment);
}

// ---------- The lightbox ----------

function setupLightbox(photos) {
  const dialog = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  const count = document.getElementById("lightbox-count");
  const prevButton = document.getElementById("lightbox-prev");
  const nextButton = document.getElementById("lightbox-next");
  const closeButton = dialog.querySelector(".lightbox__close");
  const figure = dialog.querySelector(".lightbox__figure");

  let current = 0;
  let opener = null;

  function preload(index) {
    const photo = photos[(index + photos.length) % photos.length];
    const preloader = new Image();
    loadImage(preloader, viewerSources(photo.file), photo);
  }

  function show(index) {
    current = (index + photos.length) % photos.length;
    const photo = photos[current];

    img.alt = photo.alt;
    loadImage(img, viewerSources(photo.file), photo);

    caption.replaceChildren();
    if (photo.caption) {
      const text = document.createElement("span");
      text.className = "lightbox__caption-text";
      text.textContent = photo.caption;
      caption.appendChild(text);
    }
    if (photo.date) {
      const date = document.createElement("span");
      date.className = "lightbox__caption-date";
      date.textContent = photo.date;
      caption.appendChild(date);
    }
    if (photo.note) {
      const note = document.createElement("span");
      note.className = "lightbox__caption-note";
      note.textContent = photo.note;
      caption.appendChild(note);
    }

    count.textContent = `${current + 1} of ${photos.length}`;
    if (photos.length > 1) {
      preload(current + 1);
      preload(current - 1);
    }
  }

  function open(index, openerButton) {
    opener = openerButton;
    show(index);
    dialog.showModal(); // native dialog: traps focus, Escape closes it
    document.documentElement.classList.add("no-scroll");
    closeButton.focus();
  }

  const hasSeveral = photos.length > 1;
  prevButton.hidden = !hasSeveral;
  nextButton.hidden = !hasSeveral;

  prevButton.addEventListener("click", () => show(current - 1));
  nextButton.addEventListener("click", () => show(current + 1));
  closeButton.addEventListener("click", () => dialog.close());

  // Arrow keys move between photos (Escape is handled by the dialog itself).
  dialog.addEventListener("keydown", (event) => {
    if (!hasSeveral) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); show(current - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); show(current + 1); }
  });

  // Click on the dark area around the photo closes it.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  // Swipe left or right on a phone.
  let startX = 0;
  let startY = 0;
  figure.addEventListener("pointerdown", (event) => { startX = event.clientX; startY = event.clientY; });
  figure.addEventListener("pointerup", (event) => {
    if (!hasSeveral) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1));
  });

  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("no-scroll");
    if (opener) opener.focus({ preventScroll: true });
  });

  return open;
}

// ---------- Start ----------

export function initGallery() {
  const list = document.getElementById("gallery");
  const photos = PHOTOS.map(normalizePhoto);

  if (photos.length === 0) {
    const empty = document.createElement("li");
    empty.className = "gallery__empty";
    empty.textContent = "No photos have been added yet.";
    list.replaceChildren(empty);
    return;
  }

  const open = setupLightbox(photos);
  buildGrid(list, photos, open);
}