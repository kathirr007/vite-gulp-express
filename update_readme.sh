#!/usr/bin/bash

# Get commit count and current date/time
commit_count=$(git rev-list --count HEAD)
last_updated=$(date '+%Y-%m-%d %H:%M:%S')

# Format the new content
new_content="\nLast Updated: $last_updated\n"

# Use sed to replace or append, handling newlines correctly.  This version
# correctly handles multiple occurrences of the target lines.
sed -i -r 's/Last Updated:.*//g' README.md  # Remove existing content

# Remove any empty lines
# tr -s '\n' '\n' < README.md > README.md.tmp && mv README.md.tmp README.md
# sed -i -E 's/\n{2,}/\n/g' README.md



# awk '
# /^$/ { if (c++ == 0) print; next } # Consecutive empty lines
# { if (c) print ""; c=0; print }    # Non-empty lines
# END { if (c) print "" }            # Ensure file ends with a newline (if needed)
# ' README.md > README.md.tmp && mv README.md.tmp README.md

# Append the new content
printf "$new_content"
printf "$new_content" >> README.md

# Define the file name (same directory as the script)
FILE="README.md"

# Check if the file exists
if [ ! -f "$FILE" ]; then
  echo "Error: $FILE not found in the current directory."
  exit 1
fi

# Remove extra empty lines, keeping only one, and create a backup
sed -i.bak '/./,/^$/!d' "$FILE"

# Remove the backup file
rm -f "$FILE.bak"

# echo "Processed file saved as: $FILE (Backup: $FILE.bak)"
