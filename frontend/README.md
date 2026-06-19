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

### 1. Клонировать репозиторий и перейти в папку

```bash
git clone https://github.com/qaqrrrrqaq-ship-it/art_gorka_practice.git
cd art_gorka_practice/frontend
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Настроить адрес API (опционально)


Чтобы переопределить, создать файл `.env` в папке `frontend`:

```env
VITE_API_URL=http://localhost:8000/api
```


### 4. Запустить dev-сервер

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
