// ============================================================
// response.js - the final question, the optional message, and the
// email notification (through EmailJS).
//
// How it works: when she presses "Submit Response", the browser asks
// EmailJS to send YOUR email template to the address saved in your EmailJS
// dashboard. The recipient is never typed or chosen in this code.
// Nothing secret is in this file: the public key is meant to be visible.
// ============================================================

import { CONFIG } from "./config.js";

// Pinned to an exact, older version on purpose (newer releases are not trusted until they have aged).
const EMAILJS_SDK_URL = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4.4.1/dist/email.min.js";
const SEND_TIMEOUT_MS = 15000;
const MAX_MESSAGE_LENGTH = 2000;
const NO_MESSAGE_TEXT = "(She chose not to write a message.)";

// The two answers: button text, the word that goes in the email, and the message she sees.
const CHOICES = {
  yes: {
    label: "Yes, let's try again.",
    emailValue: "Yes",
    message:
      "Thank you for being willing to consider another beginning. I know that choosing to try again doesn't erase the past. I want to show you through my actions that I take this chance seriously.",
  },
  no: {
    label: "No, I don't want to.",
    emailValue: "No",
    message:
      "Thank you for being honest with me and for taking the time to read this. I respect your decision, and I sincerely wish you peace and happiness.",
  },
};

// ---------- Helpers ----------

function isConfigured() {
  const { publicKey, serviceId, templateId } = CONFIG.emailjs;
  return [publicKey, serviceId, templateId].every(
    (value) => typeof value === "string" && value.trim() !== "" && !value.startsWith("YOUR_")
  );
}

/** One id per visit. If she retries after an error, the email shows the same id, so you can spot duplicates. */
function createSubmissionId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID().slice(0, 8);
  return Math.random().toString(36).slice(2, 10);
}

function formatSubmittedAt(date) {
  const readable = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeStyle: "short" }).format(date);
  const zone = new Intl.DateTimeFormat().resolvedOptions().timeZone || "local time";
  return `${readable} (${zone}) | UTC ${date.toISOString()}`;
}

let sdkPromise = null;

/** Loads the EmailJS script once. If loading fails, the next try starts fresh. */
function loadEmailJs() {
  if (window.emailjs) return Promise.resolve(window.emailjs);
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = EMAILJS_SDK_URL;
    script.async = true;
    script.onload = () => {
      if (!window.emailjs) {
        sdkPromise = null;
        reject(new Error("EmailJS loaded but is not available"));
        return;
      }
      window.emailjs.init({
        publicKey: CONFIG.emailjs.publicKey,
        blockHeadless: true, // refuse simple automated browsers
      });
      resolve(window.emailjs);
    };
    script.onerror = () => {
      sdkPromise = null;
      script.remove();
      reject(new Error("The EmailJS script could not be loaded"));
    };
    document.head.appendChild(script);
  });
  return sdkPromise;
}

function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = window.setTimeout(() => reject({ status: 0, text: "timeout" }), ms);
  });
  return Promise.race([promise, timeout]).finally(() => window.clearTimeout(timer));
}

/** Turns any failure into a calm, useful sentence for her. Technical details go to the console. */
function describeFailure(error, failureCount) {
  console.error("Sending the response failed:", error);

  const status = typeof error === "object" && error !== null ? error.status : undefined;
  let message;

  if (status === 429) {
    message = "That was a little too quick. Please wait a few seconds and try again.";
  } else if (status === 0 && error.text === "timeout") {
    message = "This is taking longer than expected. Please try again.";
  } else if (status === 451) {
    message = "Your browser blocked sending this. Please try again in a regular browser window.";
  } else if (status === 400 || status === 401 || status === 403 || status === 404 || typeof error === "string") {
    message = "The sending service did not accept this right now. Please try again in a little while.";
  } else if (typeof status === "number" && status >= 500) {
    message = "The sending service is having trouble. Please try again in a little while.";
  } else {
    message = "I could not send your response. Please check your internet connection and try again.";
  }

  message += " Nothing you wrote has been lost.";
  if (CONFIG.debug) {
    const detail = typeof error === "string" ? error : `${status ?? "?"} ${error?.text ?? error?.message ?? ""}`;
    message += ` [Testing detail: ${detail.trim()}]`;
  }
  if (failureCount >= 2) message += " If it keeps failing, you could also tell me directly.";
  return message;
}

