# 🚀 VPS Deployment Guide - Luminakra Demo App

This guide will help you deploy your Laravel application to your VPS using Docker and GitHub Actions CI/CD.

## 📋 Prerequisites

✅ You already have:

- Docker and Docker Compose installed on VPS
- PostgreSQL and Redis running (from your existing setup)
- Nginx Proxy Manager for SSL/reverse proxy
- SSH access to your VPS

## 🔧 Step 1: VPS Setup

### 1. Clone Repository on VPS

```bash
# Connect to your VPS
ssh your-username@your-vps-ip

# Clone the repository
mkdir -p ~/luminakra-sample-app
git clone https://github.com/nenecchuu/luminakra-sample-app.git ~/luminakra-sample-app
cd ~/luminakra-sample-app
```

### 2. Create Production Environment File

```bash
# Copy the template
cp env.production.template .env.production

# Edit with your actual values
nano .env.production
```

**Required values to update in `.env.production`:**

```bash
APP_KEY=                          # Will be generated automatically
APP_URL=https://yourdomain.com
DB_DATABASE=your_existing_db      # Same as your current POSTGRES_DB
DB_USERNAME=your_postgres_user    # Same as your current POSTGRES_USER
DB_PASSWORD=your_postgres_pass    # Same as your current POSTGRES_PASSWORD
REDIS_PASSWORD=your_redis_pass    # Same as your current REDIS_PASSWORD
GITHUB_REPOSITORY=nenecchuu/luminakra-sample-app
```

### 3. Create Required Directories

```bash
mkdir -p storage/app/public
mkdir -p storage/framework/{cache,sessions,testing,views}
mkdir -p storage/logs
mkdir -p bootstrap/cache
chmod -R 755 storage bootstrap/cache
```

## 🔑 Step 2: GitHub Repository Setup

### 1. Add Repository Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

```
VPS_HOST=your.vps.ip.address
VPS_USERNAME=your_vps_username
VPS_SSH_KEY=your_private_ssh_key
VPS_PORT=22
```

### 2. Enable GitHub Container Registry

The workflow will automatically push Docker images to `ghcr.io/nenecchuu/luminakra-sample-app`

## 🌐 Step 3: Nginx Proxy Manager Configuration

### 1. Add Proxy Host

In your Nginx Proxy Manager (port 81):

**Details:**

- Domain Names: `app.yourdomain.com` (or your preferred subdomain)
- Scheme: `http`
- Forward Hostname/IP: `your.vps.ip.address` (or localhost if NPM is on same server)
- Forward Port: `8080`
- Block Common Exploits: ✅
- Websockets Support: ✅

**SSL:**

- SSL Certificate: Request new certificate
- Force SSL: ✅
- HTTP/2 Support: ✅

## 🚀 Step 4: Deploy

### Option A: Automatic Deployment (Recommended)

```bash
# Push to main branch to trigger deployment
git push origin main
```

The GitHub Actions workflow will:

1. Run tests
2. Build Docker image
3. Deploy to your VPS automatically

### Option B: Manual Deployment

```bash
# On your VPS
cd ~/luminakra-sample-app
./scripts/deploy.sh
```

## 📊 Step 5: Verify Deployment

### 1. Check Container Status

```bash
docker compose -f docker-compose.prod.yml ps
```

### 2. Check Application Logs

```bash
docker compose -f docker-compose.prod.yml logs -f app
```

### 3. Test Database Connection

```bash
docker compose -f docker-compose.prod.yml exec app php artisan migrate:status
```

### 4. Access Your Application

Visit `https://yourdomain.com` - your Laravel app should be running!

## 🔧 Troubleshooting

### Container Won't Start

```bash
# Check logs
docker compose -f docker-compose.prod.yml logs app

# Common issues:
# - Database connection: Check DB credentials in .env.production
# - Missing APP_KEY: Run deployment script to generate
```

### Database Issues

```bash
# Run migrations manually
docker compose -f docker-compose.prod.yml exec app php artisan migrate --force

# Check database connection
docker compose -f docker-compose.prod.yml exec app php artisan tinker
# In tinker: DB::connection()->getPdo();
```

### SSL/Domain Issues

- Verify domain DNS points to your VPS
- Check Nginx Proxy Manager configuration
- Ensure ports 80/443 are open on your VPS

## 🔄 Regular Maintenance

### Update Application

```bash
# Automatic: Push to main branch
git push origin main

# Manual: Run deployment script
cd ~/luminakra-sample-app && ./scripts/deploy.sh
```

### View Logs

```bash
# Application logs
docker compose -f docker-compose.prod.yml logs -f app

# All services
docker logs npm postgres redis
```

### Backup Database

```bash
# Create backup
docker exec postgres pg_dump -U your_postgres_user your_db_name > backup_$(date +%Y%m%d).sql

# Restore backup
docker exec -i postgres psql -U your_postgres_user your_db_name < backup_file.sql
```

## 📞 Support

If you encounter issues:

1. Check the logs first
2. Verify all environment variables are correct
3. Ensure your existing PostgreSQL/Redis containers are running
4. Check GitHub Actions workflow for deployment errors

---

**🎉 Your Laravel application should now be successfully deployed and accessible via your domain!**
