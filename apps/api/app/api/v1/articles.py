from datetime import UTC, datetime
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.db.session import get_db
from app.models.article import Article, ArticleRevision
from app.models.enums import ArticleStatus, UserRole, VerificationState
from app.models.user import User
from app.schemas.article import ArticleCreate, ArticleRead, ArticleRevisionRead, ArticleUpdate
from app.services.audit import write_audit_log
from app.services.integrity import content_hash, estimate_reading_minutes, slugify

router = APIRouter(prefix="/articles", tags=["articles"])


def _unique_slug(db: Session, title: str) -> str:
  base = slugify(title)
  slug = base
  counter = 2
  while db.scalar(select(Article.id).where(Article.slug == slug)):
    slug = f"{base}-{counter}"
    counter += 1
  return slug


@router.get("", response_model=list[ArticleRead])
def list_articles(
  status_filter: ArticleStatus | None = Query(default=ArticleStatus.published, alias="status"),
  category: str | None = None,
  region: str | None = None,
  db: Session = Depends(get_db),
) -> list[Article]:
  statement = select(Article)
  if status_filter:
    statement = statement.where(Article.status == status_filter)
  if category:
    statement = statement.where(Article.category == category)
  if region:
    statement = statement.where(Article.region == region)
  statement = statement.order_by(Article.published_at.desc().nullslast(), Article.created_at.desc()).limit(50)
  return list(db.scalars(statement))


@router.post("", response_model=ArticleRead, status_code=status.HTTP_201_CREATED)
def create_article(
  payload: ArticleCreate,
  db: Session = Depends(get_db),
  user: User = Depends(require_roles(UserRole.journalist, UserRole.editor, UserRole.admin)),
) -> Article:
  article = Article(
    slug=_unique_slug(db, payload.title),
    title=payload.title,
    subtitle=payload.subtitle,
    category=payload.category,
    region=payload.region,
    geographic_scope=payload.geographic_scope,
    topic_category=payload.topic_category,
    content_depth=payload.content_depth,
    urgency=payload.urgency,
    editorial_verification_state=payload.editorial_verification_state,
    civic_issue=payload.civic_issue,
    district=payload.district,
    latitude=payload.latitude,
    longitude=payload.longitude,
    author_id=payload.author_id,
    body_markdown=payload.body_markdown,
    reading_minutes=estimate_reading_minutes(payload.body_markdown),
    integrity_hash=content_hash(payload.title, payload.subtitle, payload.body_markdown),
    verification_status=VerificationState.under_review,
  )
  db.add(article)
  db.flush()
  revision = ArticleRevision(
    article_id=article.id,
    version=1,
    editor_user_id=user.id,
    title=article.title,
    subtitle=article.subtitle,
    body_markdown=article.body_markdown,
    diff_summary="Initial draft created.",
    integrity_hash=article.integrity_hash,
  )
  db.add(revision)
  write_audit_log(db, action="article.create", resource_type="article", actor_user_id=user.id, resource_id=article.id)
  db.commit()
  db.refresh(article)
  return article


@router.get("/{slug}", response_model=ArticleRead)
def get_article(slug: str, db: Session = Depends(get_db)) -> Article:
  article = db.scalar(select(Article).where(Article.slug == slug))
  if not article:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
  return article


@router.patch("/{article_id}", response_model=ArticleRead)
def update_article(
  article_id: UUID,
  payload: ArticleUpdate,
  db: Session = Depends(get_db),
  user: User = Depends(require_roles(UserRole.journalist, UserRole.editor, UserRole.admin)),
) -> Article:
  article = db.get(Article, article_id)
  if not article:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")

  if payload.title is not None:
    article.title = payload.title
  if payload.subtitle is not None:
    article.subtitle = payload.subtitle
  if payload.category is not None:
    article.category = payload.category
  if payload.region is not None:
    article.region = payload.region
  if payload.geographic_scope is not None:
    article.geographic_scope = payload.geographic_scope
  if payload.topic_category is not None:
    article.topic_category = payload.topic_category
  if payload.content_depth is not None:
    article.content_depth = payload.content_depth
  if payload.urgency is not None:
    article.urgency = payload.urgency
  if payload.editorial_verification_state is not None:
    article.editorial_verification_state = payload.editorial_verification_state
  if payload.civic_issue is not None:
    article.civic_issue = payload.civic_issue
  if payload.district is not None:
    article.district = payload.district
  if payload.latitude is not None:
    article.latitude = payload.latitude
  if payload.longitude is not None:
    article.longitude = payload.longitude
  if payload.body_markdown is not None:
    article.body_markdown = payload.body_markdown

  article.reading_minutes = estimate_reading_minutes(article.body_markdown)
  article.integrity_hash = content_hash(article.title, article.subtitle, article.body_markdown)

  next_version = (db.scalar(select(func.max(ArticleRevision.version)).where(ArticleRevision.article_id == article.id)) or 0) + 1
  db.add(
    ArticleRevision(
      article_id=article.id,
      version=next_version,
      editor_user_id=user.id,
      title=article.title,
      subtitle=article.subtitle,
      body_markdown=article.body_markdown,
      diff_summary=payload.diff_summary,
      integrity_hash=article.integrity_hash,
    )
  )
  write_audit_log(db, action="article.update", resource_type="article", actor_user_id=user.id, resource_id=article.id)
  db.commit()
  db.refresh(article)
  return article


@router.post("/{article_id}/submit", response_model=ArticleRead)
def submit_article(
  article_id: UUID,
  db: Session = Depends(get_db),
  user: User = Depends(require_roles(UserRole.journalist, UserRole.editor, UserRole.admin)),
) -> Article:
  article = db.get(Article, article_id)
  if not article:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
  article.status = ArticleStatus.review
  write_audit_log(db, action="article.submit", resource_type="article", actor_user_id=user.id, resource_id=article.id)
  db.commit()
  db.refresh(article)
  return article


@router.post("/{article_id}/publish", response_model=ArticleRead)
def publish_article(
  article_id: UUID,
  db: Session = Depends(get_db),
  user: User = Depends(require_roles(UserRole.editor, UserRole.admin)),
) -> Article:
  article = db.get(Article, article_id)
  if not article:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
  article.status = ArticleStatus.published
  article.published_at = datetime.now(UTC)
  if article.verification_status == VerificationState.under_review:
    article.verification_status = VerificationState.verified
  write_audit_log(db, action="article.publish", resource_type="article", actor_user_id=user.id, resource_id=article.id)
  db.commit()
  db.refresh(article)
  return article


@router.get("/{article_id}/revisions", response_model=list[ArticleRevisionRead])
def list_revisions(article_id: UUID, db: Session = Depends(get_db)) -> list[ArticleRevision]:
  return list(
    db.scalars(
      select(ArticleRevision)
      .where(ArticleRevision.article_id == article_id)
      .order_by(ArticleRevision.version.desc())
    )
  )
