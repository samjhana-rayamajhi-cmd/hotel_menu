# Deploying Dang Valley Menu to GitHub Pages

This guide gets your menu live at a free public URL like:
`https://<your-username>.github.io/hotel-menu/`

It assumes this folder (`dang-valley-menu/`) is the **root** of the project —
`index.html` must sit directly inside the repo, not nested another level deep.

---

## Part A — One-time setup

### 1. Install prerequisites (skip if already installed)
- [Git](https://git-scm.com/downloads)
- A free [GitHub account](https://github.com/join)

Check if Git is installed:
```bash
git --version
```

### 2. Create the GitHub repository
Go to [github.com/new](https://github.com/new) and create a repo:
- **Repository name:** `hotel-menu` (this becomes part of your URL — use exactly
  this if you want `github.io/hotel-menu`)
- **Visibility:** Public (required for free GitHub Pages)
- Do **not** check "Add a README" — leave it empty, since you already have files

### 3. Push your local project to GitHub
Open a terminal in this folder (`dang-valley-menu/`) and run:

```bash
cd "/home/user/Desktop/website design/dang-valley-menu"

git init
git add .
git commit -m "Initial commit: Dang Valley hotel menu"
git branch -M main
git remote add origin https://github.com/<your-username>/hotel-menu.git
git push -u origin main
```

Replace `<your-username>` with your actual GitHub username.

> **No command line?** You can instead use [GitHub Desktop](https://desktop.github.com/)
> (point it at this folder and click "Publish repository"), or drag-and-drop
> all four files into the empty repo via the GitHub website's
> "Add file → Upload files" button.

### 4. Turn on GitHub Pages
1. On GitHub, open your repo → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
3. Under **Branch**, select `main` and folder `/ (root)`, then **Save**.
4. Wait 30–60 seconds, then refresh the page — GitHub will show a banner:
   *"Your site is live at `https://<your-username>.github.io/hotel-menu/`"*

That's your public menu URL. 🎉

### 5. Point your QR code at the live URL
1. Open `https://<your-username>.github.io/hotel-menu/qr.html`
2. The URL field should already auto-fill correctly (it resolves relative to
   the page itself), but double check it reads
   `.../hotel-menu/index.html`.
3. Click **Generate QR Code**, then **Download PNG** to save it for printing
   on table cards/tents.

---

## Part B — Updating the menu later

Whenever you want to change dishes, prices, or descriptions:

1. Edit **`menu.js`** locally (the `menuData` array — add/remove/edit items;
   no need to touch `index.html` or `styles.css` for menu content changes).
2. Save the file, then push the change:

```bash
cd "/home/user/Desktop/website design/dang-valley-menu"

git add .
git commit -m "Update menu items"
git push
```

3. GitHub Pages automatically rebuilds — refresh
   `https://<your-username>.github.io/hotel-menu/` after ~30–60 seconds to
   see the update live. No re-deploy step needed.

### Quick reference for common edits
- **Add a dish:** add a new `{ name, description, price, veg, spicy }` object
  inside the right category's `items` array in `menu.js`.
- **Add a new category/section:** add a new `{ category: "...", items: [...] }`
  block to `menuData` — the nav link and section render automatically.
- **Change prices:** update the `price` field (numbers only, no "Rs." prefix —
  that's added automatically when rendering).
- **Reprint QR code:** only needed if the URL itself changes (e.g. you move to
  a custom domain). Editing the menu does **not** require a new QR code.
