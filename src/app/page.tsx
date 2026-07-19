import { DependenciesPanel } from "@/components/home/dependencies-panel";
import { MetadataForm } from "@/components/home/metadata-form";

export default function HomePage() {
  return (
    <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col p-6 lg:p-10">
      <header className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
          Create a new <span className="text-primary">Node.js</span> project
        </h1>
        <p className="text-sm text-muted-foreground">
          Configure, add dependencies, and download.
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-8 lg:flex-row lg:items-stretch">
        <MetadataForm />
        <div className="min-h-[400px] w-full flex-1 lg:min-h-0">
          <DependenciesPanel />
        </div>
      </div>
    </div>
  );
}
