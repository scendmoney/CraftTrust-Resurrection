#!/bin/bash

set -e

# Define archive names and directories
archives=("crafttrust-source-backend.tgz" "crafttrust-source-frontend.tgz")
directories=("backend" "frontend")
  
for i in "${!archives[@]}"; do
  archive="${archives[$i]}"
  dir="${directories[$i]}"

  echo "🔍 Verifying $archive against $dir"

  echo "→ Counting total entries in archive..."
  total_in_tar=$(tar -tzf "$archive" | wc -l)
  files_in_tar=$(tar -tzf "$archive" | grep -v '/$' | wc -l)
  dirs_in_tar=$(tar -tzf "$archive" | grep '/$' | wc -l)

  echo "→ Counting total entries in extracted directory..."
  cd "$dir"
  total_on_disk=$(find . | wc -l)
  files_on_disk=$(find . -type f | wc -l)
  dirs_on_disk=$(find . -type d | wc -l)
  cd ..

  echo "📦 Archive: $archive"
  echo "  - Files: $files_in_tar"
  echo "  - Dirs:  $dirs_in_tar"
  echo "  - Total: $total_in_tar"

  echo "🗂️  Disk: $dir/"
  echo "  - Files: $files_on_disk"
  echo "  - Dirs:  $dirs_on_disk"
  echo "  - Total: $total_on_disk"

  echo ""

  if [[ "$files_in_tar" -ne "$files_on_disk" || "$dirs_in_tar" -ne "$dirs_on_disk" ]]; then
    echo "⚠️  Mismatch detected in $dir!"
  else
    echo "✅ $dir matches archive structure."
  fi

  echo "--------------------------------------"
done
