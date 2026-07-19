import { create } from "zustand";
import { toast } from "sonner";
import {
  generateProject,
  getLibraries,
  getOptions,
} from "@/lib/api";
import type {
  GenerateProjectPayload,
  Library,
  ProjectPresetOption,
  ProjectTemplateOption,
  SelectedLibrary,
} from "@/lib/types";

const CUSTOM_PRESET_ID = "custom";
const DEFAULT_TEMPLATE_ID = "node-basic-js";
const VERSION_PATTERN = /^\d+\.\d+\.\d+([-+].*)?$/;

interface ProjectState {
  // form
  description: string;
  author: string;
  version: string;
  license: string;
  templateId: string;
  presetId: string;
  selectedLibraries: SelectedLibrary[];

  // options
  templates: ProjectTemplateOption[];
  presets: ProjectPresetOption[];
  libraries: Library[];
  loaded: boolean;
  generating: boolean;

  // actions
  setField: (
    field: "description" | "author" | "version" | "license",
    value: string,
  ) => void;
  setTemplate: (id: string) => void;
  setPreset: (id: string) => void;
  toggleLibrary: (lib: Library) => void;
  removeLibrary: (name: string) => void;
  isLibrarySelected: (name: string) => boolean;
  loadOptions: () => Promise<void>;
  generate: () => Promise<void>;
}

export const CUSTOM_PRESET = CUSTOM_PRESET_ID;
export const CUSTOM_TEMPLATE_ID = DEFAULT_TEMPLATE_ID;

export const useProjectStore = create<ProjectState>((set, get) => ({
  description: "",
  author: "",
  version: "1.0.0",
  license: "MIT",
  templateId: DEFAULT_TEMPLATE_ID,
  presetId: CUSTOM_PRESET_ID,
  selectedLibraries: [],

  templates: [],
  presets: [],
  libraries: [],
  loaded: false,
  generating: false,

  setField: (field, value) => set({ [field]: value } as Partial<ProjectState>),

  setTemplate: (id) => set({ templateId: id, presetId: CUSTOM_PRESET_ID }),

  setPreset: (id) => {
    if (!id || id === CUSTOM_PRESET_ID) {
      set({ presetId: CUSTOM_PRESET_ID, templateId: DEFAULT_TEMPLATE_ID });
      return;
    }

    const preset = get().presets.find((item) => item.id === id);
    if (!preset) {
      return;
    }

    const libraries = get().libraries;
    const selected: SelectedLibrary[] = [];
    for (const name of preset.recommendedLibraries) {
      const data = libraries.find((lib) => lib.name === name);
      if (!data) {
        continue;
      }
      const version =
        data.version && data.version !== "unknown" ? data.version : "*";
      selected.push({ name: data.name, version });
    }

    set({
      presetId: id,
      templateId: preset.templateId,
      selectedLibraries: selected,
    });
  },

  toggleLibrary: (lib) => {
    const current = get().selectedLibraries;
    const exists = current.some((item) => item.name === lib.name);
    set({
      selectedLibraries: exists
        ? current.filter((item) => item.name !== lib.name)
        : [...current, { name: lib.name, version: lib.version }],
    });
  },

  removeLibrary: (name) =>
    set((state) => ({
      selectedLibraries: state.selectedLibraries.filter(
        (item) => item.name !== name,
      ),
    })),

  isLibrarySelected: (name) =>
    get().selectedLibraries.some((item) => item.name === name),

  loadOptions: async () => {
    if (get().loaded) {
      return;
    }
    set({ loaded: true });

    try {
      const [libraries, options] = await Promise.all([
        getLibraries(),
        getOptions(),
      ]);

      const currentTemplate = get().templateId;
      const fallbackTemplate = options.templates[0]?.id;
      const templateExists = options.templates.some(
        (template) => template.id === currentTemplate,
      );

      set({
        libraries,
        templates: options.templates,
        presets: options.presets,
        templateId:
          !templateExists && fallbackTemplate
            ? fallbackTemplate
            : currentTemplate,
      });
    } catch {
      set({ loaded: false });
      toast.error("Load Error", {
        description: "Unable to load templates and presets at the moment.",
      });
    }
  },

  generate: async () => {
    const state = get();

    if (
      state.description.trim().length < 2 ||
      !VERSION_PATTERN.test(state.version.trim())
    ) {
      toast.warning("Invalid Form", {
        description: "Please provide a valid project name and version.",
      });
      return;
    }

    const payload: GenerateProjectPayload = {
      description: state.description,
      author: state.author,
      version: state.version,
      license: state.license,
      templateId: state.templateId,
      presetId: state.presetId,
      libraries: state.selectedLibraries,
    };

    set({ generating: true });
    try {
      const blob = await generateProject(payload);
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = payload.description
        ? `${payload.description.replace(/\s+/g, "-")}.zip`
        : "project.zip";
      anchor.click();
      window.URL.revokeObjectURL(url);
      toast.success("Project Generated", {
        description: "ZIP file downloaded successfully!",
      });
    } catch {
      toast.error("Generation Error", {
        description: "There was a problem generating the project.",
      });
    } finally {
      set({ generating: false });
    }
  },
}));
