#!/bin/bash

echo "=== Creating .env file ==="
cat > .env << 'EOF'
APP_NAME=MohammedMojib
APP_ENV=production
APP_KEY=base64:8iJTAlzpLSju/aR99CrfXnNEvi6J1CvrjiYOP1EC0bE=
APP_DEBUG=true
APP_URL=https://myprofile-production-9717.up.railway.app

DB_CONNECTION=mysql
DB_HOST=mysql.railway.internal
DB_PORT=3306
DB_DATABASE=railway
DB_USERNAME=root
DB_PASSWORD=jvqsBQMhtwfiKfHIuyazomNzIJXPrxnr

SESSION_DRIVER=cookie
SESSION_LIFETIME=120
CACHE_STORE=array
QUEUE_CONNECTION=sync

FILESYSTEM_DISK=local
EOF

echo "=== .env created ==="
cat .env

echo "=== Clearing config cache ==="
php artisan config:clear

echo "=== Running migrations ==="
php artisan migrate --force

echo "=== Seeding admin ==="
php artisan db:seed --class=AdminUserSeeder --force || true

echo "=== Seeding data ==="
php artisan db:seed --class=ProductionDataSeeder --force || true

echo "=== Linking storage ==="
php artisan storage:link || true

echo "=== Starting server on port $PORT ==="
php artisan serve --host=0.0.0.0 --port=$PORT
