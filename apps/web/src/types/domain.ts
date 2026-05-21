export type EvidenceType = "image" | "pdf" | "external_link" | "transcript";
export type VerificationState = "verified" | "under_review" | "challenged" | "rejected";
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
