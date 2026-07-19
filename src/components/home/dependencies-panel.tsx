"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProjectStore } from "@/store/project-store";
import { DependenciesDialog } from "./dependencies-dialog";

export function DependenciesPanel() {
  const libraries = useProjectStore((s) => s.libraries);
  const selectedLibraries = useProjectStore((s) => s.selectedLibraries);
  const removeLibrary = useProjectStore((s) => s.removeLibrary);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const descriptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const lib of libraries) {
      map.set(lib.name, lib.description);
    }
    return map;
  }, [libraries]);

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between gap-4 border-b border-border p-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Dependencies
          </h2>
          <p className="text-xs text-muted-foreground">
            {selectedLibraries.length} selected
          </p>
        </div>
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Plus size={16} />
          <span className="max-[375px]:hidden">Add Dependencies</span>
          <span className="hidden max-[375px]:inline">Add</span>
          <kbd className="ml-1 hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">
            ⌘B
          </kbd>
        </Button>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="p-3">
          {selectedLibraries.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-1 px-4 py-16 text-center">
              <p className="text-sm font-medium text-foreground">
                No dependency selected
              </p>
              <p className="text-sm text-muted-foreground">
                Click “Add Dependencies” to browse the catalog.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {selectedLibraries.map((lib) => (
                <li
                  key={lib.name}
                  className="flex items-center gap-3 rounded-md border border-border bg-background/40 px-3 py-2.5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold text-primary">
                        {lib.name}
                      </span>
                      <span className="shrink-0 rounded border border-border px-1.5 py-0.5 text-xs text-muted-foreground">
                        {lib.version}
                      </span>
                    </div>
                    {descriptions.get(lib.name) && (
                      <p className="truncate text-sm text-muted-foreground">
                        {descriptions.get(lib.name)}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLibrary(lib.name)}
                    aria-label={`Remove ${lib.name}`}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </ScrollArea>

      <DependenciesDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
