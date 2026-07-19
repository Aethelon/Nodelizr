import type { Metadata } from "next";
import TemplatesClient from "./templates-client";

export const metadata: Metadata = {
  title: "Templates & Presets",
  description:
    "Browse Node.js project presets and templates: Express, Fastify, CLI, worker and web-scraping starters, each bundling a folder structure with recommended dependencies.",
  alternates: { canonical: "/templates" },
  openGraph: {
    title: "Templates & Presets · Nodelizr",
    description:
      "Node.js presets and templates with curated dependencies, ready to scaffold.",
    url: "/templates",
  },
};

export default function Page() {
  return <TemplatesClient />;
}
