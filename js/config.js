// ============================================================
// config.js - the one file you edit for names, dates and services.
// Nothing in here is secret. The EmailJS public key is designed
// to be visible in a website (see Phase 4 for how to protect it).
// ============================================================

export const CONFIG = {
  // Who the site is addressed to
  recipientName: "Jazlee",

  // Question 1 shows: month / ___ / year, and the answer is `day`.
  specialDate: { month: 10, day: 14, year: 2024 },

  // TESTING AID. While true, an error on the last page also shows the technical
  // reason (for example "400 The recipient address is empty"). Set it to false
  // before you send the link to Jazlee, so she never sees technical text.
  debug: false,

  // The Yes/No response form sends its email through EmailJS using these.
  emailjs: {
    publicKey: "TCNMcpyHXtZGyKyb1",
    serviceId: "service_0dxcyrj",
    templateId: "template_m85ells",
  },

  // Background music: "14" by Silent Sanctuary, played through Spotify's own player.
  // To change the song, paste another Spotify track link (Share > Copy link to song).
  // Please open this link yourself and confirm it is the right version of the song.
  music: {
    title: "14",
    artist: "Silent Sanctuary",
    spotifyTrackUrl: "https://open.spotify.com/track/7KD8oUUpidul2ROxTIhPAw",
  },
};
