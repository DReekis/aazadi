from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field

from app.models.enums import (
  ContentDepth,
  EditorialVerificationState,
  GeographicScope,
  TopicCategory,
  Urgency,
  WorkflowStatus,
)


class PublicPulseCreate(BaseModel):
  headline: str = Field(min_length=6, max_length=260)
  summary: str = Field(min_length=12)
  geographic_scope: GeographicScope
  region: str = Field(min_length=2, max_length=160)
  district: str | None = Field(default=None, max_length=160)
  topic_category: TopicCategory
  content_depth: ContentDepth = ContentDepth.pulse_update
  urgency: Urgency
  verification_state: EditorialVerificationState
  desk: str = Field(min_length=2, max_length=160)
  evidence_count: int = Field(default=0, ge=0)
  linked_article_id: UUID | None = None


class PublicPulseRead(PublicPulseCreate):
  id: UUID
  created_at: datetime
  updated_at: datetime

  model_config = {"from_attributes": True}


class InvestigationWorkspaceCreate(BaseModel):
  title: str = Field(min_length=6, max_length=260)
  status: WorkflowStatus
  desk: str = Field(min_length=2, max_length=160)
  linked_article_id: UUID | None = None
  collaborators: list[dict] = Field(default_factory=list)
  timeline: list[dict] = Field(default_factory=list)
  source_tracking: list[dict] = Field(default_factory=list)
  discussion_threads: list[dict] = Field(default_factory=list)
  workflow_steps: list[dict] = Field(default_factory=list)


class InvestigationWorkspaceRead(InvestigationWorkspaceCreate):
  id: UUID
  slug: str
  created_at: datetime
  updated_at: datetime

  model_config = {"from_attributes": True}


class CivicMapTagCreate(BaseModel):
  name: str = Field(min_length=2, max_length=180)
  geographic_scope: GeographicScope
  region: str = Field(min_length=2, max_length=160)
  district: str | None = Field(default=None, max_length=160)
  civic_issue: TopicCategory
  latitude: float
  longitude: float
  pulse_count: int = Field(default=0, ge=0)
  investigation_count: int = Field(default=0, ge=0)
  verification_state: EditorialVerificationState


class CivicMapTagRead(CivicMapTagCreate):
  id: UUID
  created_at: datetime

  model_config = {"from_attributes": True}


class GovernanceProposalCreate(BaseModel):
  title: str = Field(min_length=6, max_length=260)
  proposal: str = Field(min_length=20)
  constitutional_reference: str = Field(min_length=4, max_length=260)
  evidence: list[str] = Field(default_factory=list)
  discussion_count: int = Field(default=0, ge=0)
  voting_record: dict = Field(default_factory=dict)
  final_outcome: str | None = None
  status: str = Field(min_length=2, max_length=80)


class GovernanceProposalRead(GovernanceProposalCreate):
  id: UUID
  created_at: datetime
  updated_at: datetime

  model_config = {"from_attributes": True}
