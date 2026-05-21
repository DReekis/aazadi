from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import DateTime, Enum, ForeignKey, String, Text, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.enums import GovernanceCategory, VoteValue


class GovernanceLog(Base):
  __tablename__ = "governance_logs"

  id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
  title: Mapped[str] = mapped_column(String(260), nullable=False)
  category: Mapped[GovernanceCategory] = mapped_column(Enum(GovernanceCategory, name="governance_category"), index=True, nullable=False)
  actor_user_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
  public_summary: Mapped[str] = mapped_column(Text, nullable=False)
  outcome: Mapped[str] = mapped_column(String(260), nullable=False)
  resource_type: Mapped[str | None] = mapped_column(String(120))
  resource_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True))
  governance_metadata: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

  votes = relationship("GovernanceVote", back_populates="log", cascade="all, delete-orphan")


class GovernanceVote(Base):
  __tablename__ = "governance_votes"
  __table_args__ = (UniqueConstraint("log_id", "user_id", name="uq_governance_vote_user"),)

  id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
  log_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("governance_logs.id", ondelete="CASCADE"), index=True)
  user_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)
  vote: Mapped[VoteValue] = mapped_column(Enum(VoteValue, name="vote_value"), nullable=False)
  rationale: Mapped[str | None] = mapped_column(Text)
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

  log = relationship("GovernanceLog", back_populates="votes")
