from enum import StrEnum


class UserRole(StrEnum):
  reader = "reader"
  journalist = "journalist"
  editor = "editor"
  moderator = "moderator"
  admin = "admin"
  api_partner = "api_partner"


class JournalistStatus(StrEnum):
  pending = "pending"
  approved = "approved"
  suspended = "suspended"
  rejected = "rejected"


class ArticleStatus(StrEnum):
  draft = "draft"
  review = "review"
  published = "published"
  archived = "archived"


class VerificationState(StrEnum):
  verified = "verified"
  under_review = "under_review"
  challenged = "challenged"
  rejected = "rejected"


class EvidenceType(StrEnum):
  image = "image"
  pdf = "pdf"
  external_link = "external_link"
  transcript = "transcript"


class CommentType(StrEnum):
  correction_suggestion = "correction_suggestion"
  evidence_challenge = "evidence_challenge"
  contextual_addition = "contextual_addition"
  public_discussion = "public_discussion"


class CommentStatus(StrEnum):
  pending_review = "pending_review"
  published = "published"
  resolved = "resolved"
  removed = "removed"


class GovernanceCategory(StrEnum):
  journalist_approval = "journalist_approval"
  moderation = "moderation"
  correction = "correction"
  policy = "policy"
  security = "security"


class VoteValue(StrEnum):
  approve = "approve"
  reject = "reject"
  abstain = "abstain"


class CorrectionSeverity(StrEnum):
  minor = "minor"
  substantial = "substantial"
  material = "material"


class CorrectionStatus(StrEnum):
  open = "open"
  resolved = "resolved"
  archived = "archived"


class SubscriptionStatus(StrEnum):
  active = "active"
  past_due = "past_due"
  cancelled = "cancelled"
