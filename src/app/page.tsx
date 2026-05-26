import { PublicNav } from "@/components/layout/PublicNav";
import { Hero } from "@/components/landing/Hero";
import { NarrativeSection } from "@/components/landing/NarrativeSection";
import { MetricsPanel } from "@/components/landing/MetricsPanel";
import { DeckLibraryPreview } from "@/components/landing/DeckLibraryPreview";

export default function HomePage() {
  return (
    <div className="ds-site min-h-screen">
      <PublicNav />
      <main>
        <Hero />
        <NarrativeSection />
        <MetricsPanel />
        <DeckLibraryPreview />
      </main>
      <footer className="border-t border-[var(--ds-hairline-strong)] py-8">
        <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-4 px-[clamp(20px,4vw,48px)]">
          <p className="ds-body-sm">© Keyra · Ciright · investors.keyra.ie</p>
          <p className="ds-body-sm">Enterprise confidential · Not for public distribution</p>
        </div>
      </footer>
    </div>
  );
}
