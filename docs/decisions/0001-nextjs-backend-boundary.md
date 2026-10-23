# ADR 0001: Keep the backend in the Next.js application

- **Status:** Accepted as the current direction; implementation details remain subject to repository inspection.
- **Date:** 2026-10-20

## Context
The project is an existing Next.js 16.4 application. The owner wants a maintainable, professional backend without introducing an unnecessary separate server at this stage.

## Decision
Use Next.js Route Handlers as the HTTP boundary and maintain a dedicated `backend/` area for server-side business logic and data access where useful. Keep Supabase as the managed PostgreSQL/Auth platform.

## Consequences
- One deployable application and fewer operational components.
- Business rules can be tested independently of React components.
- Route Handlers should remain thin and delegate meaningful use cases.
- Server-only code and secrets must be protected from client bundles.
- A separate service can be considered later if requirements justify it; do not introduce one preemptively.
