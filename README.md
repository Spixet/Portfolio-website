# Mohit Pandya Portfolio

A personal portfolio website built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and React Three Fiber.

Live site: `https://portfolioo-five-drab.vercel.app`

## Overview

This project is a modern developer portfolio with:

- a responsive landing page
- animated UI sections and a Three.js background
- dedicated About, Projects, Blog, and Contact pages
- SEO metadata, sitemap, and robots support
- a production contact form backed by a server-side email route
- dark mode support and polished motion-heavy interactions

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js
- React Three Fiber / Drei
- Nodemailer
- Vercel

## Main Sections

- Home: hero, skills, featured projects, contact CTA
- About: bio and resume download
- Projects: filterable project listing
- Blog: static blog cards
- Contact: social links plus SMTP-backed contact form

## Project Structure

```text
app/
  about/              About page
  api/contact/        Contact form API route
  blog/               Blog page
  components/         UI sections, Three.js background, shared components
  contact/            Contact page
  context/            Theme context
  lib/                Shared site config
  projects/           Projects page
public/
  images/             Icons, placeholders, profile assets
  resume.pdf          Public resume asset
  theme-init.js       Theme bootstrapping script
```

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Environment Variables

Create a local env file from `.env.example`.

Mail/contact configuration uses:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

## Deployment

This project is configured for Vercel.

Preview deployment:

```bash
npx vercel
```

Production deployment:

```bash
npx vercel --prod
```

## Repository Notes

The repository intentionally tracks source code, public assets, and app configuration only.

Ignored from Git:

- `node_modules/`
- `.next/`
- `.vercel/`
- local `.env` files
- TypeScript build info and other local artifacts

No real secrets are stored in the repository. The committed `.env.example` file is a safe template only.

## Implementation Notes

- Shared personal/site metadata lives in `app/lib/site.ts`
- SEO metadata is defined in `app/layout.tsx`
- `vercel.json` contains production security headers
- the contact form backend lives in `app/api/contact/route.ts`
- most page content is currently stored directly in page/component files rather than a CMS

## Status

The project is production-deployed and actively configured for Vercel-based hosting.
