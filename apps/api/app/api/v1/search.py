from fastapi import APIRouter, Depends, Query
from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.article import Article
from app.models.governance import GovernanceLog
from app.models.journalist import JournalistProfile
from app.schemas.article import ArticleRead
from app.schemas.governance import GovernanceLogRead
from app.schemas.journalist import JournalistRead
from app.schemas.search import SearchResponse

router = APIRouter(prefix="/search", tags=["search"])


@router.get("", response_model=SearchResponse)
def search(
  q: str = Query(min_length=2),
  db: Session = Depends(get_db),
) -> dict[str, list[ArticleRead] | list[JournalistRead] | list[GovernanceLogRead]]:
  pattern = f"%{q}%"
  articles = list(
    db.scalars(
      select(Article)
      .where(
        or_(
          Article.title.ilike(pattern),
          Article.subtitle.ilike(pattern),
          Article.category.ilike(pattern),
          Article.region.ilike(pattern),
        )
      )
      .limit(20)
    )
  )
  journalists = list(
    db.scalars(
      select(JournalistProfile)
      .where(
        or_(
          JournalistProfile.display_name.ilike(pattern),
          JournalistProfile.region.ilike(pattern),
          JournalistProfile.bio.ilike(pattern),
        )
      )
      .limit(20)
    )
  )
  governance = list(
    db.scalars(
      select(GovernanceLog)
      .where(or_(GovernanceLog.title.ilike(pattern), GovernanceLog.public_summary.ilike(pattern)))
      .limit(20)
    )
  )
  return {"articles": articles, "journalists": journalists, "governance": governance}
