export const HERO_STATEMENTS = [
  "The Trust Infrastructure Layer For The AI Era",
  "Identity. Telecom. AI. Infrastructure.",
  "The Operating System For Verified Human Presence",
  "Securing The Future Of Digital Civilization",
] as const;

export const NARRATIVE_THEMES = [
  {
    id: "trust-collapse",
    title: "AI Trust Collapse",
    body: "As agentic systems scale, deterministic human presence becomes the scarce asset. Keyra anchors identity at the telecom layer—not in brittle app silos.",
    icon: "shield",
  },
  {
    id: "telecom-root",
    title: "Telecom-Rooted Authentication",
    body: "SIM-bound trust, carrier-grade reach, and sovereign-grade identity verification form the substrate for verified presence at global scale.",
    icon: "cell_tower",
  },
  {
    id: "infrastructure",
    title: "Infrastructure Ownership",
    body: "Developers embed identity infrastructure once. Enterprises inherit telecom-grade security, auditability, and compliance by design.",
    icon: "hub",
  },
  {
    id: "agentic",
    title: "Agentic AI Verification",
    body: "Deterministic human presence for the agentic era—every API call, every session, every transaction attributable to verified identity.",
    icon: "psychology",
  },
] as const;

export const INVESTOR_METRICS = [
  { label: "Global Telecom Reach", value: "2.4B+", sub: "addressable SIM endpoints" },
  { label: "Identity API TAM", value: "$48B", sub: "projected by 2030" },
  { label: "Developer Ecosystem", value: "12K+", sub: "integration partners" },
  { label: "Auth Volume (proj.)", value: "890M", sub: "annual verifications" },
  { label: "AI Infrastructure Demand", value: "4.2×", sub: "YoY enterprise adoption" },
  { label: "Telecom Integration", value: "140+", sub: "carrier partnerships pipeline" },
] as const;

export const DASHBOARD_NAV = [
  { href: "/dashboard", label: "Library", icon: "perm_media" },
  { href: "/dashboard?tab=data-room", label: "Data Room", icon: "folder_special" },
  { href: "/dashboard/workflows", label: "Workflows", icon: "assignment" },
] as const;
