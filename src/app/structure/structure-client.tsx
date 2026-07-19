"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, File, Folder } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTemplatePreview } from "@/lib/api";
import {
  buildFallbackFilesFromTree,
  buildTreeItems,
  type PreviewTreeItem,
} from "@/lib/build-tree";
import { useProjectStore } from "@/store/project-store";
import type { TemplatePreviewFile } from "@/lib/types";

export default function StructurePage() {
  const templateId = useProjectStore((s) => s.templateId);
  const templates = useProjectStore((s) => s.templates);

  const [files, setFiles] = useState<TemplatePreviewFile[]>([]);
  const [treeItems, setTreeItems] = useState<PreviewTreeItem[]>([]);
  const [selectedPath, setSelectedPath] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectedTemplate = templates.find((t) => t.id === templateId);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    const applyFiles = (incoming: TemplatePreviewFile[]) => {
      const sorted = [...incoming].sort((a, b) =>
        a.path.localeCompare(b.path),
      );
      setFiles(sorted);
      setTreeItems(buildTreeItems(sorted));
      setSelectedPath(sorted[0]?.path ?? "");
    };

    getTemplatePreview(templateId || "node-basic-js")
      .then((preview) => {
        if (active) {
          applyFiles(preview.files);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!active) return;
        setError(
          "Could not load file preview from API. Showing structure-only fallback.",
        );
        const fallbackTree = selectedTemplate?.tree ?? [];
        applyFiles(buildFallbackFilesFromTree(fallbackTree));
        setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);

  const selectedContent = useMemo(
    () => files.find((f) => f.path === selectedPath)?.content ?? "",
    [files, selectedPath],
  );
  const selectedName = selectedPath.split("/").pop() || selectedPath;

  const copyCurrentFile = () => {
    if (!selectedContent || !navigator?.clipboard) return;
    navigator.clipboard.writeText(selectedContent);
    toast.success("Copied", {
      description: "File content copied to clipboard.",
    });
  };

  return (
    <div className="flex h-full flex-col p-6 lg:p-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
          Project structure
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse the files that will be generated for{" "}
          <span className="font-semibold text-foreground">
            {selectedTemplate?.name ?? "the selected template"}
          </span>{" "}
          before download.
        </p>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-[minmax(240px,320px)_1fr]">
        {/* Tree */}
        <aside className="flex min-h-0 flex-col border-b border-border lg:border-b-0 lg:border-r">
          <div className="border-b border-border px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Files
          </div>
          <ScrollArea className="min-h-0 flex-1">
            <div className="py-1.5">
              {loading && (
                <p className="p-3 text-sm text-muted-foreground">
                  Loading file preview...
                </p>
              )}
              {error && (
                <p className="p-3 text-sm text-destructive">{error}</p>
              )}
              {!loading &&
                treeItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      item.type === "file" && setSelectedPath(item.path)
                    }
                    style={{ paddingLeft: 12 + item.depth * 16 }}
                    className={cn(
                      "flex min-h-8 w-full items-center gap-2 py-1 pr-2 text-left text-sm",
                      item.type === "folder"
                        ? "cursor-default text-muted-foreground"
                        : "cursor-pointer text-foreground hover:bg-accent",
                      item.type === "file" &&
                        item.path === selectedPath &&
                        "bg-primary/10 text-primary",
                    )}
                  >
                    {item.type === "folder" ? (
                      <Folder size={16} className="shrink-0" />
                    ) : (
                      <File size={16} className="shrink-0" />
                    )}
                    <span className="truncate">{item.name}</span>
                  </button>
                ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Content */}
        <section className="flex min-h-0 flex-col">
          <div className="flex min-h-11 items-center justify-between border-b border-border px-4 py-2">
            <span className="truncate text-sm font-semibold text-foreground">
              {selectedName || "No file selected"}
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={copyCurrentFile}
              disabled={!selectedContent}
            >
              <Copy size={14} />
              Copy
            </Button>
          </div>
          <ScrollArea className="min-h-0 flex-1">
            <pre className="p-4 text-sm leading-6 text-foreground">
              <code>{selectedContent}</code>
            </pre>
          </ScrollArea>
        </section>
      </div>
    </div>
  );
}
