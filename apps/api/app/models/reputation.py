from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class ReputationEvent(Base):
  __tablename__ = "reputation_events"

  id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
  journalist_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("journalist_profiles.id", ondelete="CASCADE"), index=True)
  article_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("articles.id", ondelete="SET NULL"), index=True)
  event_type: Mapped[str] = mapped_column(String(120), nullable=False)
  delta: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
  reason: Mapped[str] = mapped_column(Text, nullable=False)
  event_metadata: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
  created_by_user_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
