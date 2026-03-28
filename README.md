# РепетиторПлатформа

Production-oriented платформа для репетиторов и учеников: уроки, видеокомнаты, материалы и записи.

## Сайт на GitHub Pages (ветка master / main)

Сайт собирается в CI и **кладётся в папку `docs/`** на той же ветке, с которой вы пушите (**master** или **main**). Так в **Pages** можно оставить **именно master**, без отдельной ветки `gh-pages`.

**Почему не «всё на чистом JS»:** GitHub Pages отдаёт только статические файлы. У Next после экспорта интерфейс — это **JS-бандлы** в `docs/_next/static/chunks/*.js`; у страниц остаётся **короткий HTML** как точка входа (так устроены браузеры).

### Настройка

1. Запушьте код с `.github/workflows/github-pages.yml`.
2. **Actions** → **Deploy to GitHub Pages** → дождитесь успеха (или **Run workflow**).
3. **Settings → Pages**: **Source** — *Deploy from a branch*, далее строго так:
   - **Branch: `master`** (или **`main`** — как у вас основная ветка),
   - **Folder: `/docs`** (именно **docs**, не «корень»).
4. Сайт: `https://<логин>.github.io/tutor-platform/` (со слэшем в конце).

**Частая ошибка (снова README вместо сайта):** в Pages выбраны **`gh-pages`** и папка **`/(root)`**. В текущей настройке репозитория workflow **не обновляет** ветку `gh-pages` — сборка пишется в **`docs/` на `master`**. Поэтому либо переключите Pages на **`master` + `/docs`**, либо ветка `gh-pages` останется со старым содержимым / README.

Пуши, которые меняют только `docs/`, **не перезапускают** workflow (чтобы не было бесконечного цикла коммитов).

Репозиторий `логин.github.io`: в workflow для него выставляется пустой `NEXT_BASE_PATH`.

## Основные возможности

- Auth.js аутентификация с Prisma Adapter
- Регистрация/вход по email и password
- Роли пользователей: `ADMIN`, `TUTOR`, `STUDENT`
- Защищенные маршруты для `dashboard` и `rooms`
- Видеокомната на LiveKit (камера/микрофон/screen share)
- База знаний с загрузкой файлов в S3/MinIO
- Базовый welcome-лендинг
- Переключение темы: dark/light

## Технологии

- Next.js (App Router)
- TypeScript
- Prisma + PostgreSQL
- Auth.js v5 (beta) + `@auth/prisma-adapter`
- LiveKit (`livekit-client`, `livekit-server-sdk`)
- S3/MinIO (`@aws-sdk/client-s3`)
- Tailwind CSS v4

## Структура проекта

- `app/` — страницы, route handlers, auth pages
- `components/` — UI-компоненты (forms, room, whiteboard, theme toggle)
- `lib/` — сервисные модули (`auth`, `db`, `livekit`, `s3`)
- `prisma/` — схема БД, миграции, seed
- `types/` — расширения типов (например, `next-auth`)
- `proxy.ts` — защита маршрутов и редиректы auth

## Быстрый старт

### 1) Подготовка окружения

```bash
cp .env.example .env
docker compose up -d
npm install
```

### 2) Инициализация БД

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

### 3) Запуск приложения

```bash
npm run dev
```

## URL для проверки

- App: `http://localhost:3000`
- Login: `http://localhost:3000/auth/login`
- Register: `http://localhost:3000/auth/register`
- Dashboard: `http://localhost:3000/dashboard`
- Demo room: `http://localhost:3000/rooms/demo-room`
- MinIO Console: `http://localhost:9001`

## Демо-аккаунты

- `admin@tutor.local` / `AdminPass123`
- `tutor@tutor.local` / `TutorPass123`
- `student@tutor.local` / `StudentPass123`

## Важные npm scripts

- `npm run dev` — запуск dev-сервера (`next dev --webpack`)
- `npm run build` — production build
- `npm run start` — запуск production build
- `npm run prisma:generate` — генерация Prisma Client
- `npm run prisma:migrate` — создание и применение миграции
- `npm run db:push` — push схемы в БД (без миграции)
- `npm run db:seed` — заполнение БД тестовыми пользователями

## Конфигурация окружения

Минимально важные переменные:

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_URL`
- `LIVEKIT_API_KEY`
- `LIVEKIT_API_SECRET`
- `LIVEKIT_WS_URL`
- `S3_ENDPOINT`
- `S3_BUCKET`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`

Полный шаблон смотри в `.env.example`.

## Частые проблемы

### 1) Turbopack panic на Windows (path too long)

Проект уже переведен на Webpack в `npm run dev` (`next dev --webpack`), чтобы избежать падения на длинных путях.

### 2) lock-файл `.next/dev/lock`

Если видишь `Unable to acquire lock`, останови старые `next dev` процессы и удали `.next/dev`.

### 3) Предупреждения Docker Compose про `version`

Это warning, не блокирует запуск. Можно убрать `version` из `docker-compose.yml` позже.

### 4) Prisma warning про `package.json#prisma`

Текущая конфигурация рабочая. Позже можно мигрировать на `prisma.config.ts` (актуально для Prisma 7+).

## Текущий статус

Сейчас это крепкий рабочий baseline для дальнейшего развития продукта.  
Следующие этапы: полноценный CRUD уроков, связи `Lesson <-> Room`, запись через LiveKit Egress, развитая база знаний, real-time whiteboard collaboration, UX hardening и observability.
