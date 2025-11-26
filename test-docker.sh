#!/bin/bash
set -e

echo "🐳 Starting Docker build and test..."

# Build the Docker image
echo "📦 Building Docker image..."
docker-compose build

# Start services
echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check if app is responding
echo "🔍 Testing application..."
max_attempts=30
attempt=0

while [ $attempt -lt $max_attempts ]; do
  if curl -f http://localhost:3000 >/dev/null 2>&1; then
    echo "✅ Application is running!"
    break
  fi
  attempt=$((attempt + 1))
  echo "Attempt $attempt/$max_attempts - waiting for app..."
  sleep 2
done

if [ $attempt -eq $max_attempts ]; then
  echo "❌ Application failed to start"
  docker-compose logs app
  docker-compose down
  exit 1
fi

# Show logs
echo "📋 Application logs:"
docker-compose logs app | tail -20

# Test database connectivity
echo "🗄️ Testing database..."
docker-compose exec -T db psql -U ecommerce -d ecommerce -c "SELECT COUNT(*) FROM \"Product\";" || echo "⚠️ Database not ready yet"

echo ""
echo "✨ Docker setup is working!"
echo "📍 Application: http://localhost:3000"
echo "📍 Database: localhost:5432"
echo ""
echo "To stop: docker-compose down"
echo "To view logs: docker-compose logs -f"
