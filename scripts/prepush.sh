#!/usr/bin/env bash
set -euo pipefail

echo "Running pre-push checks for Disease Prediction repo"

echo "1) Frontend: lint"
(cd frontend && npm run lint)

echo "2) Frontend: build (production)"
(cd frontend && npm run build)

echo "3) Backend: (no build step). You may run tests or lint here if configured."

echo "Pre-push checks passed."
