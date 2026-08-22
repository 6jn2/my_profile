FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libxml2-dev libzip-dev libonig-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring xml zip gd tokenizer fileinfo \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction \
    && chmod -R 777 storage bootstrap/cache

EXPOSE 8000

CMD php artisan config:clear 2>/dev/null; \
    php artisan migrate --force 2>&1; \
    php artisan db:seed --class=AdminUserSeeder --force 2>&1 || true; \
    php artisan db:seed --class=ProductionDataSeeder --force 2>&1 || true; \
    php artisan storage:link 2>&1 || true; \
    php artisan serve --host=0.0.0.0 --port=8000
