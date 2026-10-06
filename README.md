# FTR Future Rise Enterprise — website

This is a simple website made of plain files. There is no "build" step: what you see in these files is exactly what goes online.

```
index.html        ← all the words on the page
css/styles.css    ← colours, fonts, layout
js/main.js        ← small extras (fade-in, Copy button, YouTube cards)
assets/           ← logo, banner, icons, fonts
assets/originals/ ← your original full-size images (kept as a backup)
404.html          ← the "page not found" page
robots.txt, sitemap.xml ← help Google find the site
_headers, netlify.toml, vercel.json ← hosting settings (no need to touch)
```

---

## 1. Placeholders still to fill in

| # | What | Where | What to do |
|---|------|-------|------------|
| 1 | **Domain name** (not decided yet) | `index.html` (5 places), `robots.txt`, `sitemap.xml` | Replace every `https://your-domain.example` with your real address, e.g. `https://www.ftrfuturerise.com`. Use "Find and Replace" in your editor or on GitHub. |
| 2 | **5 YouTube links** for "Watch & Explore" | `index.html`, search for `YOUTUBE_VIDEO_URL_01` … `_05` | See section 4 below. Until then the cards show the placeholder text. |
| 3 | **Photos for "Celebrate the Journey"** | `index.html`, search for `PLACEHOLDER: real photos` | None supplied yet. Send real team photos (with permission from the people in them) and they can be added. Please don't use stock photos. |
| 4 | **Privacy note** in the footer | `index.html`, search for `OWNER REVIEW NEEDED` | A plain-language draft. Please read it and confirm it matches how you really handle enquiries. Edit the wording if needed, then delete the `OWNER REVIEW NEEDED` comment line. |

---

## 2. How to edit text

1. Open `index.html` (on GitHub, open the file and click the **pencil ✏️ icon**).
2. Use **Ctrl+F** (Windows) or **Cmd+F** (Mac) to find the sentence you want to change.
3. Change only the words between the `>` and `<` marks. For example:
   `<h2>Straight answers</h2>` → `<h2>Your questions, answered</h2>`
4. Save. On GitHub, click **Commit changes**. The live site updates by itself within about a minute.

Tips:
- Don't delete the `<` `>` tags themselves. If something breaks, GitHub keeps every old version (click **History** to go back).
- Your phone number, email and address each appear in a few places (the contact section, the footer and the "business details" block near the top). Change all of them if they ever change.

## 3. How to swap an image

Each image comes in two versions: `.webp` (small and fast) and `.jpg` (a backup for older browsers).

**Easiest way:** keep the **same file names**. Make your new image the same shape (width : height) as the old one, then save it over both versions:

| Image | Files | Size to export |
|---|---|---|
| Top banner | `banner-800`, `banner-1200`, `banner-1800` (.webp and .jpg) | 800, 1200 and 1800 pixels wide, ratio about 2.7 : 1 |
| Small logo (top bar) | `logo-icon-120` (.webp and .jpg) | 120 pixels wide |
| Footer logo | `logo-full-200` (.webp and .jpg) | 200 pixels wide |

To make a `.webp` file, use a free site such as **squoosh.app** (open the image, choose WebP, quality about 80, download). If that's too fiddly, you can save only the `.jpg` versions and delete the matching `.webp` files plus their `<source …>` lines in `index.html`. The site will still work, just a little slower.

`banner-1200.jpg` is also the preview picture shown when someone shares the link on WhatsApp or Facebook.

## 4. How to add the YouTube videos

In `index.html` find:

```html
<div class="video-card" data-youtube="YOUTUBE_VIDEO_URL_01">
```

Replace `YOUTUBE_VIDEO_URL_01` with the normal YouTube link, e.g.

```html
<div class="video-card" data-youtube="https://www.youtube.com/watch?v=abc123XYZ_0">
```

Any normal YouTube link works (`youtube.com/watch?v=…`, `youtu.be/…`, `youtube.com/shorts/…`). The card then shows the video's thumbnail with a play button. The video only loads from YouTube when someone presses play, which keeps the page fast. Do the same for `_02` to `_05`. The cards are in this order:

1. Career Exploration
2. Financial Literacy
3. Women & Financial Independence
4. Leadership & Personal Development
5. Team Experiences & Culture

## 5. How to redeploy

You don't have to do anything: once the site is connected to GitHub (section 6), **every saved change on GitHub goes live automatically** within about a minute. Check the hosting dashboard (Cloudflare Pages or Netlify) if you want to see progress.

---

## 6. Putting the site online for the first time (you do these steps)

Nothing has been signed up for or bought on your behalf. Everything below is free except the domain name.

### Step A: Create a GitHub account and upload the site
1. Go to **github.com** and click **Sign up** (free).
2. Install **GitHub Desktop** (desktop.github.com) and sign in with that account.
3. In GitHub Desktop: **File → Add local repository…**, then choose this `ftr-website` folder. (It's already set up as a repository with everything saved.)
4. Click **Publish repository**. Name it `ftr-website`. You can tick **Keep this code private**.

### Step B: Connect it to Cloudflare Pages (recommended)
1. Go to **dash.cloudflare.com** and sign up (free).
2. In the left menu: **Workers & Pages → Create → Pages → Connect to Git**.
3. Connect your GitHub account and pick the `ftr-website` repository.
4. Use these settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: *(leave empty; if it insists on a value, type `/`)*
5. Click **Save and Deploy**. After about a minute you get a live, secure (HTTPS) address like `https://ftr-website.pages.dev`. **That's your live site.**

*Prefer Vercel?* Go to **vercel.com** → sign up with GitHub → **Add New… → Project** → **Import** `ftr-website`. Set Framework Preset to **Other**, leave the build command and output directory empty, then click **Deploy**. You get an address like `https://ftr-website.vercel.app`. Hosting settings are in `vercel.json`. For a custom domain: **Project → Settings → Domains**.

*Prefer Netlify?* Go to **app.netlify.com** → **Add new site → Import an existing project → GitHub**, pick `ftr-website`, leave the build command empty and set the publish directory to `.`, then click **Deploy**. Use one host, not both.

### Step C: Buy and connect a domain (when you've decided on the name)
1. Buy the domain. If you used Cloudflare, the simplest option is **Cloudflare → Domain Registration → Register Domains** (sold at cost price). For a `.my` / `.com.my` address, use a Malaysian registrar (any MYNIC-accredited one).
2. In **Cloudflare → Workers & Pages → ftr-website → Custom domains → Set up a custom domain**, type your domain and follow the prompts. If you bought it through Cloudflare, the DNS is set up for you. If you bought it elsewhere, Cloudflare tells you exactly which record to add at your registrar.
   (On Netlify: **Domain management → Add a domain**.)
3. HTTPS (the padlock) is switched on automatically, usually within 15 minutes.
4. Replace `https://your-domain.example` with the real domain (see the placeholder table above) and save.
5. Optional: add the site to **Google Search Console** (search.google.com/search-console) and submit `https://your-real-domain/sitemap.xml` so Google finds it faster.

---

## Notes for whoever edits this next
- Plain HTML/CSS/JS on purpose. Please don't add a framework or a build step.
- Brand colours live at the top of `css/styles.css` (`--navy-deep: #021029`, `--gold: #E5B265`, …). `--gold-text` is a slightly darker gold used for small text on white so it's easy to read.
- Fonts (Inter and Poppins) are stored in `assets/fonts/`. Both are free under the SIL Open Font License.
- Positioning: talent, career discovery, personal growth and leadership come first. Financial services is one pathway among several. Don't add testimonials, awards, income figures, statistics, event dates or guaranteed outcomes.
