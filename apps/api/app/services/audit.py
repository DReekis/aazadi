from uuid import UUID

from sqlalchemy.orm import Session

from app.models.audit import AuditLog


def write_audit_log(
  db: Session,
  *,
  action: str,
  resource_type: str,
  actor_user_id: UUID | None = None,
  resource_id: UUID | None = None,
  ip_address: str | None = None,
  user_agent: str | None = None,
  metadata: dict | None = None,
) -> AuditLog:
  entry = AuditLog(
    actor_user_id=actor_user_id,
    action=action,
    resource_type=resource_type,
    resource_id=resource_id,
    ip_address=ip_address,
    user_agent=user_agent,
    audit_metadata=metadata or {},
  )
  db.add(entry)
  return entry
