#!/bin/bash
set -e

echo "🔄 Running migrations..."
php artisan migrate --force

echo "👤 Seeding admin user..."
php artisan db:seed --class=AdminUserSeeder --force

echo "📊 Seeding production data..."
php artisan db:seed --class=ProductionDataSeeder --force

echo "🔗 Linking storage..."
php artisan storage:link || true

echo "🚀 Starting server on port $PORT..."
php artisan serve --host=0.0.0.0 --port=$PORT
