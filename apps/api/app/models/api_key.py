from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import DateTime, ForeignKey, Integer, String, func
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class ApiKey(Base):
  __tablename__ = "api_keys"

  id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
  owner_user_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)
  name: Mapped[str] = mapped_column(String(160), nullable=False)
  prefix: Mapped[str] = mapped_column(String(16), unique=True, index=True, nullable=False)
  key_hash: Mapped[str] = mapped_column(String(255), nullable=False)
  scopes: Mapped[list[str]] = mapped_column(JSONB, default=list, nullable=False)
  monthly_quota: Mapped[int] = mapped_column(Integer, default=1000, nullable=False)
  last_used_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
  expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
  revoked_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
  created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
