from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.db.session import get_db
from app.models.article import Article
from app.models.correction import Correction
from app.models.enums import UserRole
from app.models.user import User
from app.schemas.correction import CorrectionCreate, CorrectionRead
from app.services.audit import write_audit_log

router = APIRouter(prefix="/corrections", tags=["corrections"])


@router.get("", response_model=list[CorrectionRead])
def list_corrections(db: Session = Depends(get_db)) -> list[Correction]:
  return list(db.scalars(select(Correction).order_by(Correction.issued_at.desc()).limit(100)))


@router.post("", response_model=CorrectionRead, status_code=status.HTTP_201_CREATED)
def create_correction(
  payload: CorrectionCreate,
  db: Session = Depends(get_db),
  user: User = Depends(require_roles(UserRole.editor, UserRole.admin)),
) -> Correction:
  if not db.get(Article, payload.article_id):
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
  correction = Correction(
    article_id=payload.article_id,
    created_by_user_id=user.id,
    severity=payload.severity,
    summary=payload.summary,
    public_note=payload.public_note,
  )
  db.add(correction)
  db.flush()
  write_audit_log(db, action="correction.create", resource_type="correction", actor_user_id=user.id, resource_id=correction.id)
  db.commit()
  db.refresh(correction)
  return correction
