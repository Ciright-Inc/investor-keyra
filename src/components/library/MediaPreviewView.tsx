"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { MaterialItem } from "@/lib/investor-library-data";

type MediaPreviewViewProps = {
  item: MaterialItem;
  backHref: string;
};

export function MediaPreviewView({ item, backHref }: MediaPreviewViewProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0a]">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-white/90 no-underline transition-colors hover:text-white hover:no-underline"
        >
          <Icon name="arrow_back" size={20} />
          Back to library
        </Link>
        <p className="max-w-[50vw] truncate text-sm font-medium text-white">{item.title}</p>
        <span className="w-24" aria-hidden />
      </header>
      <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8">
        {item.kind === "video" ? (
          <video
            key={item.mediaUrl}
            src={item.mediaUrl}
            controls
            autoPlay
            playsInline
            className="max-h-full max-w-full rounded-md"
          >
            <track kind="captions" />
          </video>
        ) : (
          <div className="relative h-full w-full max-h-[calc(100vh-7rem)] max-w-6xl">
            <Image
              src={item.mediaUrl}
              alt={item.title}
              fill
              className="object-contain"
              sizes="100vw"
              priority
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  );
}
