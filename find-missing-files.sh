#!/bin/bash
# save as `find-missing-files.sh`

# Create list of files in archive
tar -tzf crafttrust-source-backend.tgz > backend-files.txt
tar -tzf crafttrust-source-frontend.tgz > frontend-files.txt
cat backend-files.txt frontend-files.txt > all-archive-files.txt

# Create list of actual files on disk
find src libs public pages database -type f > extracted-files.txt
find . -maxdepth 1 -type f >> extracted-files.txt

# Normalize paths
sed -i 's|^\./||' extracted-files.txt

# Compare
echo "🔍 Finding missing files..."
comm -23 <(sort all-archive-files.txt) <(sort extracted-files.txt)
