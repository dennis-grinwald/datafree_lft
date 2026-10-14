#!/usr/bin/env bash
# Serve the project page from its own directory, regardless of the caller's cwd.
set -Eeuo pipefail
ROOT="$(CDPATH= cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PORT="${1:-8088}"
if [[ ! "$PORT" =~ ^[0-9]+$ ]] || (( PORT < 1024 || PORT > 65535 )); then
  echo "Usage: ./preview.sh [port between 1024 and 65535]" >&2
  exit 2
fi
echo "Project page: http://127.0.0.1:$PORT/"
echo "Press Ctrl+C to stop."
exec "${LFT_PYTHON:-python3}" -m http.server "$PORT" --bind 127.0.0.1 --directory "$ROOT"
