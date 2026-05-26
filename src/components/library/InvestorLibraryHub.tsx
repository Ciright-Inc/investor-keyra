"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Icon } from "@/components/ui/Icon";
import type { DocumentItem, MaterialItem } from "@/lib/investor-library-data";

type LibraryTab = "materials" | "data-room";

function MaterialCard({ item }: { item: MaterialItem }) {
  return (
    <Link
      href={`/dashboard/media/${item.id}`}
      className="investor-library-card group block overflow-hidden rounded-lg border border-[var(--ds-hairline-strong)] bg-[var(--ds-canvas)] transition-shadow hover:shadow-[var(--ds-shadow-soft)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--ds-surface-strong)]">
        {item.kind === "video" ? (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950 text-white">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-md">
              <Icon name="play_arrow" size={28} className="text-[var(--ds-ink)]" />
            </span>
            <span className="text-xs font-medium text-white/75">Video</span>
          </span>
        ) : (
          <Image
            src={item.thumbnailUrl}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 50vw, 25vw"
            unoptimized
          />
        )}
      </div>
      <div className="flex items-center gap-2 border-t border-[var(--ds-hairline)] px-3 py-2.5">
        <Icon
          name={item.kind === "video" ? "videocam" : "image"}
          size={18}
          className="text-[var(--ds-muted)]"
        />
        <span className="truncate text-sm font-medium text-[var(--ds-ink)]">
          {item.title}
        </span>
      </div>
    </Link>
  );
}

function documentIcon(kind: DocumentItem["kind"]) {
  if (kind === "pdf") return "picture_as_pdf";
  if (kind === "sheet") return "table_chart";
  return "description";
}

function DocumentCard({ item }: { item: DocumentItem }) {
  return (
    <Link
      href={`/dashboard/document/${item.id}`}
      className="investor-library-card group block overflow-hidden rounded-lg border border-[var(--ds-hairline-strong)] bg-[var(--ds-canvas)] transition-shadow hover:shadow-[var(--ds-shadow-soft)]"
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-[var(--ds-surface-strong)]">
        <Icon name={documentIcon(item.kind)} size={56} className="text-[var(--ds-muted-soft)]" />
      </div>
      <div className="border-t border-[var(--ds-hairline)] px-3 py-3">
        <p className="truncate text-sm font-semibold text-[var(--ds-ink)]">{item.title}</p>
        <p className="mt-0.5 text-xs text-[var(--ds-muted)]">{item.sizeLabel}</p>
      </div>
    </Link>
  );
}

type InvestorLibraryHubProps = {
  materials: MaterialItem[];
  documents: DocumentItem[];
};

function EmptyLibraryState({ label }: { label: string }) {
  return (
    <div className="col-span-full rounded-lg border border-dashed border-[var(--ds-hairline-strong)] bg-[var(--ds-canvas)] px-6 py-10 text-center">
      <p className="text-sm font-semibold text-[var(--ds-ink)]">No {label} available yet</p>
      <p className="mt-1 text-sm text-[var(--ds-body)]">
        Items added by Keyra admins will appear here automatically.
      </p>
    </div>
  );
}

export function InvestorLibraryHub({ materials, documents }: InvestorLibraryHubProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab: LibraryTab = tabParam === "data-room" ? "data-room" : "materials";

  const setTabHref = useCallback(
    (tab: LibraryTab) => (tab === "materials" ? "/dashboard" : "/dashboard?tab=data-room"),
    [],
  );

  const grid = useMemo(() => {
    if (activeTab === "data-room") {
      if (documents.length === 0) return <EmptyLibraryState label="data room documents" />;
      return documents.map((item) => <DocumentCard key={item.id} item={item} />);
    }
    if (materials.length === 0) return <EmptyLibraryState label="materials" />;
    return materials.map((item) => <MaterialCard key={item.id} item={item} />);
  }, [activeTab, documents, materials]);

  return (
    <div className="space-y-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={setTabHref("materials")}
          className={`investor-tab ${activeTab === "materials" ? "is-active" : ""}`}
        >
          <span className="mb-2 flex items-center gap-2">
            <Icon name="perm_media" size={20} />
            <span className="text-base font-semibold">Materials</span>
          </span>
          <span className="investor-tab-sub">Images, videos, and brand assets</span>
        </Link>
        <Link
          href={setTabHref("data-room")}
          className={`investor-tab ${activeTab === "data-room" ? "is-active" : ""}`}
        >
          <span className="mb-2 flex items-center gap-2">
            <Icon name="folder" size={20} />
            <span className="text-base font-semibold">Data Room</span>
          </span>
          <span className="investor-tab-sub">Documents, PDFs, and financials</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{grid}</div>
    </div>
  );
}
