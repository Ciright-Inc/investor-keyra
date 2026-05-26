import { notFound } from "next/navigation";
import { MediaPreviewView } from "@/components/library/MediaPreviewView";
import { getMaterialById } from "@/lib/investor-library-data";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function MediaPreviewPage({ params }: PageProps) {
  const { id } = await params;
  const item = await getMaterialById(id);
  if (!item) notFound();

  return <MediaPreviewView item={item} backHref="/dashboard" />;
}
