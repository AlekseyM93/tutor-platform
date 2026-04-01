# Architecture (Iterative Refactor)

## Goal

Move from feature-mixed routes to a clean modular monolith:

- `app/` for routes/layouts/route handlers only
- `modules/` for domain logic
- `lib/` for shared infra
- `components/` for shared UI
- `docs/` for architecture docs

## Iteration 1 (done)

- Added route groups:
  - `(public)`
  - `(auth)`
  - `(shared-app)`
  - `(teacher)`
  - `(student)`
  - `(admin)`
- Introduced role-specific dashboards:
  - `/teacher/dashboard`
  - `/student/dashboard`
  - base `/admin`
- Added shared redirect route:
  - `/dashboard` -> redirects by role
- Migrated auth domain logic to `modules/auth`:
  - `server/auth.config.ts`
  - `server/get-session.ts`
  - `server/register-user.ts`
  - `actions/client-auth-actions.ts`
  - `schemas/auth.schemas.ts`
  - `types/auth.types.ts`
- `lib/auth.ts` became a facade over `modules/auth`.
- `app/api/register/route.ts` now calls module service.

## Target module layout

Each domain module should converge to:

- `server/`
- `ui/`
- `schemas/`
- `types/`
- `actions/` (only when necessary)

## Next iterations

1. Create scaffolding for all domain modules:
   - `users`, `teacher`, `student`, `lessons`, `rooms`, `whiteboard`,
     `materials`, `recordings`, `homework`, `notifications`, `admin`.
2. Move business logic out of route handlers/pages into `modules/*/server`.
3. Normalize `lib` into sub-layers:
   - `db/prisma`, `env`, `security`, `logging`, `errors`, `storage`, `realtime`, `constants`, `utils`.
4. Add tests structure:
   - `tests/unit`, `tests/integration`, `tests/e2e`.
