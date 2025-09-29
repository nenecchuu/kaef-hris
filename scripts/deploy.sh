#!/bin/bash

# Manual deployment script for Luminakra Demo App
# Use this for manual deployments or troubleshooting

set -e

APP_DIR="~/luminakra-sample-app"
GITHUB_REPOSITORY="nenecchuu/luminakra-sample-app"

echo "🚀 Starting manual deployment..."

# Change to app directory
cd $APP_DIR

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Pull latest Docker image
echo "🐳 Pulling latest Docker image..."
docker pull ghcr.io/$GITHUB_REPOSITORY:latest

# Stop current containers
echo "⏹️ Stopping current containers..."
docker compose -f docker-compose.prod.yml down

# Start new containers
echo "▶️ Starting new containers..."
docker compose -f docker-compose.prod.yml up -d

# Wait for containers to be ready
echo "⏳ Waiting for containers to be ready..."
sleep 15

# Generate app key if needed
if ! grep -q "APP_KEY=base64:" .env.production; then
    echo "🔑 Generating application key..."
    docker compose -f docker-compose.prod.yml exec -T app php artisan key:generate --env=production --force
fi

# Generate Passport keys if needed
echo "🔐 Setting up Passport keys..."
docker compose -f docker-compose.prod.yml exec -T app php artisan passport:keys --force

# Run database migrations
echo "🗄️ Running database migrations..."
docker compose -f docker-compose.prod.yml exec -T app php artisan migrate --force

# Clear and cache configurations
echo "🧹 Clearing and caching configurations..."
docker compose -f docker-compose.prod.yml exec -T app php artisan config:cache
docker compose -f docker-compose.prod.yml exec -T app php artisan route:cache
docker compose -f docker-compose.prod.yml exec -T app php artisan view:cache

# Set storage permissions
echo "🔐 Setting storage permissions..."
docker compose -f docker-compose.prod.yml exec -T app chown -R www-data:www-data /var/www/html/storage
docker compose -f docker-compose.prod.yml exec -T app chmod -R 775 /var/www/html/storage

# Clean up old images
echo "🧹 Cleaning up old Docker images..."
docker image prune -f

echo "✅ Deployment completed successfully!"
echo ""
echo "Application should be running at: $(grep APP_URL .env.production | cut -d '=' -f2)"
echo ""
echo "To check logs:"
echo "  docker compose -f docker-compose.prod.yml logs -f app"
echo ""
echo "To access the application container:"
echo "  docker compose -f docker-compose.prod.yml exec app bash"
