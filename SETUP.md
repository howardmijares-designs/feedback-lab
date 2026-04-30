# AI Factory Feedback Lab — MVP Demo

A clickable prototype of the volunteer-pool ecosystem. No backend, no env
vars — runs entirely in the browser.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## The four routes

| Path | What it is |
|---|---|
| `/` | Welcome & Volunteer Form |
| `/thank-you` | Volunteer confirmation (reads the just-submitted record) |
| `/admin/login` | Admin sign-in gate (any email works in demo mode) |
| `/admin` | Volunteer pool dashboard (12 seeded volunteers + your live submission) |

## The demo loop

1. Open `/` → fill in the form, pick a role → **Join the panel**.
2. Land on `/thank-you` → see the recap card with your details.
3. Visit `/admin/login` → enter any email → **Sign in**.
4. On `/admin`, your submission appears at the top of the table alongside the
   12 seeded volunteers. Search and filter both work live.

---

## Deploy to GitHub Pages

DGE blocks Vercel; GitHub Pages is reliably accessible from government
networks. Setup is one-time, then every `git push` redeploys automatically.

### 1. Create a GitHub repo

```bash
cd "/Users/howardmijares/Desktop/Claude Code/DS Experiment"
git init
git add -A
git commit -m "AI Factory Feedback Lab — MVP demo"
gh repo create feedback-lab --public --source=. --remote=origin --push
```

(If you don't have `gh` installed: create the repo manually on github.com,
then `git remote add origin <url>` and `git push -u origin main`.)

> The repo name becomes the URL path. Whatever you name it —
> `feedback-lab`, `ai-factory-panel`, etc. — the GH Action picks it up
> automatically. No code changes needed.

### 2. Enable GitHub Pages

On github.com:

1. Go to your repo → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.

That's it. The workflow at `.github/workflows/deploy.yml` is already in the
repo and will run on every push to `main`.

### 3. Wait ~2 minutes

The first deploy takes a couple of minutes. Watch progress under the **Actions**
tab. When it's green, your URL is:

```
https://<your-username>.github.io/<repo-name>/
```

For example: `https://howardmijares.github.io/feedback-lab/`

### 4. Send Hiten the link

Routes Hiten can visit:

- `https://<user>.github.io/<repo>/` — volunteer form (start here)
- `https://<user>.github.io/<repo>/admin/login/` — admin dashboard sign-in

The trailing slashes matter on GH Pages.

### Re-deploying

Every `git push` to `main` triggers a fresh build and deploy. No manual step.

---

## What this MVP is not

- No real database (sessionStorage only — refreshing `/admin` keeps the seeded
  list but the live submission you just made is lost when sessionStorage is
  cleared).
- No real auth on `/admin` — the email gate is a demo pass-through.
- No real emails sent.

The Phase 1 implementation plan (real Supabase + Resend + magic-link auth) is
preserved at `~/.claude/plans/vivid-frolicking-reddy.md` and can be revived
when ready.
