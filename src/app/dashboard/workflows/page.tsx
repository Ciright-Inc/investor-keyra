"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";

const WORKFLOWS = [
  {
    id: "nda",
    title: "NDA request",
    desc: "Execute via esig.keyra.ie — core_signature_request",
    icon: "gavel",
  },
  {
    id: "diligence",
    title: "Diligence access",
    desc: "Permission-based data room unlock",
    icon: "folder_open",
  },
  {
    id: "meeting",
    title: "Executive briefing",
    desc: "Schedule with IR team — CRM sync",
    icon: "groups",
  },
  {
    id: "interest",
    title: "Investment interest",
    desc: "Indicate allocation interest — prospects sync",
    icon: "savings",
  },
  {
    id: "message",
    title: "Secure messaging",
    desc: "Encrypted investor communications",
    icon: "lock",
  },
  {
    id: "accreditation",
    title: "Accreditation verification",
    desc: "Optional workflow when enabled",
    icon: "verified",
  },
];

export default function WorkflowsPage() {
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <DashboardShell>
    <div className="space-y-8">
      <div>
        <p className="ds-caption-uppercase">Investor workflows</p>
        <h1 className="ds-page-title mt-1">Actions & requests</h1>
        <p className="ds-body-md mt-2 max-w-[56ch]">
          NDA, SAFE, SPA, and governance documents route to core_executed_document via
          esig integration. Active investors transition to ir.keyra.ie with full history preserved.
        </p>
      </div>

      {submitted && (
        <p className="rounded-lg border border-[var(--ds-hairline-strong)] bg-[var(--ds-canvas-soft)] px-4 py-3 text-sm text-[var(--ds-success)]">
          Request queued for {submitted}. CRM staging will reflect in crm.keyra.ie.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {WORKFLOWS.map((w) => (
          <GlassCard key={w.id} padding="md">
            <Icon name={w.icon} className="mb-3 text-[var(--ds-ink)]" />
            <h2 className="ds-section-title">{w.title}</h2>
            <p className="ds-body-sm mt-1">{w.desc}</p>
            <button
              type="button"
              className="ds-btn-primary is-sm mt-4"
              onClick={() => setSubmitted(w.title)}
            >
              Initiate
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
    </DashboardShell>
  );
}
