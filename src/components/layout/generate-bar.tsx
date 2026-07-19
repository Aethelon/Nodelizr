"use client";

import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CUSTOM_PRESET, useProjectStore } from "@/store/project-store";

export function GenerateBar() {
  const presets = useProjectStore((s) => s.presets);
  const presetId = useProjectStore((s) => s.presetId);
  const selectedLibraries = useProjectStore((s) => s.selectedLibraries);
  const generating = useProjectStore((s) => s.generating);
  const generate = useProjectStore((s) => s.generate);

  const presetLabel =
    presetId === CUSTOM_PRESET
      ? "Custom"
      : (presets.find((p) => p.id === presetId)?.name ?? "Custom");

  return (
    <footer className="flex shrink-0 items-center justify-between gap-4 border-t border-border bg-card/60 px-4 py-3 backdrop-blur lg:px-8">
      <div className="hidden min-w-0 flex-col sm:flex">
        <span className="truncate text-sm font-medium text-foreground">
          {presetLabel}
        </span>
        <span className="text-xs text-muted-foreground">
          {selectedLibraries.length} dependenc
          {selectedLibraries.length === 1 ? "y" : "ies"} selected
        </span>
      </div>

      <Button
        size="lg"
        onClick={generate}
        disabled={generating}
        className="ml-auto w-full text-base font-semibold sm:w-auto sm:min-w-[300px]"
      >
        {generating ? <Loader2 className="animate-spin" /> : <Download />}
        Generate
      </Button>
    </footer>
  );
}
