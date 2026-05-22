from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, Numeric, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.models.enums import (
  ContentDepth,
  EditorialVerificationState,
  GeographicScope,
  TopicCategory,
  Urgency,
  WorkflowStatus,
)


class PublicPulseItem(Base):
  __tablename__ = "public_pulse_items"

  id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
  headline: Mapped[str] = mapped_column(String(260), nullable=False)
  summary: Mapped[str] = mapped_column(Text, nullable=False)
  geographic_scope: Mapped[GeographicScope] = mapped_column(Enum(GeographicScope, name="pulse_geographic_scope"), index=True, nullable=False)
  region: Mapped[str] = mapped_column(String(160), index=True, nullable=False)
  district: Mapped[str | None] = mapped_column(String(160), index=True)
  topic_category: Mapped[TopicCategory] = mapped_column(Enum(TopicCategory, name="pulse_topic_category"), index=True, nullable=False)
  content_depth: Mapped[ContentDepth] = mapped_column(Enum(ContentDepth, name="pulse_content_depth"), default=ContentDepth.pulse_update, nullable=False)
  urgency: Mapped[Urgency] = mapped_column(Enum(Urgency, name="pulse_urgency"), index=True, nullable=False)
  verification_state: Mapped[EditorialVerificationState] = mapped_column(
    Enum(EditorialVerificationState, name="pulse_editorial_verification_state"), index=True, nullable=False
  )
  desk: Mapped[str] = mapped_column(String(160), index=True, nullable=False)
  evidence_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
  linked_article_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("articles.id", ondelete="SET NULL"), index=True)
  created_by_user_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
  pulse_metadata: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
  updated_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
  )


class InvestigationWorkspace(Base):
  __tablename__ = "investigation_workspaces"

  id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
  slug: Mapped[str] = mapped_column(String(220), unique=True, index=True, nullable=False)
  title: Mapped[str] = mapped_column(String(260), nullable=False)
  status: Mapped[WorkflowStatus] = mapped_column(Enum(WorkflowStatus, name="workflow_status"), index=True, nullable=False)
  desk: Mapped[str] = mapped_column(String(160), index=True, nullable=False)
  lead_user_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
  linked_article_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("articles.id", ondelete="SET NULL"), index=True)
  collaborators: Mapped[list[dict]] = mapped_column(JSONB, default=list, nullable=False)
  timeline: Mapped[list[dict]] = mapped_column(JSONB, default=list, nullable=False)
  source_tracking: Mapped[list[dict]] = mapped_column(JSONB, default=list, nullable=False)
  discussion_threads: Mapped[list[dict]] = mapped_column(JSONB, default=list, nullable=False)
  workflow_steps: Mapped[list[dict]] = mapped_column(JSONB, default=list, nullable=False)
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
  updated_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
  )


class CivicMapTag(Base):
  __tablename__ = "civic_map_tags"

  id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
  name: Mapped[str] = mapped_column(String(180), nullable=False)
  geographic_scope: Mapped[GeographicScope] = mapped_column(Enum(GeographicScope, name="map_geographic_scope"), index=True, nullable=False)
  region: Mapped[str] = mapped_column(String(160), index=True, nullable=False)
  district: Mapped[str | None] = mapped_column(String(160), index=True)
  civic_issue: Mapped[TopicCategory] = mapped_column(Enum(TopicCategory, name="map_topic_category"), index=True, nullable=False)
  latitude: Mapped[float] = mapped_column(Numeric(9, 6), nullable=False)
  longitude: Mapped[float] = mapped_column(Numeric(9, 6), nullable=False)
  pulse_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
  investigation_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
  verification_state: Mapped[EditorialVerificationState] = mapped_column(
    Enum(EditorialVerificationState, name="map_editorial_verification_state"), nullable=False
  )
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class GovernanceProposal(Base):
  __tablename__ = "governance_proposals"

  id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
  title: Mapped[str] = mapped_column(String(260), nullable=False)
  proposal: Mapped[str] = mapped_column(Text, nullable=False)
  constitutional_reference: Mapped[str] = mapped_column(String(260), nullable=False)
  evidence: Mapped[list[str]] = mapped_column(JSONB, default=list, nullable=False)
  discussion_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
  voting_record: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
  final_outcome: Mapped[str | None] = mapped_column(Text)
  status: Mapped[str] = mapped_column(String(80), index=True, nullable=False)
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
  updated_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
  )
