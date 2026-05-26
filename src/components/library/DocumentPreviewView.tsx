"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { DocumentItem } from "@/lib/investor-library-data";

type DocumentPreviewViewProps = {
  item: DocumentItem;
  backHref: string;
};

function documentIcon(kind: DocumentItem["kind"]) {
  if (kind === "pdf") return "picture_as_pdf";
  if (kind === "sheet") return "table_chart";
  return "description";
}

export function DocumentPreviewView({ item, backHref }: DocumentPreviewViewProps) {
  const canEmbed = Boolean(
    item.previewUrl &&
      (item.kind === "pdf" || item.mimeType?.startsWith("text/")),
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[var(--ds-canvas-soft)]">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--ds-hairline-strong)] bg-[var(--ds-canvas)] px-4 sm:px-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ds-ink)] no-underline hover:no-underline"
        >
          <Icon name="arrow_back" size={20} />
          Back to library
        </Link>
        <p className="max-w-[50vw] truncate text-sm font-semibold text-[var(--ds-ink)]">
          {item.title}
        </p>
        <span className="w-24" aria-hidden />
      </header>

      {canEmbed ? (
        <iframe
          title={item.title}
          src={item.previewUrl}
          className="min-h-0 flex-1 w-full border-0 bg-[#525659]"
        />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <Icon name={documentIcon(item.kind)} size={72} className="text-[var(--ds-muted-soft)]" />
          <div>
            <p className="text-lg font-semibold text-[var(--ds-ink)]">{item.title}</p>
            <p className="mt-1 text-sm text-[var(--ds-body)]">{item.sizeLabel}</p>
          </div>
          <p className="max-w-md text-sm text-[var(--ds-body)]">
            This file type opens best in its native viewer. You can open or download it from the
            read-only data room.
          </p>
          {item.downloadUrl ? (
            <a
              href={item.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--ds-ink)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Open document
            </a>
          ) : null}
        </div>
      )}
    </div>
  );
}
