#!/bin/bash
set -e

# Generate application key
# php artisan key:generate --force

# Generate API documentation (if using Scribe)
php artisan scribe:generate || true

# Create the storage symlink
php artisan storage:link

# Run migrations (optional, depending on your deployment strategy)
# php artisan migrate --force

# Execute the main command
exec "$@"