# AMOPH — Eleventy + Pages CMS Setup

## Folder Structure

```
/
├── .eleventy.js         ← Eleventy config
├── .pages.yml           ← Pages CMS config
├── package.json
├── netlify.toml         ← Cloudflare Pages build config
└── src/
    ├── _includes/
    │   ├── layouts/
    │   │   ├── base.njk     ← Base HTML wrapper (all pages)
    │   │   └── post.njk     ← Blog post layout
    │   └── partials/
    │       ├── header.html  ← Shared header
    │       └── footer.html  ← Shared footer
    ├── posts/               ← All blog posts go here (.md files)
    ├── css/
    │   └── styles.css       ← Your existing CSS (copy here)
    ├── js/
    │   └── script.js        ← Your existing JS (copy here)
    ├── images/              ← Your existing images (copy here)
    └── blog.njk             ← Blog listing page
```

---

## Setup Steps

### 1. Copy your existing files into src/
- `styles.css` → `src/css/styles.css`
- `script.js` → `src/js/script.js`
- Your images folder → `src/images/`
- Any other pages (about.html, contact.html, etc.) → `src/`

### 2. Push to GitHub
Upload this entire folder to a new GitHub repository.

### 3. Connect to Cloudflare Pages
1. Go to Cloudflare Dashboard → Pages → Create a project
2. Connect your GitHub repo
3. Set build command: `npm install && npm run build`
4. Set output directory: `public`
5. Deploy

### 4. Set up Pages CMS
1. Go to https://app.pagescms.org
2. Sign in with GitHub
3. Select your repo
4. You'll see "Blog Posts" in the sidebar — start writing!

---

## Writing a New Post
Just go to app.pagescms.org, click "Blog Posts" → "New Post", fill in the fields, and hit Publish.
Cloudflare Pages will automatically rebuild the site in ~30 seconds.

## Adding a New Page (e.g. about.html)
Put the file in `src/` — Eleventy will pass it through to `public/` automatically.
