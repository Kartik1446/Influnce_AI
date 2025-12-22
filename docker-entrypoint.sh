#!/bin/sh
set -e

echo "[EntryPoint] Applying database migrations..."
alembic upgrade head || echo "[EntryPoint] Alembic migration failed; continuing if schema already exists."

echo "[EntryPoint] Starting Uvicorn..."
exec uvicorn backend.app.main:app --host 0.0.0.0 --port 8000