# Mashallah Welding Works

Production-ready web application for Mashallah Welding Works, an iron fabrication and welding business founded by Abdul Sattar in Auto Nagar, Proddatur, Andhra Pradesh. The application showcases custom fabrication services, project galleries, working hours, and direct WhatsApp quote enquiry workflows.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Motion (motion/react)

## Local Development

Ensure Node.js LTS (v20 or v22) and npm are installed.

```bash
# Install dependencies
npm install

# Start local development server on host 0.0.0.0:3000
npm run dev
```

The application will be accessible at `http://localhost:3000`.

## Available Scripts

The following commands are defined in `package.json`:

- `npm run dev`: Starts the Vite development server on `0.0.0.0:3000`.
- `npm run build`: Compiles TypeScript and builds production-ready static assets into `dist/`.
- `npm run lint`: Runs TypeScript type checking across the codebase without emitting files (`tsc --noEmit`).
- `npm run preview`: Locally previews the production build output from `dist/`.
- `npm run clean`: Cleans up the previous `dist/` build directory.

## Project Structure

```text
├── index.html                  # HTML entry point, SEO metadata, and JSON-LD schema
├── metadata.json               # Platform configuration and app capabilities
├── src/
│   ├── main.tsx                # Application root mount
│   ├── App.tsx                 # Main layout and section composition
│   ├── index.css               # Global styles and Tailwind CSS import
│   ├── types.ts                # TypeScript interfaces and shared types
│   ├── data/
│   │   └── content.ts          # Central source of truth for business data
│   ├── utils/
│   │   └── scrollToSection.ts  # Accessible smooth-scrolling utility with dynamic header offset
│   └── components/             # Modular UI components
│       ├── Header.tsx          # Navigation bar with live business hours status
│       ├── Hero.tsx            # Hero visual showcase and quick CTA links
│       ├── ServicesGrid.tsx    # Interactive fabrication services catalog
│       ├── ServiceModal.tsx    # Detailed service specifications modal
│       ├── Gallery.tsx         # Filterable project gallery with accessible modal dialog
│       ├── About.tsx           # Workshop history, values, and proprietor info
│       ├── WhyChooseUs.tsx     # Quality and fabrication highlights
│       ├── WorkshopMap.tsx     # Embedded Google Map and verified location
│       ├── ContactSection.tsx  # Direct phone, WhatsApp form, and hours
│       ├── FaqSection.tsx      # Categorized fabrication and pricing FAQs
│       ├── Footer.tsx          # Footer navigation and legal copyright
│       ├── MobileStickyBar.tsx # Mobile bottom quick-action bar
│       └── WhatsAppIcon.tsx    # Reusable WhatsApp brand icon
```

## Content / Business Data

Core business information is centrally managed from:

```text
src/data/content.ts
```

This includes:
- Business name, proprietor name (`Abdul Sattar`), and contact numbers (`9553217643`)
- Canonical physical address (`11/276, MG, Lakshmi Nagar, Auto Nagar, Proddatur, Andhra Pradesh 516360`)
- Google Maps place URL (`https://maps.app.goo.gl/jNsuWLiv61PiG28G8`) and verified coordinates (`14.7410663, 78.5710838`)
- Weekly operating hours schedule used by the real-time open/closed status badge
- Services, categories, and technical features
- Frequently asked questions (FAQs)

### Replacing Temporary Image Placeholders

The project currently uses curated photography placeholders for gallery and hero visuals. When real on-site workshop photos and completed customer installations are ready:
1. Place the optimized image files in `public/` (or host them via a CDN/cloud storage).
2. Update the `imageUrl` fields in `GALLERY_ITEMS` inside `src/data/content.ts`.
3. Update the `og:image` and `twitter:image` tags in `index.html`.

## Production Build

To test and build the production bundle locally:

```bash
# Clean previous build artifacts
npm run clean

# Run typecheck and build production bundle
npm run lint
npm run build
```

The output files are generated in `dist/`.

## Deployment Notes

- This project is a client-side Single Page Application (SPA). The `npm run build` command generates static HTML, CSS, and JS assets in the `dist/` directory.
- Static assets can be hosted on any static hosting platform (e.g., Cloud Run, Firebase Hosting, GitHub Pages, Vercel, Netlify, or Nginx).
- Before launching on a custom production domain, update the canonical URL and OpenGraph URL tags in `index.html` (currently marked with `TODO_PRODUCTION_SITE_URL`).
