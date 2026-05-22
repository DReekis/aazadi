from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, String, Text, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.enums import (
  ArticleStatus,
  ContentDepth,
  EditorialVerificationState,
  GeographicScope,
  TopicCategory,
  Urgency,
  VerificationState,
)


class Article(Base):
  __tablename__ = "articles"

  id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
  slug: Mapped[str] = mapped_column(String(220), unique=True, index=True, nullable=False)
  title: Mapped[str] = mapped_column(String(260), nullable=False)
  subtitle: Mapped[str] = mapped_column(String(420), nullable=False)
  category: Mapped[str] = mapped_column(String(120), index=True, nullable=False)
  region: Mapped[str] = mapped_column(String(120), index=True, nullable=False)
  geographic_scope: Mapped[GeographicScope] = mapped_column(
    Enum(GeographicScope, name="geographic_scope"), index=True, nullable=False
  )
  topic_category: Mapped[TopicCategory] = mapped_column(
    Enum(TopicCategory, name="topic_category"), index=True, nullable=False
  )
  content_depth: Mapped[ContentDepth] = mapped_column(
    Enum(ContentDepth, name="content_depth"), index=True, nullable=False
  )
  urgency: Mapped[Urgency] = mapped_column(Enum(Urgency, name="urgency"), index=True, nullable=False)
  editorial_verification_state: Mapped[EditorialVerificationState] = mapped_column(
    Enum(EditorialVerificationState, name="editorial_verification_state"), index=True, nullable=False
  )
  civic_issue: Mapped[str] = mapped_column(String(180), index=True, nullable=False)
  district: Mapped[str | None] = mapped_column(String(160), index=True)
  latitude: Mapped[str | None] = mapped_column(String(40))
  longitude: Mapped[str | None] = mapped_column(String(40))
  author_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("journalist_profiles.id", ondelete="RESTRICT"), index=True)
  status: Mapped[ArticleStatus] = mapped_column(Enum(ArticleStatus, name="article_status"), default=ArticleStatus.draft, nullable=False)
  body_markdown: Mapped[str] = mapped_column(Text, nullable=False)
  reading_minutes: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
  published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), index=True)
  verification_status: Mapped[VerificationState] = mapped_column(
    Enum(VerificationState, name="article_verification_state"), default=VerificationState.under_review, nullable=False
  )
  integrity_hash: Mapped[str | None] = mapped_column(String(128), index=True)
  canonical_url: Mapped[str | None] = mapped_column(String(500))
  integrity_metadata: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
  updated_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
  )

  author = relationship("JournalistProfile", back_populates="articles")
  revisions = relationship("ArticleRevision", back_populates="article", cascade="all, delete-orphan")
  evidence_items = relationship("Evidence", back_populates="article")
  corrections = relationship("Correction", back_populates="article")
  comments = relationship("Comment", back_populates="article")


class ArticleRevision(Base):
  __tablename__ = "article_revisions"
  __table_args__ = (UniqueConstraint("article_id", "version", name="uq_article_revision_version"),)

  id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
  article_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("articles.id", ondelete="CASCADE"), index=True)
  version: Mapped[int] = mapped_column(Integer, nullable=False)
  editor_user_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
  title: Mapped[str] = mapped_column(String(260), nullable=False)
  subtitle: Mapped[str] = mapped_column(String(420), nullable=False)
  body_markdown: Mapped[str] = mapped_column(Text, nullable=False)
  diff_summary: Mapped[str] = mapped_column(Text, nullable=False)
  integrity_hash: Mapped[str | None] = mapped_column(String(128))
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

  article = relationship("Article", back_populates="revisions")
