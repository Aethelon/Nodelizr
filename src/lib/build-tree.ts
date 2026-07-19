import type { TemplatePreviewFile, TemplateTreeNode } from "./types";

export interface PreviewTreeItem {
  id: string;
  path: string;
  name: string;
  depth: number;
  type: "folder" | "file";
}

interface FolderNode {
  name: string;
  path: string;
  folders: Map<string, FolderNode>;
  files: TemplatePreviewFile[];
}

export function buildTreeItems(
  files: TemplatePreviewFile[],
): PreviewTreeItem[] {
  const root: FolderNode = {
    name: "",
    path: "",
    folders: new Map(),
    files: [],
  };

  for (const file of files) {
    const segments = file.path.split("/").filter(Boolean);
    if (!segments.length) {
      continue;
    }

    let current = root;
    let currentPath = "";
    for (let index = 0; index < segments.length - 1; index++) {
      const segment = segments[index];
      currentPath = currentPath ? `${currentPath}/${segment}` : segment;

      if (!current.folders.has(segment)) {
        current.folders.set(segment, {
          name: segment,
          path: currentPath,
          folders: new Map(),
          files: [],
        });
      }
      current = current.folders.get(segment)!;
    }

    current.files.push(file);
  }

  const items: PreviewTreeItem[] = [];

  const walk = (folder: FolderNode, depth: number) => {
    const childFolders = Array.from(folder.folders.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    for (const childFolder of childFolders) {
      items.push({
        id: `folder:${childFolder.path}`,
        path: childFolder.path,
        name: childFolder.name,
        depth,
        type: "folder",
      });
      walk(childFolder, depth + 1);
    }

    const childFiles = [...folder.files].sort((a, b) =>
      a.path.localeCompare(b.path),
    );
    for (const file of childFiles) {
      items.push({
        id: `file:${file.path}`,
        path: file.path,
        name: file.path.split("/").pop() || file.path,
        depth,
        type: "file",
      });
    }
  };

  walk(root, 0);
  return items;
}

export function buildFallbackFilesFromTree(
  nodes: TemplateTreeNode[],
): TemplatePreviewFile[] {
  const filePaths: string[] = [];

  const walk = (currentNodes: TemplateTreeNode[], parentPath = "") => {
    for (const node of currentNodes) {
      const label = node.label?.trim();
      if (!label) {
        continue;
      }
      const currentPath = parentPath ? `${parentPath}/${label}` : label;
      const children = node.children ?? [];
      if (children.length) {
        walk(children, currentPath);
      } else {
        filePaths.push(currentPath);
      }
    }
  };

  walk(nodes);

  return filePaths.map((path) => ({
    path,
    content: `// Preview unavailable for ${path}\n// The file content will be generated when you click Generate.`,
  }));
}