// ---------- The page ----------

export function initResponse() {
  const choiceButtons = [...document.querySelectorAll("[data-choice]")];
  const choiceGroup = document.getElementById("choices");
  const panel = document.getElementById("response-panel");
  const choiceMessage = document.getElementById("choice-message");
  const form = document.getElementById("response-form");
  const selectedChoice = document.getElementById("selected-choice");
  const textarea = document.getElementById("response-text");
  const honeypot = document.getElementById("response-website");
  const feedback = document.getElementById("response-feedback");
  const submitButton = document.getElementById("response-submit");
  const sentNote = document.getElementById("response-sent");

  const submissionId = createSubmissionId();
  let chosen = null;      // "yes" | "no" | null
  let isSending = false;
  let hasSent = false;
  let failureCount = 0;

  function setFeedback(text, kind) {
    feedback.textContent = text;
    feedback.classList.toggle("is-error", kind === "error");
  }

  function setSending(sending) {
    isSending = sending;
    submitButton.disabled = sending;
    submitButton.textContent = sending ? "Sending..." : "Submit Response";
    textarea.readOnly = sending;
    choiceButtons.forEach((button) => { button.disabled = sending; });
    form.setAttribute("aria-busy", String(sending));
  }

  function choose(key) {
    if (isSending || hasSent) return;
    chosen = key;

    choiceButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.choice === key));
    });

    selectedChoice.textContent = CHOICES[key].label;
    setFeedback("", null);

    const firstTime = panel.hidden;
    panel.hidden = false;
    choiceMessage.textContent = CHOICES[key].message;
    if (firstTime) panel.classList.add("is-revealed");
  }

  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => choose(button.dataset.choice));
  });

  function showSent() {
    hasSent = true;
    form.hidden = true;
    choiceGroup.hidden = true;
    sentNote.hidden = false;
    sentNote.focus(); // the submit button just disappeared, so keep keyboard focus somewhere sensible
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (isSending || hasSent) return;

    if (!chosen) {
      setFeedback("Please choose Yes or No first.", "error");
      return;
    }

    const message = textarea.value.trim();
    if (message.length > MAX_MESSAGE_LENGTH) {
      setFeedback(`Your message is a little long. Please keep it under ${MAX_MESSAGE_LENGTH} characters.`, "error");
      textarea.focus();
      return;
    }

    // Hidden trap field: people never see it, simple bots fill it in.
    if (honeypot.value !== "") {
      console.warn("Honeypot field was filled in; nothing was sent.");
      showSent();
      return;
    }

    if (!isConfigured()) {
      console.error("EmailJS is not configured. Fill in CONFIG.emailjs in js/config.js.");
      setFeedback("The response service has not been set up yet, so nothing was sent. Please try again later.", "error");
      return;
    }

    if (navigator.onLine === false) {
      setFeedback("You seem to be offline. Please reconnect and try again.", "error");
      return;
    }

    setSending(true);
    setFeedback("Sending your response...", null);

    try {
      const emailjs = await loadEmailJs();
      // These names must match the {{variables}} in your EmailJS template.
      const templateParams = {
        choice: CHOICES[chosen].emailValue,
        message: message || NO_MESSAGE_TEXT,
        submitted_at: formatSubmittedAt(new Date()),
        submission_id: submissionId,
      };
      const response = await withTimeout(
        emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, templateParams),
        SEND_TIMEOUT_MS
      );
      if (response.status !== 200) throw response;

      setSending(false);
      showSent(); // only reached after EmailJS confirmed the send
    } catch (error) {
      failureCount += 1;
      setSending(false);
      setFeedback(describeFailure(error, failureCount), "error");
    }
  });

  /** Called when the last page opens, so the email script is ready before she presses Submit. */
  function prepare() {
    if (!isConfigured()) return;
    loadEmailJs().catch((error) => console.warn("Could not pre-load EmailJS:", error));
  }

  return { prepare };
}