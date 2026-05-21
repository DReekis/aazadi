from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import DateTime, Enum, ForeignKey, String, Text, func
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.enums import CommentStatus, CommentType


class Comment(Base):
  __tablename__ = "comments"

  id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
  article_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("articles.id", ondelete="CASCADE"), index=True)
  user_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
  author_display_name: Mapped[str] = mapped_column(String(160), nullable=False)
  type: Mapped[CommentType] = mapped_column(Enum(CommentType, name="comment_type"), nullable=False)
  status: Mapped[CommentStatus] = mapped_column(Enum(CommentStatus, name="comment_status"), default=CommentStatus.pending_review, nullable=False)
  body: Mapped[str] = mapped_column(Text, nullable=False)
  moderator_note: Mapped[str | None] = mapped_column(Text)
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
  resolved_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

  article = relationship("Article", back_populates="comments")
