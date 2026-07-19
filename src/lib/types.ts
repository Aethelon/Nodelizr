export interface TemplateTreeNode {
  label?: string;
  children?: TemplateTreeNode[];
}

export interface ProjectTemplateOption {
  id: string;
  name: string;
  description: string;
  category: string;
  tree: TemplateTreeNode[];
}

export interface ProjectPresetOption {
  id: string;
  name: string;
  description: string;
  templateId: string;
  recommendedLibraries: string[];
}

export interface GenerationOptionsResponse {
  templates: ProjectTemplateOption[];
  presets: ProjectPresetOption[];
}

export interface TemplatePreviewFile {
  path: string;
  content: string;
}

export interface TemplatePreviewResponse {
  templateId: string;
  templateName: string;
  files: TemplatePreviewFile[];
}

export interface Library {
  name: string;
  description: string;
  category: string;
  version: string;
}

export interface SelectedLibrary {
  name: string;
  version?: string;
}

export interface GenerateProjectPayload {
  description: string;
  author: string;
  version: string;
  license: string;
  templateId: string;
  presetId?: string;
  libraries: SelectedLibrary[];
}
