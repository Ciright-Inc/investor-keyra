import { InvestorAuthGuard } from "@/components/auth/investor-auth-guard";
import { InvestorBootstrapGate } from "@/components/auth/investor-bootstrap-gate";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <InvestorBootstrapGate>
      <InvestorAuthGuard>{children}</InvestorAuthGuard>
    </InvestorBootstrapGate>
  );
}
