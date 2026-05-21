from datetime import datetime
from decimal import Decimal
from uuid import UUID, uuid4

from sqlalchemy import DateTime, Enum, ForeignKey, Numeric, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.enums import JournalistStatus


class JournalistProfile(Base):
  __tablename__ = "journalist_profiles"

  id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
  user_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), unique=True)
  slug: Mapped[str] = mapped_column(String(180), unique=True, index=True, nullable=False)
  display_name: Mapped[str] = mapped_column(String(160), nullable=False)
  title: Mapped[str] = mapped_column(String(160), nullable=False)
  region: Mapped[str] = mapped_column(String(120), index=True, nullable=False)
  bio: Mapped[str] = mapped_column(Text, nullable=False)
  beats: Mapped[list[str]] = mapped_column(JSONB, default=list, nullable=False)
  status: Mapped[JournalistStatus] = mapped_column(
    Enum(JournalistStatus, name="journalist_status"), default=JournalistStatus.pending, nullable=False
  )
  reliability_score: Mapped[Decimal] = mapped_column(Numeric(5, 2), default=0, nullable=False)
  verified_reports_count: Mapped[int] = mapped_column(default=0, nullable=False)
  correction_count: Mapped[int] = mapped_column(default=0, nullable=False)
  governance_participation_score: Mapped[Decimal] = mapped_column(Numeric(5, 2), default=0, nullable=False)
  approved_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
  approved_by_user_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
  updated_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
  )

  user = relationship("User", foreign_keys=[user_id], back_populates="journalist_profile")
  articles = relationship("Article", back_populates="author")


class JournalistApplication(Base):
  __tablename__ = "journalist_applications"

  id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
  applicant_user_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
  full_name: Mapped[str] = mapped_column(String(160), nullable=False)
  email: Mapped[str] = mapped_column(String(320), index=True, nullable=False)
  region: Mapped[str] = mapped_column(String(120), nullable=False)
  affiliation: Mapped[str | None] = mapped_column(String(180))
  evidence_practice_statement: Mapped[str] = mapped_column(Text, nullable=False)
  work_samples: Mapped[list[str]] = mapped_column(JSONB, default=list, nullable=False)
  conflicts_disclosure: Mapped[str | None] = mapped_column(Text)
  status: Mapped[JournalistStatus] = mapped_column(
    Enum(JournalistStatus, name="journalist_application_status"), default=JournalistStatus.pending, nullable=False
  )
  reviewed_by_user_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
  reviewed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
