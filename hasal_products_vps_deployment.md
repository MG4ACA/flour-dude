# 🚀 Hostinger VPS Deployment Guide

## Flour Dude - Artisanal Coffee Shop (MEVN Stack)

This guide will walk you through deploying your Flour Dude application (Vue.js frontend + Express.js backend) on a Hostinger VPS with the MEVN stack template.

---

## 📋 Prerequisites

- Hostinger VPS with Ubuntu 22.04 + MEVN Stack template installed
- SSH access to your VPS
- Your VPS IP address
- Domain name (optional, but recommended)

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────┐
│         Hostinger VPS Server            │
│                                         │
│  ┌────────────────────────────────┐    │
│  │  Nginx (Reverse Proxy)         │    │
│  │  Port 80/443                   │    │
│  └──────────┬─────────────────────┘    │
│             │                           │
│  ┌──────────▼──────────┐  ┌──────────┐ │
│  │  Vue.js Frontend    │  │  Backend │ │
│  │  (Static Files)     │  │  API     │ │
│  │                     │  │  Port    │ │
│  │                     │  │  3000    │ │
│  └─────────────────────┘  └────┬─────┘ │
│                                 │       │
│                          ┌──────▼─────┐ │
│                          │   MySQL    │ │
│                          │  Database  │ │
│                          └────────────┘ │
└─────────────────────────────────────────┘
```

---

## 📦 Step 1: Connect to Your VPS

```bash
# Connect via SSH
ssh root@your_vps_ip

# Or if you have a username
ssh username@your_vps_ip
```

---

## 🔧 Step 2: Initial Server Setup

### 2.1 Update System Packages

```bash
sudo apt update && sudo apt upgrade -y
```

### 2.2 Install Required Tools

```bash
# Install Git
sudo apt install git -y

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx (if not already installed)
sudo apt install nginx -y

# Install MySQL client (if needed)
sudo apt install mysql-server -y
sudo apt install mysql-client -y
sudo systemctl status mysql
sudo systemctl start mysql
```

### 2.3 Configure Firewall

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

---

## 🗄️ Step 3: Set Up MySQL Database

### 3.1 Secure MySQL Installation

```bash
sudo mysql_secure_installation
```

Follow the prompts to:

- Set root password
- Remove anonymous users
- Disallow root login remotely
- Remove test database

### 3.2 Create Database and User

```bash
# Login to MySQL
sudo mysql -u root -p

# Run these SQL commands:
```

```sql
-- Create database
CREATE DATABASE flour_dude_db;

-- Create user (replace 'your_password' with a strong password)
CREATE USER 'flour_dude'@'localhost' IDENTIFIED BY 'Velou@123';

-- Grant privileges
GRANT ALL PRIVILEGES ON flour_dude_db.* TO 'flour_dude'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;

-- Exit MySQL
EXIT;
```

---

## 📥 Step 4: Deploy Your Application

### 4.1 Create Application Directory

```bash
# Create directory for your app
sudo mkdir -p /var/www/flour_dude
cd /var/www/flour_dude
```

### 4.2 Clone Your Repository

```bash
# If your code is on GitHub
sudo git clone https://github.com/mg4aca/flour-dude.git .

# Or upload your code using SCP from your local machine:
# scp -r /path/to/flour-dude root@your_vps_ip:/var/www/flour_dude
```

### 4.3 Set Correct Permissions

```bash
# Change ownership
sudo chown -R $USER:$USER /var/www/flour_dude

# Set permissions
sudo chmod -R 755 /var/www/flour_dude
```

---

git fetch --all
git branch
git checkout 'your_branch'
git pull origin main

if errors occur try below
git reset --hard

## 🔨 Step 5: Set Up Backend

### 5.1 Navigate to Backend Directory

```bash
cd /var/www/flour_dude/backend
```

### 5.2 Install Dependencies

```bash
npm install --production
```

### 5.3 Configure Environment Variables

```bash
# Create .env file
nano .env
```

Add the following configuration:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=flour_dude_db
DB_USER=flour_dude
DB_PASSWORD=Velou@123

# Application
NODE_ENV=production
PORT=6000
HOST=0.0.0.0

# CORS - Frontend URL
FRONTEND_URL=https://flourdude.lumicore-labs.com
```

### 5.4 Initialize Database

```bash
# Run the database schema to create tables
mysql -u flour_dude -p flour_dude_db < database/schema.sql

# Seed initial product and category data
npm run seed
```

### 5.5 Test Backend Locally

```bash
# Test if backend works
npm start

# In another terminal, test the API
curl http://localhost:6000/api/health
```

If successful, you should see `{"status":"OK","message":"Flour Dude API is running"}`. Press `Ctrl+C` to stop.

