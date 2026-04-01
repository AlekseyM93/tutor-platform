Ты senior fullstack architect. Не делай хаотичные правки. Нужно перестроить проект в clean modular monolith architecture для production-платформы репетиторов и учеников.

Текущий стек: Next.js, TypeScript, Prisma, PostgreSQL, Auth.js, LiveKit, MinIO.

Задача: реорганизовать структуру проекта по модульному принципу, сохранив работоспособность и подготовив основу для полноценного продукта.

Сделай следующее:

1. Перестрой структуру проекта на следующие слои:

* app/ только для маршрутов, layouts и route handlers;
* modules/ для доменной логики;
* lib/ для общих инфраструктурных утилит;
* components/ только для общего UI;
* tests/ для unit, integration, e2e;
* docs/ для архитектурной документации.

2. Создай и начни использовать доменные модули:

* auth
* users
* teacher
* student
* lessons
* rooms
* whiteboard
* materials
* recordings
* homework
* notifications
* admin

3. Для каждого модуля придерживайся структуры:

* server/
* ui/
* schemas/
* types/
* actions/ если действительно нужно

4. Вынеси всю бизнес-логику из app routes/pages/components в modules/*/server.
   Не оставляй сложную логику внутри route handlers и page.tsx.

5. Перестрой app routes с route groups:

* (public)
* (auth)
* (student)
* (teacher)
* (shared-app)
* (admin)

6. Подготовь отдельные кабинеты:

* /student/dashboard
* /teacher/dashboard
* общий room route по lessonId
* базовую основу под /admin/*

7. Нормализуй shared infrastructure в lib:

* db/prisma
* env validation
* security helpers
* logging
* errors
* storage
* realtime
* constants
* utils

8. Приведи imports в порядок после переноса файлов.
   Устрани мёртвый код, дублирование и demo-артефакты.

9. Обнови README и docs/architecture.md в соответствии с новой архитектурой.

10. Не ломай проект целиком за один шаг.
    Работай итеративно:

* сначала создай структуру;
* потом переноси auth;
* потом lessons/rooms/materials;
* потом dashboards;
* потом whiteboard/recordings.

11. После изменений выведи:

* новую структуру файлов;
* какие файлы были перемещены;
* какие удалены;
* какие TODO остались;
* какие команды мне запустить локально.

Требования:

* TypeScript strict;
* production-oriented code;
* понятные имена файлов;
* минимум магии;
* максимум читаемости;
* не оставляй business logic в UI.

Acceptance criteria:

* структура проекта становится модульной и читаемой;
* app не содержит тяжелой бизнес-логики;
* modules становятся основным местом доменной логики;
* есть отдельные route groups для ролей;
* foundation под admin готова;
* проект продолжает собираться.
