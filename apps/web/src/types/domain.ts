export type EvidenceType = "image" | "pdf" | "external_link" | "transcript";
export type VerificationState = "verified" | "under_review" | "challenged" | "rejected";
export type GeographicScope = "World" | "India" | "State" | "City";
export type TopicCategory =
  | "Governance"
  | "Judiciary"
  | "Education"
  | "Environment"
  | "Economy"
  | "Infrastructure"
  | "Corruption"
  | "Elections"
  | "Health"
  | "Public Welfare";
export type ContentDepth = "Pulse Update" | "Standard Report" | "Investigation" | "Evidence Archive";
export type Urgency = "Breaking" | "Developing" | "Ongoing" | "Archived";
export type EditorialVerificationState = "Preliminary" | "Reviewed" | "Verified" | "Disputed";
export type CommentType =
  | "correction_suggestion"
  | "evidence_challenge"
  | "contextual_addition"
  | "public_discussion";

export type Journalist = {
  slug: string;
  name: string;
  title: string;
  region: string;
  beats: string[];
  bio: string;
  reliabilityScore: number;
  verifiedReports: number;
  correctionsIssued: number;
  joinedAt: string;
  governanceParticipation: number;
};

export type EvidenceItem = {
  id: string;
  title: string;
  type: EvidenceType;
  verificationState: VerificationState;
  uploader: string;
  uploadedAt: string;
  summary: string;
  sourceUrl?: string;
};

export type ArticleRevision = {
  version: number;
  timestamp: string;
  editor: string;
  summary: string;
  diff: string;
};

export type Correction = {
  id: string;
  articleSlug: string;
  articleTitle: string;
  issuedAt: string;
  status: "open" | "resolved" | "archived";
  severity: "minor" | "substantial" | "material";
  summary: string;
};

export type StructuredComment = {
  id: string;
  type: CommentType;
  author: string;
  createdAt: string;
  status: "pending_review" | "published" | "resolved";
  body: string;
};

export type Article = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  region: string;
  geographicScope: GeographicScope;
  topicCategory: TopicCategory;
  contentDepth: ContentDepth;
  urgency: Urgency;
  editorialVerificationState: EditorialVerificationState;
  civicIssue: string;
  district?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  author: Journalist;
  publishedAt: string;
  readingMinutes: number;
  imageUrl: string;
  imageAlt: string;
  dek: string;
  body: string[];
  evidence: EvidenceItem[];
  revisions: ArticleRevision[];
  corrections: Correction[];
  comments: StructuredComment[];
  integrity: {
    verificationStatus: "verified" | "provisionally_verified" | "review_pending";
    evidenceCount: number;
    revisionCount: number;
    correctionStatus: "none" | "corrected" | "under_review";
    canonicalHash: string;
    lastReviewedAt: string;
  };
};

export type GovernanceLog = {
  id: string;
  title: string;
  category: "journalist_approval" | "moderation" | "correction" | "policy" | "security";
  timestamp: string;
  actor: string;
  publicSummary: string;
  outcome: string;
};

export type PulseZone = "India" | "World" | "States" | "Cities";

export type PublicPulseItem = {
  id: string;
  zone: PulseZone;
  region: string;
  category: TopicCategory | "US Politics" | "Europe Policy" | "Middle East Conflict";
  headline: string;
  summary: string;
  urgency: Urgency;
  verificationState: EditorialVerificationState;
  updatedAt: string;
  evidenceCount: number;
  linkedArticleSlug?: string;
  desk: string;
};

export type RegionalDesk = {
  slug: string;
  name: string;
  scope: GeographicScope;
  region: string;
  lead: string;
  pulseCount: number;
  activeInvestigations: number;
  evidenceReviews: number;
  journalists: string[];
  civicIssues: string[];
  summary: string;
};

export type InvestigationWorkspace = {
  slug: string;
  title: string;
  status: "Draft" | "Review" | "Evidence Verification" | "Editorial Approval" | "Publish" | "Corrections Layer" | "Archive";
  desk: string;
  lead: string;
  collaborators: string[];
  timeline: Array<{ date: string; event: string; state: string }>;
  sourceTracking: Array<{ source: string; protection: string; status: string }>;
  evidenceIds: string[];
  discussionThreads: Array<{ title: string; type: string; status: string; comments: number }>;
  publicationWorkflow: Array<{ step: string; status: "complete" | "active" | "blocked" | "waiting" }>;
};

export type EvidenceVaultRecord = EvidenceItem & {
  desk: string;
  articleSlug?: string;
  custodyState: "Received" | "Hash recorded" | "Verification review" | "Cleared" | "Disputed";
  officialRecord: boolean;
};

export type GovernanceProposal = {
  id: string;
  title: string;
  proposal: string;
  constitutionalReference: string;
  evidence: string[];
  discussionCount: number;
  votingRecord: {
    approve: number;
    reject: number;
    abstain: number;
  };
  finalOutcome: string;
  status: "Open" | "Voting" | "Resolved" | "Appeal";
};

export type CivicMapRegion = {
  id: string;
  name: string;
  scope: GeographicScope;
  lat: number;
  lng: number;
  issue: TopicCategory;
  pulseCount: number;
  investigationCount: number;
  verificationState: EditorialVerificationState;
};