### 5.6 Set Up PM2 for Backend

```bash
# Start backend with PM2
pm2 start server.js --name flour-dude-backend

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup

# Check status
pm2 status
```

**Useful PM2 Commands:**

```bash
# View logs
pm2 logs flour-dude-backend

# Restart app
pm2 restart flour-dude-backend

# Stop app
pm2 stop flour-dude-backend

# Monitor
pm2 monit
```

---

## 🎨 Step 6: Set Up Frontend

### 6.1 Navigate to Frontend Directory

```bash
cd /var/www/flour_dude/frontend
```

### 6.2 Configure API Endpoint

Create a production environment file:

```bash
nano .env.production
```

```env
VITE_API_URL=https://flourdude.lumicore-labs.com/api
```

Or update the API URL directly in the service file:

```bash
nano src/services/api.js
```

Update the base URL:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'https://flourdude.lumicore-labs.com/api';
```

### 6.3 Install Dependencies and Build

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This creates a `dist` folder with optimized static files.

### 6.4 Move Build to Nginx Directory

```bash
# Create directory for frontend
sudo mkdir -p /var/www/flour_dude/public

# Copy built files
sudo cp -r dist/* /var/www/flour_dude/public/

# Set permissions
sudo chown -R www-data:www-data /var/www/flour_dude/public
sudo chmod -R 755 /var/www/flour_dude/public
```

---

## 🌐 Step 7: Configure Nginx

### 7.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/flour_dude
```

Add this configuration:

```nginx
# Upstream backend
upstream flour_dude_backend {
    server localhost:6000;
    keepalive 64;
}

server {
    listen 80;
    server_name flourdude.lumicore-labs.com www.flourdude.lumicore-labs.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Frontend - Serve Vue.js app
    location / {
        root /var/www/flour_dude/public;
        index index.html;
        try_files $uri $uri/ /index.html;

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API - Proxy to Express.js
    location /api/ {
        proxy_pass http://flour_dude_backend/api/;
        proxy_http_version 1.1;

        # Headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # Disable cache for API
        proxy_cache_bypass $http_upgrade;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://flour_dude_backend/api/health;
        access_log off;
    }

    # Logs
    access_log /var/log/nginx/flour_dude-access.log;
    error_log /var/log/nginx/flour_dude-error.log;
}
```

### 7.2 Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/flour_dude /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Enable Nginx on boot
sudo systemctl enable nginx
```

---

## 🔒 Step 8: Set Up SSL (Optional but Recommended)

### 8.1 Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 8.2 Obtain SSL Certificate

**Note:** You need a domain name pointed to your VPS IP for this step.

```bash
# Replace with your domain
sudo certbot --nginx -d flourdude.lumicore-labs.com -d www.flourdude.lumicore-labs.com
```

Certbot will:

- Obtain certificate
- Automatically configure Nginx
- Set up automatic renewal

### 8.3 Test Auto-Renewal

```bash
sudo certbot renew --dry-run
```

### 8.4 Update Frontend API URL

After SSL is set up, update your frontend `.env.production` to use HTTPS:

```bash
nano /var/www/flour_dude/frontend/.env.production
```

Change to:

```env
VITE_API_URL=https://flourdude.lumicore-labs.com/api
```

Rebuild and redeploy:

```bash
cd /var/www/flour_dude/frontend
npm run build
sudo cp -r dist/* /var/www/flour_dude/public/
```

---

## ✅ Step 9: Verify Deployment

### 9.1 Check Backend

```bash
# Check PM2 status
pm2 status

# Check backend logs
pm2 logs flour-dude-backend

# Test API directly
curl http://localhost:5000/api/health
```

### 9.2 Check Nginx

```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx logs
sudo tail -f /var/log/nginx/flour_dude-error.log
```

### 9.3 Test Application

Open your browser and visit:

- `http://your_vps_ip` (or `https://flourdude.lumicore-labs.com`)

You should see the Flour Dude coffee shop homepage!

---

## 🔄 Step 10: Deployment Script (For Updates)

Create a deployment script for easy updates:

```bash
nano /var/www/hasal_products/deploy.sh
```

```bash
#!/bin/bash

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /var/www/hasal_products

# Pull latest changes (if using Git)
echo "📥 Pulling latest changes..."
git pull origin main

# Backend deployment
echo "🔨 Deploying backend..."
cd backend-project
npm install --production
pm2 restart hasal_products-backend

# Frontend deployment
echo "🎨 Deploying frontend..."
cd ..
npm install
npm run build
sudo cp -r dist/* /var/www/hasal_products/frontend/

# Restart Nginx
echo "🌐 Restarting Nginx..."
sudo systemctl restart nginx

echo "✅ Deployment complete!"
```

Make it executable:

```bash
chmod +x /var/www/hasal_products/deploy.sh
```

Run deployment:

```bash
./deploy.sh
```

---

## 🛠️ Maintenance Commands

### Check Application Status

```bash
# Check all services
pm2 status
sudo systemctl status nginx
sudo systemctl status mysql

# Check disk space
df -h

# Check memory usage
free -m
```

### View Logs

```bash
# Backend logs
pm2 logs flour-dude-backend

# Nginx access logs
sudo tail -f /var/log/nginx/flour_dude-access.log

# Nginx error logs
sudo tail -f /var/log/nginx/flour_dude-error.log

# MySQL logs
sudo tail -f /var/log/mysql/error.log
```

### Backup Database

```bash
# Create backup directory
mkdir -p ~/backups

# Backup database
mysqldump -u flour_dude -p flour_dude_db > ~/backups/flour_dude_$(date +%Y%m%d_%H%M%S).sql

# Create automated backup script
nano ~/backup-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR=~/backups
mkdir -p $BACKUP_DIR
mysqldump -u flour_dude -p'Velou@123' flour_dude_db > $BACKUP_DIR/flour_dude_$(date +%Y%m%d_%H%M%S).sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "flour_dude_*.sql" -mtime +7 -delete
```

```bash
chmod +x ~/backup-db.sh

# Add to crontab for daily backups at 2 AM
crontab -e
# Add: 0 2 * * * /home/username/backup-db.sh
```

---

## 🐛 Troubleshooting

### Backend Not Starting

```bash
# Check logs
pm2 logs flour-dude-backend

# Common issues:
# 1. Port 5000 already in use
sudo lsof -i :5000
sudo kill -9 <PID>

# 2. Database connection failed
# Check .env file and MySQL credentials
mysql -u flour_dude -p flour_dude_db
```

### Frontend Not Loading

```bash
# Check Nginx error logs
sudo tail -f /var/log/nginx/flour_dude-error.log

# Verify files exist
ls -la /var/www/flour_dude/public

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 502 Bad Gateway

```bash
# Backend is not running
pm2 status
pm2 restart flour-dude-backend

# Check backend is listening on port 5000
sudo netstat -tlnp | grep 5000
```

### Database Connection Issues

```bash
# Test MySQL connection
mysql -u flour_dude -p flour_dude_db

# Check MySQL is running
sudo systemctl status mysql

# Restart MySQL
sudo systemctl restart mysql

# Check backend .env file
cat /var/www/flour_dude/backend/.env
```

---

## 📊 Monitoring Setup (Optional)

### Install Monitoring Tools

```bash
# Install htop for resource monitoring
sudo apt install htop -y

# Use PM2 monitoring
pm2 install pm2-server-monit
```

### Set Up PM2 Web Dashboard

```bash
# Install PM2 web interface
pm2 install pm2-web

# Access at: http://your_vps_ip:9615
```

---

## 🎯 Performance Optimization

### Enable Gzip Compression in Nginx

Edit `/etc/nginx/nginx.conf`:

```bash
sudo nano /etc/nginx/nginx.conf
```

Add inside `http` block:

```nginx
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;
```

### Configure Node.js for Production

In PM2 configuration:

```bash
pm2 start server.js --name flour-dude-backend -i max --node-args="--max-old-space-size=1024"
```

---

## 📚 Additional Resources

- [Hostinger VPS Documentation](https://www.hostinger.com/tutorials/vps)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Certbot](https://certbot.eff.org/)

---

## 📞 Support

If you encounter issues:

1. Check logs first (`pm2 logs`, nginx logs)
2. Verify all services are running
3. Check firewall settings
4. Review configuration files
5. Restart services in order: MySQL → Backend → Nginx

---

## 🎉 Congratulations!

Flour Dude is now live on Hostinger VPS!

**Access your application at:**

- 🌐 Frontend: `http://your_vps_ip` or `https://flourdude.lumicore-labs.com`
- 🔌 Backend API: `http://your_vps_ip/api` or `https://flourdude.lumicore-labs.com/api`
- 🏥 Health Check: `https://flourdude.lumicore-labs.com/api/health`

---

## 📝 Post-Deployment Checklist

- [ ] Backend is running via PM2
- [ ] Database is created and seeded
- [ ] Frontend is built and served by Nginx
- [ ] API endpoints are accessible
- [ ] Application login works
- [ ] SSL certificate is installed (if using domain)
- [ ] Firewall is configured
- [ ] Backups are automated
- [ ] Monitoring is set up
- [ ] Deployment script is ready

---

**Last Updated:** December 2024  
**Version:** 1.0.0
