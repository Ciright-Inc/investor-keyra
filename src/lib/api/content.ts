import { coreFetch, keyraFetch } from "@/lib/api/client";
import type { CoreContentAsset, CoreContentViewLog } from "@/lib/types/core";

/** Deck & intelligence library — integrated from info.keyra.ie */
export async function listContentForProspect(
  prospectId: string,
): Promise<CoreContentAsset[]> {
  return coreFetch<CoreContentAsset[]>(
    `/v1/core/prospect/${prospectId}/content-assets`,
  );
}

export async function logContentView(
  log: Omit<CoreContentViewLog, "viewed_at">,
): Promise<void> {
  await coreFetch("/v1/core/content-view-log", {
    method: "POST",
    body: JSON.stringify({ ...log, viewed_at: new Date().toISOString() }),
  });
}

export async function fetchPublicDecks(): Promise<CoreContentAsset[]> {
  return keyraFetch<CoreContentAsset[]>("/v1/investor/public-decks");
}
