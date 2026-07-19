"use client";

import { Check, FolderTree } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  CUSTOM_PRESET,
  CUSTOM_TEMPLATE_ID,
  useProjectStore,
} from "@/store/project-store";

export default function TemplatesPage() {
  const templates = useProjectStore((s) => s.templates);
  const presets = useProjectStore((s) => s.presets);
  const presetId = useProjectStore((s) => s.presetId);
  const setPreset = useProjectStore((s) => s.setPreset);

  const templateName = (id: string) =>
    templates.find((t) => t.id === id)?.name ?? id;

  return (
    <div className="mx-auto w-full max-w-[1400px] p-6 lg:p-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
          Templates
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a starting point. Each option bundles a project structure with a
          curated set of dependencies.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Custom */}
        <SelectableCard
          active={presetId === CUSTOM_PRESET}
          title="Custom"
          description="Manual setup: start from a lean structure and add dependencies freely."
          structure={templateName(CUSTOM_TEMPLATE_ID)}
          onClick={() => setPreset(CUSTOM_PRESET)}
        />

        {presets.map((preset) => (
          <SelectableCard
            key={preset.id}
            active={presetId === preset.id}
            title={preset.name}
            description={preset.description}
            structure={templateName(preset.templateId)}
            onClick={() => setPreset(preset.id)}
          >
            <div className="flex flex-wrap gap-1.5 pt-3">
              {preset.recommendedLibraries.map((lib) => (
                <Badge key={lib} variant="outline" className="font-normal">
                  {lib}
                </Badge>
              ))}
            </div>
          </SelectableCard>
        ))}
      </div>
    </div>
  );
}

function SelectableCard({
  active,
  title,
  description,
  structure,
  onClick,
  children,
}: {
  active: boolean;
  title: string;
  description: string;
  structure: string;
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col rounded-lg border bg-card p-5 text-left transition-colors",
        active
          ? "border-primary ring-1 ring-primary"
          : "border-border hover:border-primary/50",
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="font-semibold text-foreground">{title}</span>
        {active && <Check size={18} className="shrink-0 text-primary" />}
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <FolderTree size={13} className="shrink-0 text-primary/70" />
        <span className="truncate">{structure}</span>
      </div>

      {children}
    </button>
  );
}
