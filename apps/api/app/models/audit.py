from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import DateTime, ForeignKey, String, func
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class AuditLog(Base):
  __tablename__ = "audit_logs"

  id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
  actor_user_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), index=True)
  action: Mapped[str] = mapped_column(String(160), index=True, nullable=False)
  resource_type: Mapped[str] = mapped_column(String(120), index=True, nullable=False)
  resource_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), index=True)
  ip_address: Mapped[str | None] = mapped_column(String(64))
  user_agent: Mapped[str | None] = mapped_column(String(255))
  audit_metadata: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
