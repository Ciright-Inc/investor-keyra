import { API_BASE, CIRIGHT_CORE_BASE } from "@/lib/config";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = RequestInit & { base?: string };

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return {} as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ApiError("Invalid JSON response", res.status, text);
  }
}

export async function coreFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const base = options.base ?? CIRIGHT_CORE_BASE;
  const { base: _b, ...init } = options;
  const url = `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers ?? {}),
    },
    credentials: "include",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => undefined);
    throw new ApiError(`API ${res.status}: ${path}`, res.status, body);
  }

  return parseJson<T>(res);
}

export async function keyraFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  return coreFetch<T>(path, { ...options, base: API_BASE });
}
