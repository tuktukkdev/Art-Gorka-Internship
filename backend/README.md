# Art Gorka — Backend API

REST API для управления проектами студии. Laravel 11 + PostgreSQL.

---

## Стек

- PHP 8.x
- Laravel 11
- PostgreSQL 16

---

## Запуск проекта

### 1. Клонировать репозиторий и перейти в папку

```bash
git clone https://github.com/qaqrrrrqaq-ship-it/art_gorka_practice.git
cd art_gorka_practice/backend
```

### 2. Установить зависимости

```bash
composer install
```

### 3. Создать файл окружения

```bash
cp .env.example .env
php artisan key:generate
```

### 4. Настроить подключение к БД

Открыть `.env` и заполнить:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=art_gorka
DB_USERNAME=postgres
DB_PASSWORD=ваш_пароль
```

### 5. Создать базу данных

```bash
psql -U postgres -c "CREATE DATABASE art_gorka;"
```

### 6. Запустить миграции

```bash
php artisan migrate
```

### 7. Заполнить тестовыми данными (10 проектов)

```bash
php artisan db:seed --class=ProjectSeeder
```

### 8. Запустить сервер

```bash
php artisan serve
```

API будет доступно на `http://127.0.0.1:8000`



### Фильтры

```
GET /api/projects?platform=wordpress
GET /api/projects?status=production
GET /api/projects?platform=bitrix&status=development
```

### Пагинация

```
GET /api/projects?page=1&limit=10
```

### Допустимые значения

**platform:** `wordpress` | `bitrix` | `custom` | `other`

**status:** `development` | `production` | `maintenance` | `archived`

---

## Примеры запросов

### Создать проект

```http
POST /api/projects
Content-Type: application/json

{
    "title": "Сайт студии",
    "url": "https://artgorka.ru",
    "platform": "wordpress",
    "status": "production",
    "description": "Корпоративный сайт студии"
}
```

### Обновить статус

```http
PUT /api/projects/1
Content-Type: application/json

{
    "status": "archived"
}
```

### Проверить доступность сайта

```http
POST /api/projects/1/check
```

Ответ:
```json
{
    "url": "https://artgorka.ru",
    "status_code": 200,
    "is_available": true
}
```