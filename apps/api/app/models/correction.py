from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import DateTime, Enum, ForeignKey, Text, func
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.enums import CorrectionSeverity, CorrectionStatus


class Correction(Base):
  __tablename__ = "corrections"

  id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
  article_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("articles.id", ondelete="CASCADE"), index=True)
  created_by_user_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
  severity: Mapped[CorrectionSeverity] = mapped_column(Enum(CorrectionSeverity, name="correction_severity"), nullable=False)
  status: Mapped[CorrectionStatus] = mapped_column(Enum(CorrectionStatus, name="correction_status"), default=CorrectionStatus.open, nullable=False)
  summary: Mapped[str] = mapped_column(Text, nullable=False)
  public_note: Mapped[str | None] = mapped_column(Text)
  issued_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
  resolved_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

  article = relationship("Article", back_populates="corrections")
