from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.db.session import get_db
from app.models.enums import UserRole
from app.models.newsroom import CivicMapTag, GovernanceProposal, InvestigationWorkspace, PublicPulseItem
from app.models.user import User
from app.schemas.newsroom import (
  CivicMapTagCreate,
  CivicMapTagRead,
  GovernanceProposalCreate,
  GovernanceProposalRead,
  InvestigationWorkspaceCreate,
  InvestigationWorkspaceRead,
  PublicPulseCreate,
  PublicPulseRead,
)
from app.services.audit import write_audit_log
from app.services.integrity import slugify

router = APIRouter(prefix="/newsroom", tags=["newsroom"])


@router.get("/pulse", response_model=list[PublicPulseRead])
def list_pulse(db: Session = Depends(get_db)) -> list[PublicPulseItem]:
  return list(db.scalars(select(PublicPulseItem).order_by(PublicPulseItem.updated_at.desc()).limit(100)))


@router.post("/pulse", response_model=PublicPulseRead, status_code=status.HTTP_201_CREATED)
def create_pulse(
  payload: PublicPulseCreate,
  db: Session = Depends(get_db),
  user: User = Depends(require_roles(UserRole.journalist, UserRole.editor, UserRole.admin)),
) -> PublicPulseItem:
  item = PublicPulseItem(**payload.model_dump(), created_by_user_id=user.id)
  db.add(item)
  db.flush()
  write_audit_log(db, action="pulse.create", resource_type="public_pulse_item", actor_user_id=user.id, resource_id=item.id)
  db.commit()
  db.refresh(item)
  return item


@router.get("/investigations", response_model=list[InvestigationWorkspaceRead])
def list_workspaces(db: Session = Depends(get_db)) -> list[InvestigationWorkspace]:
  return list(db.scalars(select(InvestigationWorkspace).order_by(InvestigationWorkspace.updated_at.desc()).limit(100)))


@router.post("/investigations", response_model=InvestigationWorkspaceRead, status_code=status.HTTP_201_CREATED)
def create_workspace(
  payload: InvestigationWorkspaceCreate,
  db: Session = Depends(get_db),
  user: User = Depends(require_roles(UserRole.journalist, UserRole.editor, UserRole.admin)),
) -> InvestigationWorkspace:
  base_slug = slugify(payload.title)
  slug = base_slug
  counter = 2
  while db.scalar(select(InvestigationWorkspace.id).where(InvestigationWorkspace.slug == slug)):
    slug = f"{base_slug}-{counter}"
    counter += 1

  workspace = InvestigationWorkspace(**payload.model_dump(), slug=slug, lead_user_id=user.id)
  db.add(workspace)
  db.flush()
  write_audit_log(
    db,
    action="investigation_workspace.create",
    resource_type="investigation_workspace",
    actor_user_id=user.id,
    resource_id=workspace.id,
  )
  db.commit()
  db.refresh(workspace)
  return workspace


@router.get("/investigations/{workspace_id}", response_model=InvestigationWorkspaceRead)
def get_workspace(workspace_id: UUID, db: Session = Depends(get_db)) -> InvestigationWorkspace:
  workspace = db.get(InvestigationWorkspace, workspace_id)
  if not workspace:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Investigation workspace not found")
  return workspace


@router.get("/civic-map", response_model=list[CivicMapTagRead])
def list_civic_map_tags(db: Session = Depends(get_db)) -> list[CivicMapTag]:
  return list(db.scalars(select(CivicMapTag).order_by(CivicMapTag.region.asc(), CivicMapTag.name.asc()).limit(200)))


@router.post("/civic-map", response_model=CivicMapTagRead, status_code=status.HTTP_201_CREATED)
def create_civic_map_tag(
  payload: CivicMapTagCreate,
  db: Session = Depends(get_db),
  user: User = Depends(require_roles(UserRole.journalist, UserRole.editor, UserRole.admin)),
) -> CivicMapTag:
  tag = CivicMapTag(**payload.model_dump())
  db.add(tag)
  db.flush()
  write_audit_log(db, action="civic_map_tag.create", resource_type="civic_map_tag", actor_user_id=user.id, resource_id=tag.id)
  db.commit()
  db.refresh(tag)
  return tag


@router.get("/governance-proposals", response_model=list[GovernanceProposalRead])
def list_governance_proposals(db: Session = Depends(get_db)) -> list[GovernanceProposal]:
  return list(db.scalars(select(GovernanceProposal).order_by(GovernanceProposal.updated_at.desc()).limit(100)))


@router.post("/governance-proposals", response_model=GovernanceProposalRead, status_code=status.HTTP_201_CREATED)
def create_governance_proposal(
  payload: GovernanceProposalCreate,
  db: Session = Depends(get_db),
  user: User = Depends(require_roles(UserRole.editor, UserRole.moderator, UserRole.admin)),
) -> GovernanceProposal:
  proposal = GovernanceProposal(**payload.model_dump())
  db.add(proposal)
  db.flush()
  write_audit_log(
    db,
    action="governance_proposal.create",
    resource_type="governance_proposal",
    actor_user_id=user.id,
    resource_id=proposal.id,
  )
  db.commit()
  db.refresh(proposal)
  return proposal
