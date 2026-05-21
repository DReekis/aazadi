import hashlib
import re


def slugify(value: str) -> str:
  slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
  return slug or "record"


def estimate_reading_minutes(text: str) -> int:
  words = len(re.findall(r"\w+", text))
  return max(1, round(words / 220))


def content_hash(*parts: str) -> str:
  digest = hashlib.sha256()
  for part in parts:
    digest.update(part.encode("utf-8"))
    digest.update(b"\n")
  return f"sha256:{digest.hexdigest()}"
