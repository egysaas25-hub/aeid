# Docker & CI/CD Setup

This project includes complete Docker containerization and GitHub Actions CI/CD pipeline.

## 🐳 Docker Setup

### Quick Start

```bash
# Build and start all services (app + PostgreSQL)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes (clean slate)
docker-compose down -v
```

### What's Included

- **Multi-stage Dockerfile** - Optimized production build
- **docker-compose.yml** - Local development with PostgreSQL
- **Automatic migrations** - Database setup on container start
- **Database seeding** - Sample data loaded automatically

### Services

- **app**: Next.js application on port 3000
- **db**: PostgreSQL 16 on port 5432

### Environment Variables

Edit `docker-compose.yml` to change:
- Database credentials
- NEXTAUTH_SECRET
- NEXTAUTH_URL

## 🚀 CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci-cd.yml`) includes:

### Jobs

1. **Lint & Type Check**
   - ESLint validation
   - TypeScript type checking
   
2. **Build**
   - Install dependencies
   - Generate Prisma client
   - Build Next.js application
   
3. **Docker Build & Push**
   - Multi-stage Docker build
   - Push to GitHub Container Registry
   - Only on `main` branch pushes
   
4. **Deploy**
   - Placeholder for deployment
   - Add your deployment steps

### Triggers

- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

### Registry

Images are pushed to: `ghcr.io/YOUR_USERNAME/aeid`

## 📋 Testing

```bash
# Run automated test
chmod +x test-docker.sh
./test-docker.sh

# Or test manually
docker-compose up -d
curl http://localhost:3000
```

## 🔧 Development

```bash
# Start in development mode
docker-compose up

# Rebuild after code changes
docker-compose up --build

# Access database
docker-compose exec db psql -U ecommerce -d ecommerce

# View Prisma Studio
pnpm prisma studio
```

## 📦 Production Deployment

### Option 1: Docker Compose

```bash
# On your server
git clone <repo>
cd aeid
docker-compose up -d
```

### Option 2: Kubernetes

```yaml
# Use the built image
image: ghcr.io/YOUR_USERNAME/aeid:latest
```

### Option 3: Cloud Platforms

- **Vercel**: Push to GitHub (auto-deploy)
- **Railway**: Connect GitHub repo
- **AWS/GCP**: Use Docker image from registry

## 🛠️ Troubleshooting

**App won't start:**
```bash
docker-compose logs app
```

**Database issues:**
```bash
docker-compose logs db
docker-compose exec db psql -U ecommerce
```

**Reset everything:**
```bash
docker-compose down -v
docker-compose up --build
```

## 📊 Performance

- **Image size**: ~200MB (optimized multi-stage build)
- **Build time**: ~2-3 minutes
- **Startup time**: ~10 seconds

## 🔒 Security Notes

- Change default passwords in production
- Use secrets management for sensitive data
- Enable HTTPS in production
- Regular security updates

---

**Ready to deploy!** 🚀
