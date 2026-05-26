import { Suspense } from "react";
import { InvestorLibraryHub } from "@/components/library/InvestorLibraryHub";
import { InvestorPortalShell } from "@/components/layout/InvestorPortalShell";
import {
  listDataRoomLibrary,
  listMaterialsLibrary,
} from "@/lib/investor-library-data";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [materials, documents] = await Promise.all([
    listMaterialsLibrary(),
    listDataRoomLibrary(),
  ]);

  return (
    <InvestorPortalShell>
      <Suspense fallback={<p className="ds-body-md">Loading library…</p>}>
        <InvestorLibraryHub materials={materials} documents={documents} />
      </Suspense>
    </InvestorPortalShell>
  );
}
