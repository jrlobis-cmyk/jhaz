// ============================================================
// app.js - starts everything and moves between the stages.
// Stages are the <section data-stage="..."> blocks in index.html.
// ============================================================

import { CONFIG } from "./config.js";
import { initQuiz } from "./quiz.js";
import { initGallery } from "./gallery.js";
import { initMusic } from "./music.js";
import { initResponse } from "./response.js";

const EXIT_MS = 180; // keep in sync with --dur-exit in style.css
const STAGES_WITH_MUSIC = ["letter", "question"];

const stages = new Map(
  [...document.querySelectorAll("[data-stage]")].map((el) => [el.dataset.stage, el])
);
let activeStage = null;
let music = null;
let response = null;

/** Fade the current stage out, then fade the next one in and move focus to its heading. */
function showStage(name) {
  const next = stages.get(name);
  if (!next || next === activeStage) return;

  const previous = activeStage;
  activeStage = next;

  const reveal = () => {
    if (previous) previous.hidden = true;
    next.hidden = false;
    window.scrollTo(0, 0);
    if (music && STAGES_WITH_MUSIC.includes(name)) music.showDock();
    if (response && name === "question") response.prepare();
    // Wait one frame so the browser sees the "hidden" state before animating in.
    requestAnimationFrame(() => {
      next.classList.add("is-visible");
      const heading = next.querySelector("h1, h2");
      if (heading) heading.focus({ preventScroll: true });
    });
  };

  if (previous) {
    previous.classList.remove("is-visible");
    window.setTimeout(reveal, EXIT_MS);
  } else {
    reveal();
  }
}

function personalize() {
  document.title = `For ${CONFIG.recipientName}`;
  document.querySelectorAll("[data-recipient]").forEach((el) => {
    el.textContent = CONFIG.recipientName;
  });
}

/** Each part starts on its own, so one failing part cannot break the others. */
function safely(label, start) {
  try {
    return start();
  } catch (error) {
    console.error(`${label} failed to start:`, error);
    return null;
  }
}

function init() {
  personalize();
  if (CONFIG.debug) console.warn("Debug mode is ON (js/config.js). Turn it off before sharing the site.");

  // Any element with data-goto="stage-name" navigates to that stage.
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-goto]");
    if (trigger) showStage(trigger.dataset.goto);
  });

  safely("The quiz", () => initQuiz({ onComplete: () => showStage("letter") }));
  safely("The gallery", initGallery);
  music = safely("The music player", initMusic);
  response = safely("The response form", initResponse);

  // Turn on animations, then fade the welcome screen in.
  activeStage = stages.get("welcome");
  document.documentElement.classList.add("js-ready");
  requestAnimationFrame(() => activeStage.classList.add("is-visible"));
}

try {
  init();
} catch (error) {
  console.error("The page failed to start:", error);
}