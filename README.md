# Strata — a notes site with a built-in upload form

This is a real, working website: students and the geology community visit
the site and browse/download notes — no login needed for them. You log
into a private admin page and add notes through a form (title, subject,
an attachment if you have one, or just type the note directly) — no code
editing, ever, after this initial setup.

Behind the scenes: it's a small static-site build (Eleventy) plus a free
admin panel (Decap CMS). When you publish a note in the admin panel, it's
saved to your GitHub repository automatically, and Netlify rebuilds the
public site within about a minute.

## One-time setup (about 15 minutes)

**1. Push this folder to GitHub**
Create a new repository on [github.com](https://github.com) and push
everything in this folder to it (the whole `strata-site` folder, at the
repo root).

**2. Connect it to Netlify**
- Go to [app.netlify.com](https://app.netlify.com) and sign up/log in (free).
- "Add new site" → "Import an existing project" → choose GitHub → pick your
  new repository.
- Netlify reads `netlify.toml` automatically, so the build settings are
  already filled in. Click **Deploy**.
- After a minute you'll have a live URL like `https://random-name.netlify.app`.
  You can rename it (or add your own domain later) under **Site settings →
  Domain management**.

**3. Turn on Identity (this is what lets you log in)**
- In your Netlify site dashboard: **Site settings → Identity → Enable Identity**.
- Under **Identity → Registration**, choose **Invite only** — this stops
  strangers from signing up to upload notes.
- Under **Identity → Services**, enable **Git Gateway**. This is what lets
  the admin panel save your notes to GitHub without you ever touching Git.

**4. Invite yourself (and anyone else who should be able to upload)**
- **Identity → Invite users** → enter your email (and colleagues', if any).
- You'll get an email with a link. Click it, set a password — this opens
  the site and finishes your account setup.

That's it. Setup is done and won't need repeating.

## Adding a note (every time, going forward)

1. Go to `https://<your-site>.netlify.app/admin/`
2. Log in with the password you set.
3. Click **New Note**.
4. Fill in:
   - **Title** — whatever you'd call it
   - **Subject** — pick from the list (edit the list in `src/admin/config.yml`
     any time you want to add a new subject)
   - **Date**
   - **Attachment** — optional. Upload a PDF, a photo, an HTML file, anything.
   - **Note text** — optional. Type directly if you don't have a file, or
     use both.
5. Click **Publish**.

Within about a minute, the note appears on the live site, grouped under its
subject, newest first.

## Who can do what

- **Visitors** (students, the geology community): open the main site URL,
  browse and download — no account, no login.
- **You / invited colleagues**: log into `/admin/` to add or edit notes.
- Anyone not invited can't create an account, even if they find `/admin/`.

## Local preview (optional)

If you ever want to preview changes on your own computer before they're
live, with [Node.js](https://nodejs.org) installed:

```
npm install
npm start
```

This opens a local preview at `http://localhost:8080`.

## Project structure

```
src/
  admin/            the upload form (Decap CMS) — don't need to touch this
  notes/*.md        one file per note — created automatically when you
                     publish through the admin panel
  _includes/        page templates (base look, note page layout)
  index.njk         homepage — lists all notes, grouped by subject
  style.css         all the visual styling
.eleventy.js        site build configuration
netlify.toml        tells Netlify how to build the site
```
