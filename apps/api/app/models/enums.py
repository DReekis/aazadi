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


class GeographicScope(StrEnum):
  world = "world"
  india = "india"
  state = "state"
  city = "city"


class TopicCategory(StrEnum):
  governance = "governance"
  judiciary = "judiciary"
  education = "education"
  environment = "environment"
  economy = "economy"
  infrastructure = "infrastructure"
  corruption = "corruption"
  elections = "elections"
  health = "health"
  public_welfare = "public_welfare"


class ContentDepth(StrEnum):
  pulse_update = "pulse_update"
  standard_report = "standard_report"
  investigation = "investigation"
  evidence_archive = "evidence_archive"


class Urgency(StrEnum):
  breaking = "breaking"
  developing = "developing"
  ongoing = "ongoing"
  archived = "archived"


class EditorialVerificationState(StrEnum):
  preliminary = "preliminary"
  reviewed = "reviewed"
  verified = "verified"
  disputed = "disputed"


class WorkflowStatus(StrEnum):
  draft = "draft"
  review = "review"
  evidence_verification = "evidence_verification"
  editorial_approval = "editorial_approval"
  publish = "publish"
  corrections_layer = "corrections_layer"
  archive = "archive"


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
