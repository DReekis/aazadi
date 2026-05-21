from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import DateTime, Enum, ForeignKey, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.enums import EvidenceType, VerificationState


class Evidence(Base):
  __tablename__ = "evidence"

  id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
  article_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("articles.id", ondelete="CASCADE"), index=True)
  uploader_user_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
  title: Mapped[str] = mapped_column(String(240), nullable=False)
  type: Mapped[EvidenceType] = mapped_column(Enum(EvidenceType, name="evidence_type"), nullable=False)
  verification_state: Mapped[VerificationState] = mapped_column(
    Enum(VerificationState, name="evidence_verification_state"), default=VerificationState.under_review, nullable=False
  )
  storage_uri: Mapped[str | None] = mapped_column(String(600))
  source_url: Mapped[str | None] = mapped_column(String(600))
  mime_type: Mapped[str | None] = mapped_column(String(120))
  byte_size: Mapped[int | None] = mapped_column()
  sha256_hash: Mapped[str | None] = mapped_column(String(128), index=True)
  transcript_text: Mapped[str | None] = mapped_column(Text)
  evidence_metadata: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
  uploaded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
  verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
  verified_by_user_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))

  article = relationship("Article", back_populates="evidence_items")
