// ============================================================
// music.js - the music dock (play/pause, song name, "playing" indicator).
//
// The song plays through Spotify's official embedded player, so we never
// host or copy the audio. Browsers only allow sound after a visitor taps
// something, so nothing plays until she presses the play button.
// One embedded player lives in the page for the whole visit, so moving
// between the letter, the photos and the last page never restarts the song.
// ============================================================

import { CONFIG } from "./config.js";

const SPOTIFY_API_URL = "https://open.spotify.com/embed/iframe-api/v1";
const API_TIMEOUT_MS = 8000;      // give up waiting for Spotify after this long
const START_CHECK_MS = 3500;      // if nothing plays this long after pressing play, show help

/** Accepts a Spotify link or URI and returns the track id, or null. */
function parseTrackId(value) {
  const match = /(?:track[/:])([A-Za-z0-9]{10,})/.exec(String(value ?? ""));
  return match ? match[1] : null;
}

export function initMusic() {
  const dock = document.getElementById("music-dock");
  const toggleButton = document.getElementById("music-toggle");
  const embedToggle = document.getElementById("music-embed-toggle");
  const embedPanel = document.getElementById("music-embed");
  const statusLine = document.getElementById("music-status");
  const target = document.getElementById("spotify-embed-target");

  document.getElementById("music-title").textContent = CONFIG.music.title;
  document.getElementById("music-artist").textContent = CONFIG.music.artist;

  const trackId = parseTrackId(CONFIG.music.spotifyTrackUrl);

  let controller = null;
  let isPlaying = false;
  let apiRequested = false;
  let startTimer = null;
  let readyTimer = null;

  function setStatus(text) {
    statusLine.textContent = text;
  }

  function setEmbedOpen(open) {
    embedPanel.classList.toggle("is-tucked", !open);
    document.body.classList.toggle("dock-open", open); // leaves extra room so the open player never covers the page
    embedToggle.setAttribute("aria-expanded", String(open));
    embedToggle.setAttribute("aria-label", open ? "Hide Spotify player" : "Show Spotify player");
  }

  function render() {
    toggleButton.dataset.state = isPlaying ? "playing" : "paused";
    toggleButton.setAttribute("aria-label", isPlaying ? "Pause music" : "Play music");
    dock.classList.toggle("is-playing", isPlaying);
    if (controller) setStatus(isPlaying ? "Playing" : "Paused");
  }

  /** If Spotify's script can't load, show Spotify's normal player so she can still press play there. */
  function useFallbackPlayer(reason) {
    console.warn(`Using the plain Spotify player instead: ${reason}`);
    window.clearTimeout(readyTimer);
    const iframe = document.createElement("iframe");
    iframe.src = `https://open.spotify.com/embed/track/${trackId}`;
    iframe.width = "100%";
    iframe.height = "80";
    iframe.title = `Spotify player: ${CONFIG.music.title} by ${CONFIG.music.artist}`;
    iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
    iframe.loading = "lazy";
    target.replaceChildren(iframe);
    setStatus("Use the Spotify player below to listen");
    setEmbedOpen(true);
  }

  function onApiReady(IFrameAPI) {
    window.clearTimeout(readyTimer);
    IFrameAPI.createController(
      target,
      { uri: `spotify:track:${trackId}`, width: "100%", height: 80 },
      (embedController) => {
        controller = embedController;
        window.clearTimeout(readyTimer);
        toggleButton.disabled = false;
        setStatus("Press play when you like");
        embedController.addListener("ready", () => console.info("Spotify player is ready."));
        embedController.addListener("playback_update", (event) => {
          isPlaying = event.data.isPaused === false;
          if (isPlaying) window.clearTimeout(startTimer);
          render();
        });
      }
    );
  }

  function loadSpotifyApi() {
    if (apiRequested) return;
    apiRequested = true;

    window.onSpotifyIframeApiReady = onApiReady;
    const script = document.createElement("script");
    script.src = SPOTIFY_API_URL;
    script.async = true;
    script.onerror = () => useFallbackPlayer("Spotify's script could not be loaded");
    document.head.appendChild(script);

    readyTimer = window.setTimeout(() => {
      if (!controller) useFallbackPlayer("Spotify took too long to respond");
    }, API_TIMEOUT_MS);
  }

  toggleButton.addEventListener("click", () => {
    if (!controller) {
      // Spotify's controller is not available (still loading, or it could not load).
      setStatus("Use the Spotify player below to listen");
      setEmbedOpen(true);
      return;
    }
    try {
      controller.togglePlay(); // one call both starts and pauses, so it never restarts the song
    } catch (error) {
      console.error("Could not control the Spotify player:", error);
      setStatus("Use the Spotify player below to listen");
      setEmbedOpen(true);
      return;
    }
    // If a browser blocks sound, nothing starts. Point her to Spotify's own button.
    window.clearTimeout(startTimer);
    if (!isPlaying) {
      startTimer = window.setTimeout(() => {
        if (!isPlaying) {
          setStatus("Nothing playing? Press play in the Spotify player below");
          setEmbedOpen(true);
        }
      }, START_CHECK_MS);
    }
  });

  embedToggle.addEventListener("click", () => {
    setEmbedOpen(embedToggle.getAttribute("aria-expanded") !== "true");
  });

  function showDock() {
    if (!dock.hidden) return;
    dock.hidden = false;
    document.body.classList.add("has-dock");
    if (!trackId) {
      toggleButton.disabled = true;
      setStatus("No music has been set up yet");
      console.warn("No valid Spotify track link in js/config.js (music.spotifyTrackUrl).");
      return;
    }
    toggleButton.disabled = false;
    setStatus("Loading music...");
    loadSpotifyApi();
  }

  return { showDock };
}