import { GlassCard } from "@/components/ui/GlassCard";

type Props = {
  engagement: number;
  qualification: number;
  readiness: number;
};

export function EngagementScores({ engagement, qualification, readiness }: Props) {
  const items = [
    { label: "Engagement", value: engagement },
    { label: "Qualification", value: qualification },
    { label: "Readiness", value: readiness },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <GlassCard key={item.label} padding="md">
          <p className="ds-caption-uppercase">{item.label} score</p>
          <p className="ds-metric mt-2">{item.value}</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--ds-surface-strong)]">
            <div
              className="h-full rounded-full bg-[var(--ds-ink)] transition-all"
              style={{ width: `${Math.min(100, item.value)}%` }}
            />
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
