# 👻 GhostyRaffle

A pixel-art secret gift exchange app where **no one — not even the host — can see who got matched with whom**.

🔗 **Live:** [GhostyRaffle](https://ghosty-raffle.vercel.app/)

![GhostyRaffle Screenshot](https://i.ibb.co/sdkJsmJB/ghosty-Raffle.png)

---

## What is it?

GhostyRaffle is a stateless, privacy-focused secret Santa / gift exchange tool. Add your participants, hit **START DRAW**, and everyone receives a secret email with their match. No data is ever stored — matches exist only in memory during execution.

## Features

- **Completely Private** — matches are never saved to any database or log
- **Cryptographically Secure** — uses Fisher-Yates shuffle with CSPRNG
- **Retro 8-bit Aesthetic** — pixel art ghosts, Press Start 2P font, arcade animations
- **Email Delivery** — each participant gets a styled pixel-art email via Resend
- **Rate Limited** — built-in protection against abuse
- **Responsive** — works on desktop and mobile

## How It Works

1. Add participants (min 3, max 50)
2. Hit **START DRAW**
3. Each player gets a secret email with their match
4. No one sees the full list — not even you

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS + Press Start 2P font
- **Email:** Resend
- **Language:** TypeScript
- **Randomization:** Web Crypto API (CSPRNG)

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your RESEND_API_KEY and RESEND_FROM_EMAIL

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Environment Variables

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Your Resend API key |
| `RESEND_FROM_EMAIL` | Verified sender email address |

## Deploy

The easiest way to deploy is with [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Make sure to add `RESEND_API_KEY` and `RESEND_FROM_EMAIL` to your environment variables in the Vercel dashboard.

---

<p align="center">
  <sub>Built with Next.js & Resend — your data is never saved 🔒</sub>
</p>
