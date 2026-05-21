from datetime import UTC, datetime
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.db.session import get_db
from app.models.enums import JournalistStatus, UserRole
from app.models.journalist import JournalistApplication, JournalistProfile
from app.models.user import User
from app.schemas.journalist import JournalistApplicationCreate, JournalistApplicationRead, JournalistRead
from app.services.audit import write_audit_log
from app.services.integrity import slugify

router = APIRouter(prefix="/journalists", tags=["journalists"])


@router.get("", response_model=list[JournalistRead])
def list_journalists(db: Session = Depends(get_db)) -> list[JournalistProfile]:
  return list(
    db.scalars(
      select(JournalistProfile)
      .where(JournalistProfile.status == JournalistStatus.approved)
      .order_by(JournalistProfile.display_name.asc())
    )
  )


@router.get("/{slug}", response_model=JournalistRead)
def get_journalist(slug: str, db: Session = Depends(get_db)) -> JournalistProfile:
  journalist = db.scalar(select(JournalistProfile).where(JournalistProfile.slug == slug))
  if not journalist:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Journalist not found")
  return journalist


@router.post("/applications", response_model=JournalistApplicationRead, status_code=status.HTTP_201_CREATED)
def apply(payload: JournalistApplicationCreate, db: Session = Depends(get_db)) -> JournalistApplication:
  application = JournalistApplication(
    full_name=payload.full_name,
    email=payload.email.lower(),
    region=payload.region,
    affiliation=payload.affiliation,
    evidence_practice_statement=payload.evidence_practice_statement,
    work_samples=payload.work_samples,
    conflicts_disclosure=payload.conflicts_disclosure,
  )
  db.add(application)
  db.flush()
  write_audit_log(
    db,
    action="journalist_application.create",
    resource_type="journalist_application",
    resource_id=application.id,
  )
  db.commit()
  db.refresh(application)
  return application


@router.post("/{application_id}/approve", response_model=JournalistRead)
def approve_application(
  application_id: UUID,
  db: Session = Depends(get_db),
  user: User = Depends(require_roles(UserRole.editor, UserRole.admin)),
) -> JournalistProfile:
  application = db.get(JournalistApplication, application_id)
  if not application:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")
  if application.status != JournalistStatus.pending:
    raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Application already reviewed")

  base_slug = slugify(application.full_name)
  slug = base_slug
  counter = 2
  while db.scalar(select(JournalistProfile.id).where(JournalistProfile.slug == slug)):
    slug = f"{base_slug}-{counter}"
    counter += 1

  application.status = JournalistStatus.approved
  application.reviewed_by_user_id = user.id
  application.reviewed_at = datetime.now(UTC)

  profile = JournalistProfile(
    user_id=application.applicant_user_id,
    slug=slug,
    display_name=application.full_name,
    title="Civic Journalist",
    region=application.region,
    bio=application.evidence_practice_statement[:900],
    beats=[],
    status=JournalistStatus.approved,
    reliability_score=0,
    approved_at=datetime.now(UTC),
    approved_by_user_id=user.id,
  )
  db.add(profile)
  write_audit_log(
    db,
    action="journalist_application.approve",
    resource_type="journalist_application",
    actor_user_id=user.id,
    resource_id=application.id,
  )
  db.commit()
  db.refresh(profile)
  return profile
