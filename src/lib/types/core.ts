/** Shared Ciright Core entity shapes — IDs must align across Keyra apps */

export type SharedId = string;

export interface CoreUser {
  user_id: SharedId;
  email: string;
  first_name?: string;
  last_name?: string;
}

export interface CoreProspect {
  prospect_id: SharedId;
  person_id?: SharedId;
  organization_id?: SharedId;
  investor_id?: SharedId;
  customer_id?: SharedId;
  lead_source_id?: SharedId;
  status: "new" | "qualified" | "engaged" | "converted" | "archived";
}

export interface CoreInvestorProfile {
  investor_id: SharedId;
  prospect_id: SharedId;
  investor_type:
    | "family_office"
    | "venture"
    | "pe"
    | "sovereign"
    | "strategic"
    | "angel"
    | "institutional";
  interest_areas: string[];
  accreditation_status?: "pending" | "verified" | "not_required";
}

export interface CoreContentAsset {
  content_asset_id: SharedId;
  document_id?: SharedId;
  title: string;
  type: "deck" | "pdf" | "video" | "html" | "briefing";
  source_url?: string;
  permissions?: string[];
}

export interface CoreContentViewLog {
  content_asset_id: SharedId;
  prospect_id: SharedId;
  duration_seconds: number;
  slide_completion?: number;
  viewed_at: string;
}

export interface EngagementScores {
  engagement_score: number;
  qualification_score: number;
  readiness_score: number;
}
