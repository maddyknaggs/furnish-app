# furnish. 🛋️

> Buy & sell furniture near you — list in 60 seconds, book movers in the app.

---

## 📁 Project Structure

```
furnish-app/
├── src/
│   ├── App.jsx          ← The entire furnish. app (React)
│   └── main.jsx         ← Entry point (renders App into the DOM)
├── public/
│   └── favicon.svg      ← Browser tab icon
├── index.html           ← HTML shell
├── package.json         ← Dependencies & scripts
├── vite.config.js       ← Build tool config
├── vercel.json          ← Vercel deployment settings
├── .gitignore           ← Files Git should not track
└── .eslintrc.cjs        ← Code linting rules
```

---

## 🖥️ Running Locally

### Prerequisites
- **Node.js 18+** → download at nodejs.org
- **npm** (comes with Node)
- **Git** → download at git-scm.com

### Steps

```bash
# 1. Go into the project folder
cd furnish-app

# 2. Install dependencies (only needed once)
npm install

# 3. Start the development server
npm run dev
```

Your app will open at **http://localhost:3000** automatically.

Any changes you save to `src/App.jsx` will hot-reload instantly — no refresh needed.

---

## 🚀 Deploy to Vercel (Step by Step)

### Step 1 — Create a GitHub Account (if you don't have one)
Go to **github.com** → Sign Up → free account is all you need.

### Step 2 — Create a Vercel Account
Go to **vercel.com** → Sign Up → **"Continue with GitHub"**
This links them together so Vercel can see your repos.

### Step 3 — Install Git and push your project

```bash
# Inside your furnish-app folder:

# Initialize git
git init

# Stage all files
git add .

# Create your first commit
git commit -m "🛋️ furnish app v1 — initial deploy"
```

### Step 4 — Create a GitHub repo and push

Option A — Using GitHub's website:
1. Go to **github.com/new**
2. Name it `furnish-app`
3. Leave it **Public** (required for free Vercel deploys)
4. Click **Create repository**
5. GitHub will show you commands — copy and run the ones under **"…or push an existing repository"**

Option B — Using GitHub CLI (if installed):
```bash
gh repo create furnish-app --public --push --source=.
```

### Step 5 — Deploy on Vercel

1. Go to **vercel.com/dashboard**
2. Click **"Add New Project"**
3. Find and click **"furnish-app"** from your GitHub repos
4. Vercel auto-detects Vite/React — no settings to change
5. Click **"Deploy"**

⏱️ Wait ~45 seconds.

✅ Done! You'll get a URL like:
```
https://furnish-app-yourname.vercel.app
```

Share this link with anyone, on any device, anywhere in the world.

---

## 🔄 How to Update the App

Every time you make a change and want it live:

```bash
# 1. Save your changes to src/App.jsx

# 2. Stage the changes
git add .

# 3. Commit with a description
git commit -m "Added new feature: xyz"

# 4. Push to GitHub
git push

# Vercel auto-deploys in ~30 seconds — no action needed on Vercel's side
```

That's it. Push to GitHub = live on the internet.

---

## 🌿 Staging vs Production (Two Environments)

When you're ready to separate "testing" from "live", use Git branches:

```bash
# Create a staging branch
git checkout -b staging

# Make your changes, then push
git push origin staging
```

Vercel automatically creates a **preview URL** for every branch:
- `main` branch → your production URL (e.g. `furnish-app.vercel.app`)
- `staging` branch → a preview URL (e.g. `furnish-app-git-staging-yourname.vercel.app`)

You can share the staging URL for testing, and only merge to `main` when ready to go live.

---

## 🛠️ Available Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server at localhost:3000 |
| `npm run build` | Build production bundle into `/dist` folder |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check code for errors and warnings |

---

## ⚙️ Environment Variables (for future backend features)

When you add real features like Stripe payments, a database, or the Anthropic API, you'll use environment variables so secret keys are never in your code.

**Locally** — create a `.env.local` file (already in .gitignore so it won't be committed):
```
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
VITE_API_URL=https://your-backend.railway.app
```

**On Vercel** — go to your project → Settings → Environment Variables → add them there.

Access them in code with:
```jsx
const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
```

> ⚠️ Only variables that start with `VITE_` are exposed to the browser. Never put secret keys in `VITE_` variables.

---

## 🗺️ Future Backend Stack (when you're ready)

The current app is 100% frontend. When you add real users, real listings, and real payments:

| Layer | Recommended Service | Free Tier |
|---|---|---|
| Frontend | Vercel (already here!) | ✅ Free |
| Backend API | Railway (Node.js/Express) | $5/mo credit |
| Database | Supabase (PostgreSQL) | ✅ Free up to 500MB |
| Auth | Supabase Auth | ✅ Free |
| File Storage | Cloudflare R2 | ✅ Free up to 10GB |
| Payments | Stripe | 2.9% + $0.30/transaction |
| Domain | Namecheap | ~$12/year |

---

## 🆘 Troubleshooting

**"npm install" fails**
→ Make sure Node.js 18+ is installed: `node --version`

**App shows blank page after deploy**
→ Check the Vercel dashboard → your project → "Deployments" → click the failed deploy → read the error log

**Changes aren't showing up after push**
→ Check vercel.com dashboard — there should be a new deployment in progress. If not, check your `git push` worked.

**"Module not found" error**
→ Run `npm install` again, then `npm run build` locally to see the full error

---

## 📞 Support

- Vercel docs: **vercel.com/docs**
- Vite docs: **vitejs.dev**
- React docs: **react.dev**

---

*furnish. — Atlanta, GA · furnish.app/legal · legal@furnish.app*
