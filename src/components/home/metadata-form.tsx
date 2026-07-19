"use client";

import Link from "next/link";
import {
  ChevronRight,
  LayoutTemplate,
  Package,
  ScrollText,
  Tag,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjectStore } from "@/store/project-store";

export function MetadataForm() {
  const description = useProjectStore((s) => s.description);
  const version = useProjectStore((s) => s.version);
  const author = useProjectStore((s) => s.author);
  const license = useProjectStore((s) => s.license);
  const setField = useProjectStore((s) => s.setField);

  return (
    <div className="flex w-full flex-col rounded-lg border border-border bg-card lg:h-full lg:max-w-[420px]">
      {/* Template summary (card header) */}
      <Link
        href="/templates"
        className="group flex items-start gap-3 border-b border-border p-4 transition-colors hover:bg-accent/50"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <LayoutTemplate size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Template
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Not sure where to start?{" "}
            <span className="font-medium text-foreground">Choose a template</span>
          </p>
        </div>
        <ChevronRight
          size={18}
          className="mt-0.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
        />
      </Link>

      {/* Fields */}
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="description">Name</Label>
          <p className="text-xs text-muted-foreground">
            The package name used in <code>package.json</code>.
          </p>
          <div className="relative mt-0.5">
            <Package
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="description"
              className="h-11 pl-9"
              placeholder="my-awesome-project"
              value={description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="version">Version</Label>
          <p className="text-xs text-muted-foreground">
            Semantic version, e.g. <code>1.0.0</code>.
          </p>
          <div className="relative mt-0.5">
            <Tag
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="version"
              className="h-11 pl-9"
              placeholder="1.0.0"
              value={version}
              onChange={(e) => setField("version", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="author">Author</Label>
          <p className="text-xs text-muted-foreground">
            Author or organization name.
          </p>
          <div className="relative mt-0.5">
            <User
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="author"
              className="h-11 pl-9"
              placeholder="Your name"
              value={author}
              onChange={(e) => setField("author", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="license">License</Label>
          <p className="text-xs text-muted-foreground">
            How others are allowed to use your code.
          </p>
          <Select
            value={license}
            onValueChange={(v) => v && setField("license", v)}
          >
            <SelectTrigger id="license" className="mt-0.5 h-11 w-full">
              <ScrollText size={16} className="text-muted-foreground" />
              <SelectValue placeholder="License" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MIT">MIT</SelectItem>
              <SelectItem value="Apache-2.0">Apache-2.0</SelectItem>
              <SelectItem value="GPL-3.0">GPL-3.0</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
