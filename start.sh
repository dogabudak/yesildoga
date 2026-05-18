#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"
VENV_DIR="$ROOT_DIR/venv"

cleanup() {
  echo ""
  echo "Shutting down..."
  kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null
  wait "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null
  echo "All services stopped."
}

trap cleanup EXIT INT TERM

# Activate virtual environment
if [ ! -d "$VENV_DIR" ]; then
  echo "Error: Virtual environment not found at $VENV_DIR"
  echo "Create one with: python3 -m venv $VENV_DIR && source $VENV_DIR/bin/activate && pip install -r $BACKEND_DIR/requirements.txt"
  exit 1
fi
source "$VENV_DIR/bin/activate"

# Install backend dependencies if needed
pip install -q -r "$BACKEND_DIR/requirements.txt"

# Use SQLite for local development
export USE_SQLITE=True

# Point frontend API calls to local backend
export NEXT_PUBLIC_API_URL=http://localhost:8082

# Install frontend dependencies if needed
if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
  echo "Installing frontend dependencies..."
  (cd "$FRONTEND_DIR" && yarn install)
fi

# Run migrations
echo "Running database migrations..."
python "$BACKEND_DIR/manage.py" migrate --no-input

# Start Django backend on port 8082
echo "Starting Django backend on http://localhost:8082 ..."
python "$BACKEND_DIR/manage.py" runserver 8082 &
BACKEND_PID=$!

# Start Next.js frontend on port 3000
echo "Starting Next.js frontend on http://localhost:3000 ..."
(cd "$FRONTEND_DIR" && yarn dev) &
FRONTEND_PID=$!

echo ""
echo "========================================="
echo "  Backend:  http://localhost:8082"
echo "  Frontend: http://localhost:3000"
echo "  Admin:    http://localhost:8082/admin"
echo "========================================="
echo "Press Ctrl+C to stop all services."
echo ""

wait
