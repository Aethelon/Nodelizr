"use client";

import { useMemo } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useProjectStore } from "@/store/project-store";
import type { Library } from "@/lib/types";

interface DependenciesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DependenciesDialog({
  open,
  onOpenChange,
}: DependenciesDialogProps) {
  const libraries = useProjectStore((s) => s.libraries);
  const selectedLibraries = useProjectStore((s) => s.selectedLibraries);
  const toggleLibrary = useProjectStore((s) => s.toggleLibrary);

  const selectedNames = useMemo(
    () => new Set(selectedLibraries.map((l) => l.name)),
    [selectedLibraries],
  );

  const grouped = useMemo(() => {
    const result: Record<string, Library[]> = {};
    for (const lib of libraries) {
      (result[lib.category] ||= []).push(lib);
    }
    return result;
  }, [libraries]);

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Add dependencies"
      description="Search and add dependencies to your project."
      className="top-1/2 w-[calc(100%-2rem)] max-w-2xl -translate-y-1/2 border border-border shadow-2xl sm:max-w-2xl"
    >
      <Command>
        <CommandInput placeholder="Search dependencies..." />
        <CommandList className="max-h-[60vh]">
        <CommandEmpty>No dependencies found.</CommandEmpty>
        {Object.keys(grouped).map((category) => (
          <CommandGroup key={category} heading={category}>
            {grouped[category].map((lib) => {
              const selected = selectedNames.has(lib.name);
              return (
                <CommandItem
                  key={lib.name}
                  value={`${lib.name} ${lib.description}`}
                  onSelect={() => toggleLibrary(lib)}
                  className="flex items-center gap-3"
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/40 bg-transparent",
                    )}
                  >
                    {selected && <Check size={12} strokeWidth={3} />}
                  </span>
                  <span className="w-32 shrink-0 truncate font-semibold text-primary">
                    {lib.name}
                  </span>
                  <span className="flex-1 truncate text-muted-foreground">
                    {lib.description}
                  </span>
                  <span className="shrink-0 rounded border border-border px-1.5 py-0.5 text-xs text-muted-foreground">
                    {lib.version}
                  </span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
        </CommandList>
        <div className="mt-1 border-t border-border px-3 py-2 text-xs text-muted-foreground">
          Selecting keeps the dialog open. Add multiple, then press{" "}
          <kbd className="rounded border border-border bg-muted px-1">Esc</kbd>{" "}
          to close.
        </div>
      </Command>
    </CommandDialog>
  );
}
