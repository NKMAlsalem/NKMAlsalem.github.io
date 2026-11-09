# Naif Alsalem · GRC Portfolio

Personal portfolio for governance, risk and compliance (GRC) roles, available in Arabic and English.

**Live site:** https://nkmalsalem.github.io

## What's inside

- **QIS case study.** A full NCA ECC-2:2024 compliance program for Qayrawan Information Systems, a fictional Riyadh government IT vendor: company profile, risk methodology and register, cybersecurity charter, policies, incident response and business continuity. Each document is written in Arabic first and published in both languages once it reaches version 1.0.
- **Document register** with an in-page PDF reader and downloads.
- **ECC Compliance Platform** summary, with an interactive example of how an endpoint signal is traced to an ECC subdomain and a recommended action.
- Full right-to-left layout when switching to Arabic.

## Stack

- [Next.js 14](https://nextjs.org) (App Router, static export) with React and TypeScript
- [Tailwind CSS](https://tailwindcss.com) with theme tokens for light and dark mode
- [Framer Motion](https://www.framer.com/motion/) for transitions
- [react-pdf](https://github.com/wojtekmaj/react-pdf) for the document reader
- Self-hosted fonts via Fontsource: Schibsted Grotesk, IBM Plex Mono and Noto Kufi Arabic
- Deployed to GitHub Pages with GitHub Actions

## Project structure

```
app/              layout, page and global styles
components/       page sections, language provider, PDF viewer
content/copy.ts   all site text in English and Arabic
data/documents.ts the case study document register
data/signals.ts   example signals for the platform section
public/docs/      published v1.0 documents
```

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Publishing a document

1. Export the v1.0 document to PDF in both languages and add it to `public/docs/` (see the README there for file names).
2. Set its `status` to `"published"` in `data/documents.ts`.
3. Push to `main`. The workflow builds and deploys the site.

## Note

Qayrawan Information Systems, its staff and its clients are fictional. The regulators and frameworks referenced are real.
