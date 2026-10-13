# A Second Chance - personal website for Jazlee

Plain HTML, CSS and JavaScript. No frameworks, no build step.
Hosted for free on GitHub Pages. The email notification uses EmailJS.

> **Read this first: this site is NOT private.**
> GitHub Pages sites are public. Anyone who gets the link, or finds the repository,
> can open the pages, read the source code (including the quiz answers and the letter)
> and see the photos. The quiz is a playful touch, not a lock. Send the link only to
> Jazlee, use a repository name nobody could guess, and only upload photos you are
> comfortable with being publicly reachable.

---

## 1. Run it on your computer

1. Open the `jazlee-website` folder in **VS Code**.
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **Open with Live Server**.

Double-clicking `index.html` does not work. Browsers block JavaScript modules on `file://` addresses.

## 2. What each file does

| File | What it is for |
| --- | --- |
| `index.html` | All pages (welcome, quiz, letter + photos, final question) and the **text of the letter** |
| `css/style.css` | Colors, fonts, spacing, animations |
| `js/config.js` | **Edit often:** her name, the special date, EmailJS IDs, the song link, `debug` switch |
| `js/quiz.js` | Quiz questions, accepted answers and hints |
| `js/photos.js` | **The photo list** |
| `js/gallery.js`, `js/music.js`, `js/response.js`, `js/app.js` | The code that makes it work. Rarely edited |
| `tools/make_thumbnails.py` | Makes small, fast copies of your photos |
| `tools/check_photos.py` | Checks the photo list before you upload |

## 3. Everyday edits

- **Letter:** change the text inside the `<p>` tags in `index.html`, in the `letter` section.
- **Quiz answers or hints:** edit the list at the top of `js/quiz.js`.
- **Photos:** put files in `PHOTOS/`, add a line per photo to `js/photos.js`, then run
  `python tools/make_thumbnails.py` and `python tools/check_photos.py`
  (use `python3` / `pip3` if that is what your computer has; run `pip install pillow` once first).
- **Song:** in `js/config.js`, paste another Spotify track link into `spotifyTrackUrl`
  (Spotify > Share > Copy link to song).
  The song plays through Spotify's own player. Full playback needs a Spotify login in that browser;
  otherwise Spotify plays a short preview.
- **Before sending the link to Jazlee:** make sure `debug: false` in `js/config.js`.

## 4. The EmailJS template

Your EmailJS template (`Settings` > `To Email`) must have your own address, and its content should use these
variables with **double** curly braces:

```text
Answer: {{choice}}
Message: {{message}}
Submitted: {{submitted_at}}
Reference: {{submission_id}}
```

Subject: `Jazlee's Website Response`. The recipient is set in EmailJS, never in this code.

## 5. Put it online with GitHub Pages

> GitHub's menus change from time to time. If a label below does not match, look for the closest one.

1. **Make a GitHub account** at github.com, if you do not have one.
2. **Prepare the folder.** Run `python tools/check_photos.py` and fix anything marked `X`.
   Move your original big photos into a folder called `PHOTOS-originals/` (it is ignored by Git),
   keeping only the small `thumbs/` and `full/` copies inside `PHOTOS/`.
3. **Create a repository.** On GitHub choose **New repository**. Pick a name nobody would guess.
   Free GitHub Pages needs the repository to be **Public**. Do not add a README or .gitignore (this folder has them).
4. **Upload the files.** The easiest way for a beginner is **GitHub Desktop** (desktop.github.com):
   add the folder, commit, and publish. With a terminal instead, run these inside the folder:

   ```text
   git init
   git add .
   git commit -m "First version"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

   Git will ask you to sign in to GitHub. A password alone no longer works; use the browser sign-in it offers.
5. **Turn on Pages.** In the repository: **Settings > Pages**. Under *Build and deployment*, set
   **Source** to *Deploy from a branch*, **Branch** to `main`, folder `/ (root)`, then **Save**.
6. **Wait one to three minutes.** The page shows your address:
   `https://YOUR-USERNAME.github.io/YOUR-REPO/`. Refresh the settings page until it says the site is live.
7. **Allow your site in EmailJS.** In the EmailJS dashboard open **Account > Security** and add
   `https://YOUR-USERNAME.github.io` (no repository name, no trailing slash) to the allowed domains.
   Then send a real test response from the live site to confirm email still arrives.
8. **Test on a phone and a computer** (checklist below), using the live address.

To update later: change files, commit, push, wait a minute, then hard-refresh
(`Ctrl+Shift+R`, or reopen the page on your phone).

## 6. Test checklist

Tick these yourself, on the live address, on both phone and computer.

- [ ] Welcome page shows her name; **Start** opens the quiz
- [ ] Each of the 5 answers is accepted (also try different capital letters)
- [ ] A wrong answer shows a hint and does not give the answer away
- [ ] **Continue** stays locked until all 5 are right
- [ ] The letter reads well on a phone (no sideways scrolling)
- [ ] Scroll the whole gallery: photos appear, none are broken
- [ ] A photo opens; Previous / Next / arrow keys / swipe work; **Esc** closes it
- [ ] The play button starts the song; pausing and photo-opening never restart it
- [ ] **Yes** shows its message; **No** shows its message; you can switch before submitting
- [ ] **Submit Response** works with an empty message and with a message
- [ ] You receive the email with the right answer, message and time
- [ ] Turn off Wi-Fi, submit: a helpful error appears and you can retry
- [ ] Keyboard only: Tab, Enter and Space reach everything
- [ ] Press F12 > Console: no red errors (404s for photos tell you a file name is wrong)
- [ ] `debug` is `false` in `js/config.js`

## 7. Troubleshooting

| Problem | Likely cause and fix |
| --- | --- |
| Start button does nothing (local) | You opened the file by double-click. Use Live Server |
| Page is plain and unstyled online | A path or folder name is wrong. Folder names must match exactly: `css/style.css`, `js/app.js` |
| Photos missing online but fine locally | Capital letters. `Photo.JPG` and `photo.jpg` are different on GitHub. Run `check_photos.py` |
| Site shows an old version | Wait a minute, then hard-refresh. Check the **Actions** tab on GitHub for a failed build |
| 404 page | Pages is not enabled, or the repository is not Public, or the address has a typo |
| Page is slow on a phone | Photos are too large. Run `make_thumbnails.py` and upload only `thumbs/` and `full/` |
| Song does not start | Press play in the Spotify panel that opens. Full songs need a Spotify login |
| Email fails | Set `debug: true` temporarily, read the bracketed reason. Check the EmailJS template's To Email, the IDs, the allowed domain, and your monthly email limit |
| Email fails only on the live site | The live address is missing from EmailJS **Account > Security** allowed domains, or is typed with a path |

## 8. Safety notes

- No passwords, private keys or secrets are in this project. The EmailJS public key is designed to be visible.
- Anyone can copy that key. They can only trigger **your** template, never send their own text or choose a recipient.
  Keep the domain allowlist on, and check your EmailJS monthly limit.
- A hidden trap field and a block on automated browsers stop simple bots only. Nothing in a static site can stop a determined person.
- The site asks the search engines not to list it (`noindex`), but that is a request, not protection.
