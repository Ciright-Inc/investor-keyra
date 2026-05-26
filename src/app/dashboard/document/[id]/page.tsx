import { notFound } from "next/navigation";
import { DocumentPreviewView } from "@/components/library/DocumentPreviewView";
import { getDocumentById } from "@/lib/investor-library-data";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DocumentPreviewPage({ params }: PageProps) {
  const { id } = await params;
  const item = await getDocumentById(id);
  if (!item) notFound();

  return <DocumentPreviewView item={item} backHref="/dashboard?tab=data-room" />;
}
