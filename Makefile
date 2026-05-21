.PHONY: install-web dev-web build-web typecheck-web api-dev api-migrate docker-up docker-down

install-web:
	npm install

dev-web:
	npm run dev:web

build-web:
	npm run build:web

typecheck-web:
	npm run typecheck:web

api-dev:
	cd apps/api && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

api-migrate:
	cd apps/api && alembic upgrade head

docker-up:
	docker compose up --build

docker-down:
	docker compose down
