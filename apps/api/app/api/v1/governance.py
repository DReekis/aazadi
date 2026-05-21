from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_roles
from app.db.session import get_db
from app.models.enums import UserRole
from app.models.governance import GovernanceLog, GovernanceVote
from app.models.user import User
from app.schemas.governance import GovernanceLogCreate, GovernanceLogRead, GovernanceVoteCreate
from app.services.audit import write_audit_log

router = APIRouter(prefix="/governance", tags=["governance"])


@router.get("/logs", response_model=list[GovernanceLogRead])
def list_logs(db: Session = Depends(get_db)) -> list[GovernanceLog]:
  return list(db.scalars(select(GovernanceLog).order_by(GovernanceLog.created_at.desc()).limit(100)))


@router.post("/logs", response_model=GovernanceLogRead, status_code=status.HTTP_201_CREATED)
def create_log(
  payload: GovernanceLogCreate,
  db: Session = Depends(get_db),
  user: User = Depends(require_roles(UserRole.editor, UserRole.moderator, UserRole.admin)),
) -> GovernanceLog:
  log = GovernanceLog(
    title=payload.title,
    category=payload.category,
    actor_user_id=user.id,
    public_summary=payload.public_summary,
    outcome=payload.outcome,
    resource_type=payload.resource_type,
    resource_id=payload.resource_id,
  )
  db.add(log)
  db.flush()
  write_audit_log(db, action="governance_log.create", resource_type="governance_log", actor_user_id=user.id, resource_id=log.id)
  db.commit()
  db.refresh(log)
  return log


@router.post("/logs/{log_id}/votes", status_code=status.HTTP_201_CREATED)
def vote_on_log(
  log_id: UUID,
  payload: GovernanceVoteCreate,
  db: Session = Depends(get_db),
  user: User = Depends(get_current_user),
) -> dict[str, str]:
  if not db.get(GovernanceLog, log_id):
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Governance log not found")
  existing = db.scalar(select(GovernanceVote).where(GovernanceVote.log_id == log_id, GovernanceVote.user_id == user.id))
  if existing:
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Vote already recorded")

  vote = GovernanceVote(log_id=log_id, user_id=user.id, vote=payload.vote, rationale=payload.rationale)
  db.add(vote)
  write_audit_log(db, action="governance_vote.create", resource_type="governance_log", actor_user_id=user.id, resource_id=log_id)
  db.commit()
  return {"status": "recorded"}
