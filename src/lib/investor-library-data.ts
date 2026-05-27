export type MaterialKind = "image" | "video";

export type MaterialItem = {
  id: string;
  title: string;
  kind: MaterialKind;
  thumbnailUrl: string;
  mediaUrl: string;
  mimeType?: string;
  fileName?: string;
  sizeLabel?: string;
};

export type DocumentKind = "pdf" | "sheet" | "doc";

export type DocumentItem = {
  id: string;
  title: string;
  kind: DocumentKind;
  sizeLabel: string;
  mimeType?: string;
  fileName?: string;
  /** URL for iframe preview (PDF/text) or read-only download/open for Office files. */
  previewUrl?: string;
  downloadUrl?: string;
};

type KeyraMaterialResponse = {
  materials?: Array<{
    id: string;
    title: string;
    kind: MaterialKind;
    mimeType?: string;
    fileName?: string;
    sizeLabel?: string;
    url: string;
    thumbnailUrl?: string;
  }>;
};

type KeyraDocumentResponse = {
  documents?: Array<{
    id: string;
    title: string;
    kind: DocumentKind;
    mimeType?: string;
    fileName?: string;
    sizeLabel: string;
    previewUrl?: string;
    downloadUrl?: string;
  }>;
};

function defaultKeyraLibraryBaseUrl(): string {
  return process.env.NODE_ENV === "production" ? "https://admin.keyra.ie" : "http://localhost:3030";
}

const KEYRA_LIBRARY_BASE_URL =
  (process.env.KEYRA_LIBRARY_BASE_URL ??
    process.env.NEXT_PUBLIC_KEYRA_LIBRARY_BASE_URL ??
    defaultKeyraLibraryBaseUrl()).replace(/\/+$/, "");

function absoluteFromKeyra(pathOrUrl?: string): string | undefined {
  const value = String(pathOrUrl ?? "").trim();
  if (!value) return undefined;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${KEYRA_LIBRARY_BASE_URL}${value.startsWith("/") ? "" : "/"}${value}`;
}

async function fetchKeyraLibrary<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${KEYRA_LIBRARY_BASE_URL}${path}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`[investor-library] ${path} failed: ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[investor-library] ${path} failed`, err);
    return null;
  }
}

export async function listMaterialsLibrary(): Promise<MaterialItem[]> {
  const data = await fetchKeyraLibrary<KeyraMaterialResponse>(
    "/api/public/investor-library/materials",
  );

  return (data?.materials ?? [])
    .filter((item) => item.id && item.title && item.url)
    .map((item) => {
      const mediaUrl = absoluteFromKeyra(item.url) ?? "";
      return {
        id: item.id,
        title: item.title,
        kind: item.kind,
        thumbnailUrl: absoluteFromKeyra(item.thumbnailUrl) ?? mediaUrl,
        mediaUrl,
        mimeType: item.mimeType,
        fileName: item.fileName,
        sizeLabel: item.sizeLabel,
      };
    });
}

export async function listDataRoomLibrary(): Promise<DocumentItem[]> {
  const data = await fetchKeyraLibrary<KeyraDocumentResponse>(
    "/api/public/investor-library/data-rooms",
  );

  return (data?.documents ?? [])
    .filter((item) => item.id && item.title)
    .map((item) => ({
      id: item.id,
      title: item.title,
      kind: item.kind,
      sizeLabel: item.sizeLabel,
      mimeType: item.mimeType,
      fileName: item.fileName,
      previewUrl: absoluteFromKeyra(item.previewUrl),
      downloadUrl: absoluteFromKeyra(item.downloadUrl ?? item.previewUrl),
    }));
}

export async function getMaterialById(id: string): Promise<MaterialItem | undefined> {
  const materials = await listMaterialsLibrary();
  return materials.find((item) => item.id === id);
}

export async function getDocumentById(id: string): Promise<DocumentItem | undefined> {
  const documents = await listDataRoomLibrary();
  return documents.find((item) => item.id === id);
}
