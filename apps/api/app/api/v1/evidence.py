from datetime import UTC, datetime
from uuid import UUID, uuid4

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.core.config import settings
from app.db.session import get_db
from app.models.enums import EvidenceType, UserRole, VerificationState
from app.models.evidence import Evidence
from app.models.user import User
from app.schemas.evidence import EvidenceCreate, EvidenceRead, EvidenceVerify
from app.services.audit import write_audit_log
from app.services.storage import get_storage_backend

router = APIRouter(prefix="/evidence", tags=["evidence"])


@router.post("", response_model=EvidenceRead, status_code=status.HTTP_201_CREATED)
def create_evidence(
  payload: EvidenceCreate,
  db: Session = Depends(get_db),
  user: User = Depends(require_roles(UserRole.journalist, UserRole.editor, UserRole.admin)),
) -> Evidence:
  item = Evidence(
    article_id=payload.article_id,
    uploader_user_id=user.id,
    title=payload.title,
    type=payload.type,
    source_url=str(payload.source_url) if payload.source_url else None,
    transcript_text=payload.transcript_text,
    storage_uri=payload.storage_uri,
    mime_type=payload.mime_type,
    byte_size=payload.byte_size,
    sha256_hash=payload.sha256_hash,
  )
  db.add(item)
  db.flush()
  write_audit_log(db, action="evidence.create", resource_type="evidence", actor_user_id=user.id, resource_id=item.id)
  db.commit()
  db.refresh(item)
  return item


@router.post("/upload", response_model=EvidenceRead, status_code=status.HTTP_201_CREATED)
async def upload_evidence(
  title: str = Form(...),
  article_id: UUID | None = Form(default=None),
  file: UploadFile = File(...),
  db: Session = Depends(get_db),
  user: User = Depends(require_roles(UserRole.journalist, UserRole.editor, UserRole.admin)),
) -> Evidence:
  if file.content_type not in settings.allowed_upload_mime_types:
    raise HTTPException(status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, detail="Unsupported upload type")

  content = await file.read()
  if len(content) > settings.max_upload_bytes:
    raise HTTPException(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail="Upload too large")

  extension = (file.filename or "evidence").split(".")[-1]
  key = f"evidence/{article_id or 'unattached'}/{uuid4()}.{extension}"
  stored = get_storage_backend().put_bytes(key=key, content=content, mime_type=file.content_type or "application/octet-stream")
  evidence_type = EvidenceType.pdf if file.content_type == "application/pdf" else EvidenceType.image

  item = Evidence(
    article_id=article_id,
    uploader_user_id=user.id,
    title=title,
    type=evidence_type,
    storage_uri=stored.uri,
    mime_type=stored.mime_type,
    byte_size=stored.byte_size,
    sha256_hash=stored.sha256_hash,
  )
  db.add(item)
  db.flush()
  write_audit_log(db, action="evidence.upload", resource_type="evidence", actor_user_id=user.id, resource_id=item.id)
  db.commit()
  db.refresh(item)
  return item


@router.get("/{evidence_id}", response_model=EvidenceRead)
def get_evidence(evidence_id: UUID, db: Session = Depends(get_db)) -> Evidence:
  item = db.get(Evidence, evidence_id)
  if not item:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Evidence not found")
  return item


@router.post("/{evidence_id}/verify", response_model=EvidenceRead)
def verify_evidence(
  evidence_id: UUID,
  payload: EvidenceVerify,
  db: Session = Depends(get_db),
  user: User = Depends(require_roles(UserRole.editor, UserRole.admin)),
) -> Evidence:
  item = db.get(Evidence, evidence_id)
  if not item:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Evidence not found")

  item.verification_state = payload.verification_state
  if payload.verification_state == VerificationState.verified:
    item.verified_at = datetime.now(UTC)
    item.verified_by_user_id = user.id
  item.evidence_metadata = {**item.evidence_metadata, "verification_note": payload.note}
  write_audit_log(db, action="evidence.verify", resource_type="evidence", actor_user_id=user.id, resource_id=item.id)
  db.commit()
  db.refresh(item)
  return item


@router.get("", response_model=list[EvidenceRead])
def list_evidence(article_id: UUID | None = None, db: Session = Depends(get_db)) -> list[Evidence]:
  statement = select(Evidence).order_by(Evidence.uploaded_at.desc()).limit(100)
  if article_id:
    statement = statement.where(Evidence.article_id == article_id)
  return list(db.scalars(statement))
