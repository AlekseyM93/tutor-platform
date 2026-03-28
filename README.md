# Tutor Platform

Production-oriented платформа для репетиторов и учеников: уроки, видеокомнаты, материалы и записи.

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
