<!-- BEGIN:nextjs-agent-rules -->

**## This is NOT the Next.js you know**

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Gym Management System — Agent Instructions

## Project

- Next.js 16.4, TypeScript, Tailwind CSS v4, Supabase PostgreSQL/Auth, deployed on Vercel.
- The application includes a public gym website and a private owner dashboard.
- Before substantive work, read `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`, and `docs/AUDIT.md`, plus relevant records in `docs/decisions/`.

## Workflow

- Inspect `git status`, the current branch, and recent history before making changes.
- Never work directly on `master`. Create a feature branch from updated `master`.
- Preserve existing behavior and make small, reviewable changes.
- Explain the plan before substantial changes; avoid unrelated refactoring.
- Keep audit and design work read-only. Do not modify application code or database schema until the design has been reviewed and explicitly approved.
- Before implementing Next.js-specific changes, read the relevant documentation in `node_modules/next/dist/docs/`.

## Architecture

- Use Next.js Route Handlers for HTTP APIs.
- Keep server-side business logic and data access in a dedicated `backend/` area where appropriate.
- Keep Route Handlers focused on HTTP input/output and delegate business rules to server-side use cases.
- Supabase is the managed database/auth platform; do not introduce a separate backend server without a clear reason.
- Treat this as a proposed architecture until the repository has been inspected and the design approved.

## Security and data integrity

- Never expose Supabase secret/service-role keys in client code.
- Validate all untrusted input on the server.
- Enforce authentication and authorization on the server; hiding a UI control is not authorization.
- Preserve registration, membership, subscription, payment, and audit history. Do not permanently delete business records.
- Record financial corrections/reversals as auditable events rather than overwriting transaction history.
- Keep secrets out of source control and never print secret values in logs or reports.

## Development standards

- Use clear TypeScript and avoid unnecessary abstractions.
- Add or update tests for meaningful business rules and security-sensitive behavior.
- Run relevant lint, type-check, tests, and production build before reporting completion.
- Report what changed, what was tested, and what remains unresolved.
