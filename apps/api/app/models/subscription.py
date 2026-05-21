from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import DateTime, Enum, ForeignKey, String, func
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.models.enums import SubscriptionStatus


class Subscription(Base):
  __tablename__ = "subscriptions"

  id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
  user_id: Mapped[UUID | None] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), index=True)
  email: Mapped[str] = mapped_column(String(320), index=True, nullable=False)
  tier: Mapped[str] = mapped_column(String(80), default="public_supporter", nullable=False)
  status: Mapped[SubscriptionStatus] = mapped_column(Enum(SubscriptionStatus, name="subscription_status"), default=SubscriptionStatus.active, nullable=False)
  subscription_metadata: Mapped[dict] = mapped_column(JSONB, default=dict, nullable=False)
  started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
  expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
