import { defaultGenerationOptions } from "./default-options";
import type {
  GenerateProjectPayload,
  GenerationOptionsResponse,
  Library,
  TemplatePreviewResponse,
} from "./types";

const REMOTE_API_URL = "https://nodelizr-api.vercel.app/api";
const LOCAL_API_URL = "https://nodelizr-api.vercel.app/api";

function isLocalhost(): boolean {
  return (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
  );
}

function primaryUrl(): string {
  return isLocalhost() ? LOCAL_API_URL : REMOTE_API_URL;
}

function secondaryUrl(): string {
  return isLocalhost() ? REMOTE_API_URL : LOCAL_API_URL;
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function getLibraries(): Promise<Library[]> {
  return getJson<Library[]>(`${primaryUrl()}/libraries`);
}

export async function getOptions(): Promise<GenerationOptionsResponse> {
  try {
    return await getJson<GenerationOptionsResponse>(`${primaryUrl()}/options`);
  } catch {
    try {
      return await getJson<GenerationOptionsResponse>(
        `${secondaryUrl()}/options`,
      );
    } catch {
      return defaultGenerationOptions;
    }
  }
}

export async function getTemplatePreview(
  templateId: string,
): Promise<TemplatePreviewResponse> {
  const encoded = encodeURIComponent(templateId);
  try {
    return await getJson<TemplatePreviewResponse>(
      `${primaryUrl()}/templates/${encoded}/preview`,
    );
  } catch {
    return getJson<TemplatePreviewResponse>(
      `${secondaryUrl()}/templates/${encoded}/preview`,
    );
  }
}

export async function generateProject(
  payload: GenerateProjectPayload,
): Promise<Blob> {
  const response = await fetch(`${primaryUrl()}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Generation failed: ${response.status}`);
  }
  return response.blob();
}
