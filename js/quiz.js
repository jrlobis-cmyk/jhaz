// ============================================================
// quiz.js - the five-question verification quiz.
// NOTE: the answers below are visible to anyone who views the page
// source. This is a playful quiz, not real security.
// ============================================================

import { CONFIG } from "./config.js";

// ---------- Quiz data: edit questions, accepted answers and hints here ----------
// `answers` lists every spelling you want to accept. Capitals, extra spaces,
// punctuation and "&" vs "and" are handled automatically (see normalizeAnswer).
// Hints appear one by one after wrong answers; the last one repeats.
export const QUESTIONS = [
  {
    id: "date",
    type: "day",
    prompt: "Complete the date of our special day.",
    day: CONFIG.specialDate.day,
    hints: [
      "It's the day of the month, so a number from 1 to 31.",
      "Take a breath and picture the calendar. It's a day that belongs to the two of us.",
    ],
  },
  {
    id: "snack",
    type: "text",
    prompt: "What were our favorite snacks to eat on our dates?",
    answers: ["french fries", "fries", "french fry"],
    hints: [
      "Think golden and salty.",
      "It's made from potatoes, and it's good for sharing.",
    ],
  },
  {
    id: "ulam",
    type: "text",
    prompt: "What is my favorite ulam?",
    answers: ["chicken curry", "curry chicken"],
    hints: [
      "It's a warm, saucy dish with chicken in it.",
      "The sauce is full of spices.",
    ],
  },
  {
    id: "color",
    type: "text",
    prompt: "What is my favorite color?",
    answers: ["cyan"],
    hints: [
      "It's a cool color.",
      "Look somewhere between green and blue.",
    ],
  },
  {
    id: "milktea",
    type: "text",
    prompt: "What is my favorite milktea flavor?",
    answers: ["cookies and cream", "cookies n cream", "cookie and cream", "cookies cream"],
    hints: [
      "It sounds like a dessert.",
      "It's a flavor made of two things that go perfectly together.",
    ],
  },
];

// ---------- Answer checking (pure functions, easy to test) ----------

/** Lowercase, trim, turn "&" into "and", drop punctuation, ignore "milk tea"/"flavor". */
export function normalizeAnswer(raw) {
  return String(raw)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['\u2019`]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\b(milk\s+tea|flavou?r)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** True if `raw` is an accepted answer for `question`. */
export function isCorrect(question, raw) {
  if (question.type === "day") {
    // Accepts "14", "014" and "14th" - nothing else.
    const match = /^0?(\d{1,2})(?:th)?$/i.exec(String(raw).trim());
    return match !== null && Number(match[1]) === question.day;
  }
  const given = normalizeAnswer(raw);
  return given !== "" && question.answers.some((answer) => normalizeAnswer(answer) === given);
}

// ---------- Building and running the quiz on the page ----------

function buildCard(question, index, total) {
  const form = document.createElement("form");
  form.className = "note-card";
  form.noValidate = true;
  form.dataset.question = question.id;

  const count = `<p class="note-card__count">Question ${index + 1} of ${total}</p>`;
  const feedback = `<p id="feedback-${question.id}" class="note-card__feedback" role="status"></p>`;
  const button = `<button type="submit" class="btn btn--small">Check</button>`;

  if (question.type === "day") {
    const { month, year } = CONFIG.specialDate;
    form.innerHTML = `
      ${count}
      <p id="prompt-${question.id}" class="note-card__prompt">${question.prompt}</p>
      <div class="note-card__row">
        <div class="date-line">
          <span aria-hidden="true">${month}</span><span aria-hidden="true">/</span>
          <input id="answer-${question.id}" class="field field--day" type="text"
                 inputmode="numeric" maxlength="3" autocomplete="off"
                 aria-labelledby="prompt-${question.id}" aria-describedby="feedback-${question.id}"
                 placeholder="__">
          <span aria-hidden="true">/</span><span aria-hidden="true">${year}</span>
        </div>
        ${button}
      </div>
      ${feedback}`;
  } else {
    form.innerHTML = `
      ${count}
      <label class="note-card__prompt" for="answer-${question.id}">${question.prompt}</label>
      <div class="note-card__row">
        <input id="answer-${question.id}" class="field" type="text" autocomplete="off"
               autocapitalize="off" spellcheck="false" aria-describedby="feedback-${question.id}"
               placeholder="Type your answer">
        ${button}
      </div>
      ${feedback}`;
  }
  return form;
}

function setFeedback(element, message, kind) {
  element.textContent = message;
  element.classList.remove("is-hint", "is-success");
  if (kind) element.classList.add(`is-${kind}`);
}

/**
 * Builds the question cards and wires up the Continue button.
 * `onComplete` runs when the visitor presses Continue after all five are right.
 */
export function initQuiz({ onComplete }) {
  const list = document.getElementById("quiz-list");
  const progressLabel = document.getElementById("quiz-progress");
  const progressBar = document.getElementById("quiz-progress-bar");
  const status = document.getElementById("quiz-status");
  const continueButton = document.getElementById("quiz-continue");

  const total = QUESTIONS.length;
  const solved = new Set();            // ids answered correctly
  const wrongAttempts = new Map();     // id -> number of wrong tries (picks the hint)

  function updateProgress() {
    progressLabel.textContent = `${solved.size} of ${total} remembered`;
    progressBar.style.setProperty("--p", String(solved.size / total));
    if (solved.size === total) {
      continueButton.disabled = false;
      status.textContent = "All five remembered. Your memories are ready.";
    }
  }

  function handleSubmit(question, form) {
    if (solved.has(question.id)) return;

    const input = form.querySelector("input");
    const feedback = form.querySelector(".note-card__feedback");

    if (input.value.trim() === "") {
      setFeedback(feedback, "Type an answer first, then press Check.", null);
      input.focus();
      return;
    }

    if (isCorrect(question, input.value)) {
      solved.add(question.id);
      form.classList.add("is-correct");
      input.readOnly = true;                       // keeps the answer on screen
      form.querySelector("button[type='submit']").hidden = true;
      setFeedback(feedback, "You remembered. \u2713", "success");
      updateProgress();
      return;
    }

    const tries = (wrongAttempts.get(question.id) ?? 0) + 1;
    wrongAttempts.set(question.id, tries);
    const hint = question.hints[Math.min(tries - 1, question.hints.length - 1)];
    setFeedback(feedback, `Not quite. Here's a little nudge: ${hint}`, "hint");
    input.select();
  }

  QUESTIONS.forEach((question, index) => {
    const card = buildCard(question, index, total);
    card.addEventListener("submit", (event) => {
      event.preventDefault();
      handleSubmit(question, card);
    });
    list.appendChild(card);
  });

  continueButton.addEventListener("click", () => {
    if (solved.size !== total) return; // guard even if the button is re-enabled in dev tools
    onComplete();
  });

  updateProgress();
}
