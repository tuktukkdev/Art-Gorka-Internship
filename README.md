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

### 7. Создать символическую ссылку для хранилища (загрузка изображений)

```bash
php artisan storage:link
```


### 8. Заполнить базу данными

```bash
# Все сидеры сразу (10 проектов + admin-пользователь)
php artisan db:seed

# Или по отдельности:
php artisan db:seed --class=ProjectSeeder
php artisan db:seed --class=AdminUserSeeder
```

Данные admin-пользователя по умолчанию (задаются в `AdminUserSeeder`):

```
Логин:  admin
Пароль: artgorka2026
```

### 9. Установить JS-зависимости и собрать ассеты админки

```bash
npm install
npm run build
```


### 10. Запустить сервер и админку

```bash
php artisan serve
```

API будет доступно на `http://127.0.0.1:8000`

Админ-панель: `http://127.0.0.1:8000/admin` 


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


# Art Gorka — Frontend

SPA студии: главная страница, каталог проектов с фильтрами и страница отдельного проекта. React 19 + Vite.

---

## Стек

- React 19
- React Router 7
- Vite 8
- ESLint 10
- Шрифт Onest (`@fontsource/onest`), Gilroy (локальный `.woff2`)

---

## Запуск проекта


### 1. Установить зависимости

```bash
npm install
```

### 2. Настроить адрес API (опционально)


Чтобы переопределить, создать файл `.env` в папке `frontend`:

```env
VITE_API_URL=http://localhost:8000/api
```


### 3. Запустить dev-сервер

```bash
npm run dev
```

Откроется по адресу: `http://localhost:5173`

---

## Скрипты

| Команда           | Назначение                                  |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Запуск dev-сервера Vite                     |
| `npm run build`   | Production-сборка в папку `dist`            |
| `npm run preview` | Локальный просмотр собранного `dist`        |
| `npm run lint`    | Проверка кода ESLint                        |

---

## Роуты

| Путь              | Страница        | Описание                          |
| ----------------- | --------------- | --------------------------------- |
| `/`               | `Home`          | Главная страница                  |
| `/list-projects`  | `ListProjects`  | Каталог проектов с фильтрами      |
| `/projects/:id`   | `ProjectDetail` | Страница отдельного проекта       |

---

## Связь с API

Запросы к backend в `src/api/projects.js`:

| Функция                    | Эндпоинт                         | Назначение                  |
| -------------------------- | -------------------------------- | --------------------------- |
| `fetchProjects(filters)`   | `GET /projects`                  | Список проектов с фильтрами |
| `fetchFilterOptions()`     | `GET /projects/filter-options`   | Доступные значения фильтров |
| `fetchProjectById(id)`     | `GET /projects/:id`              | Один проект (404 → `not_found`) |
