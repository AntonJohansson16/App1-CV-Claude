# CAREER OS AI — Elite Career Strategist

An AI-powered career optimization platform built with Next.js + Claude AI. Maximizes interview probability through ATS optimization, CV rewriting, LinkedIn optimization, cover letters, interview prep, and career planning.

## Features

- **ATS Match Score** — Keyword gap analysis with 0-100 scoring
- **CV Rewrite Engine** — Impact-optimized bullets, ATS-tuned keywords
- **LinkedIn Optimization** — Headline + About section + 5 keyword improvements
- **Cover Letter** — Tailored, human-toned, value-driven
- **Interview Simulation** — 10 questions + STAR-method answers
- **Career Improvement Plan** — 5 actionable next steps

## Deploy to Vercel (3 steps)

### 1. Clone and push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/career-os.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Vercel auto-detects Next.js — click **Deploy**

### 3. Add environment variable
In Vercel dashboard → Settings → Environment Variables:
```
ANTHROPIC_API_KEY = your_anthropic_api_key
```

Get your API key at [console.anthropic.com](https://console.anthropic.com)

## Local Development

```bash
npm install
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Claude claude-sonnet-4-20250514** via Anthropic SDK
- **CSS Modules** (zero dependencies for styling)
