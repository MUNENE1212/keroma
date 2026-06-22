# KEROMA — Deployment Guide

## Target

- **Domain**: `https://keroma.ementech.co.ke`
- **Server**: `baitech-vps` (69.164.244.165) — Ubuntu 24.04
- **App port**: 3005
- **Process manager**: PM2
- **Reverse proxy**: Nginx (existing `ementech.co.ke` config)
- **TLS**: Let's Encrypt (existing `*.ementech.co.ke` wildcard, or new cert)

## DNS

| Type | Name | Value |
|---|---|---|
| A | keroma.ementech.co.ke | 69.164.244.165 |

Add via Cloudflare or wherever your DNS lives.

## Pre-flight on the VPS

```bash
# SSH
ssh baitech-vps

# Install Node 20+ if not present
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Create app directory
sudo mkdir -p /var/www/keroma
sudo chown -R $USER:$USER /var/www/keroma

# Nginx vhost (add to /etc/nginx/sites-available/ementech.conf)
```

### Nginx vhost snippet

Add to the existing `ementech.conf` (or a new file):

```nginx
server {
    listen 443 ssl http2;
    server_name keroma.ementech.co.ke;

    ssl_certificate     /etc/letsencrypt/live/ementech.co.ke/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ementech.co.ke/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name keroma.ementech.co.ke;
    return 301 https://$host$request_uri;
}
```

Then:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

If you have a new cert (not wildcard), obtain one:

```bash
sudo certbot --nginx -d keroma.ementech.co.ke
```

## Deploy

### Option A — Manual (first deploy)

```bash
# On your local machine
cd /path/to/keroma
npm install
npm run build

# Upload build artifacts
rsync -avz --exclude node_modules --exclude .next \
  /path/to/keroma/ baitech-vps:/var/www/keroma/

# On VPS
ssh baitech-vps
cd /var/www/keroma
npm install --production
npm run build
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup  # follow the printed instructions
```

### Option B — Docker (recommended)

```bash
# On VPS
cd /var/www/keroma
# Place the Dockerfile + ecosystem from this repo
docker build -t keroma:latest .
docker run -d \
  --name keroma \
  --restart unless-stopped \
  -p 3005:3005 \
  --env-file .env.production \
  keroma:latest
```

### Option C — GitHub Actions (continuous)

The workflow at `.github/workflows/deploy.yml`:

1. Push to `main` → triggers workflow
2. Builds Docker image
3. SCPs to VPS
4. Restarts container via PM2

To enable, add these secrets to the GitHub repo:

| Secret | Value |
|---|---|
| `VPS_SSH_KEY` | Private key with access to `baitech-vps` |
| `VPS_HOST` | `baitech-vps` |
| `VPS_USER` | `munen` (or your user) |
| `VPS_DEPLOY_PATH` | `/var/www/keroma` |

---

## PM2 ecosystem (without Docker)

`ecosystem.config.cjs`:

```js
module.exports = {
  apps: [
    {
      name: 'keroma',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3005',
      cwd: '/var/www/keroma',
      env: {
        NODE_ENV: 'production',
        PORT: 3005,
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: '768M',
    },
  ],
};
```

Useful commands:

```bash
pm2 start ecosystem.config.cjs
pm2 logs keroma
pm2 restart keroma
pm2 status
pm2 save
```

---

## Health check

After deploy:

```bash
# Local on VPS
curl -I http://127.0.0.1:3005
# Should return 200

# External
curl -I https://keroma.ementech.co.ke
# Should return 200 (after TLS)
```

## Rollback

```bash
# On VPS
cd /var/www/keroma
git log --oneline -10
git checkout <previous-commit-sha>
pm2 restart keroma
```

If using Docker:

```bash
docker stop keroma
docker run -d --name keroma --restart unless-stopped -p 3005:3005 keroma:<previous-tag>
```

---

## DNS quick check (after deploy)

```bash
dig keroma.ementech.co.ke
# Should resolve to 69.164.244.165

nslookup keroma.ementech.co.ke
# Same
```

---

## First-deploy checklist

- [ ] DNS A record set (`keroma.ementech.co.ke` → `69.164.244.165`)
- [ ] Nginx vhost added and reloaded
- [ ] SSL cert (or wildcard) covers `*.ementech.co.ke`
- [ ] `npm install --production` completed
- [ ] `npm run build` succeeded
- [ ] PM2 process running
- [ ] Local health check `curl -I http://127.0.0.1:3005` returns 200
- [ ] External health check `curl -I https://keroma.ementech.co.ke` returns 200
- [ ] Sentry DSN configured (optional)
- [ ] PostHog key configured (optional)
- [ ] Stripe / IntaSend webhook URL set to `https://keroma.ementech.co.ke/api/payments/webhook` (optional)
- [ ] Smoke test: load `/`, `/recipes`, `/discover`, submit a pantry, see results