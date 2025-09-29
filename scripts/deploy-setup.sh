#!/bin/bash

# Deployment setup script for Luminakra Demo App
# This script sets up the application on your VPS

set -e

# Configuration
APP_DIR="~/luminakra-sample-app"
REPO_URL="https://github.com/nenecchuu/luminakra-sample-app.git"

echo "🚀 Starting Luminakra Demo App deployment setup..."

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   echo "❌ This script should not be run as root for security reasons"
   exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create application directory
echo "📁 Creating application directory..."
mkdir -p $APP_DIR

# Clone repository if it doesn't exist
if [ ! -d "$APP_DIR/.git" ]; then
    echo "📥 Cloning repository..."
    git clone $REPO_URL $APP_DIR
else
    echo "📥 Repository already exists, pulling latest changes..."
    cd $APP_DIR
    git pull origin main
fi

cd $APP_DIR

# Copy environment file
if [ ! -f ".env.production" ]; then
    echo "⚙️ Setting up environment file..."
    cp env.production.template .env.production
    echo "❗ Please edit .env.production with your actual values before continuing"
    echo "   Required values to update:"
    echo "   - APP_KEY (generate with: php artisan key:generate)"
    echo "   - APP_URL"
    echo "   - DB_DATABASE, DB_USERNAME, DB_PASSWORD"
    echo "   - REDIS_PASSWORD"
    echo "   - GITHUB_REPOSITORY"
    read -p "Press Enter after updating .env.production..."
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p storage/app/public
mkdir -p storage/framework/{cache,sessions,testing,views}
mkdir -p storage/logs
mkdir -p bootstrap/cache

# Set permissions
echo "🔐 Setting permissions..."
chmod -R 755 storage
chmod -R 755 bootstrap/cache

# Generate application key if not set
if ! grep -q "APP_KEY=base64:" .env.production; then
    echo "🔑 Generating application key..."
    # We'll do this in the container since we need Laravel
    echo "Will generate APP_KEY after first container start"
fi

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update your GitHub repository secrets with:"
echo "   - VPS_HOST: Your VPS IP address"
echo "   - VPS_USERNAME: Your VPS username"
echo "   - VPS_SSH_KEY: Your private SSH key"
echo "   - VPS_PORT: SSH port (usually 22)"
echo ""
echo "2. Create a database for your application in PostgreSQL"
echo ""
echo "3. Configure Nginx Proxy Manager to proxy to your app container"
echo ""
echo "4. Push to main branch to trigger deployment"
echo ""
echo "Manual deployment command:"
echo "  ./scripts/deploy.sh"
