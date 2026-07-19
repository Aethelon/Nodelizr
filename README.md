# Nodelizr

Nodelizr is a free, open-source Node.js project generator. It lets you scaffold Express, Fastify, CLI and worker boilerplates with curated dependencies, preview the exact folder structure, and download a ready-to-run ZIP in seconds, without using a CLI.

Live application: https://nodelizr.vercel.app

## Overview

The interface is organized around a collapsible sidebar with three sections:

- **Home**: configure project metadata (name, version, author, license) and manage selected dependencies.
- **Templates**: choose a preset (SaaS API, Public API, Microservice Events, CLI Automation, Scheduler/Worker, Web Scraping) or start from a custom setup. Each preset bundles a folder structure with a recommended set of dependencies.
- **Structure**: preview the files and their contents before generating the project.

Dependencies are added through a searchable command palette (`Ctrl/Cmd + B`), and a persistent action bar generates and downloads the project as a `.zip`.

## Tech stack

- Next.js 16 (App Router) and React 19
- TypeScript
- Tailwind CSS 4, shadcn/ui (base-ui) and lucide-react
- Zustand for cross-page state and sonner for notifications

The frontend consumes the Nodelizr API (https://github.com/Aethelon/Nodelizr-API), which provides the available options and libraries and builds the project archive.

## Getting started

Prerequisites: Node.js 20.9 or later.

```bash
# Install dependencies
npm install

# Start the development server (http://localhost:3000)
npm run dev

# Create and serve a production build
npm run build
npm run start
```

## Environment variables

| Variable | Default | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://nodelizr.vercel.app` | Public base URL used for canonical links, Open Graph metadata, the sitemap and robots. |

The API base URL is resolved automatically: on `localhost` it targets `http://localhost:3000/api`, otherwise `https://nodelizr-api.vercel.app/api` (see `src/lib/api.ts`). If the API is unreachable, the application falls back to bundled default data.

## Project structure

```
src/
  app/
    layout.tsx            Root layout, fonts, SEO metadata and JSON-LD
    page.tsx              Home page (metadata form and dependencies)
    templates/            Presets and templates page
    structure/            File-tree preview page
    opengraph-image.tsx   Dynamic Open Graph / Twitter image
    sitemap.ts            Sitemap
    robots.ts             Robots rules
    manifest.ts           Web app manifest
    globals.css           Design tokens (dark theme) and scrollbar styles
  components/
    layout/               Sidebar, application shell and generate bar
    home/                 Metadata form, dependency panel and dialog
    ui/                   shadcn/ui components
  store/                  Zustand stores (project and UI state)
  lib/                    API client, types, default data and site config
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Authors

Developed by Aethelon (https://github.com/Aethelon): Bruno Magno (https://github.com/brunoliratm) and Paulo de Araújo (https://github.com/Paulo-Araujo-Jr).

## License

Released under the [MIT](LICENSE) license.
