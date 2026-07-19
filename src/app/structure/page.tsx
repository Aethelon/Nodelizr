import type { Metadata } from "next";
import StructureClient from "./structure-client";

export const metadata: Metadata = {
  title: "Project Structure Preview",
  description:
    "Preview the exact folder structure and file contents of your generated Node.js project before downloading the ZIP.",
  alternates: { canonical: "/structure" },
  openGraph: {
    title: "Project Structure Preview · Nodelizr",
    description:
      "Inspect the generated Node.js project files and folders before download.",
    url: "/structure",
  },
};

export default function Page() {
  return <StructureClient />;
}
