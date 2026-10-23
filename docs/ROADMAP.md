# Roadmap

Statuses are based on the project context and prior audit, not a fresh repository inspection. Verify before treating any item as complete.

## P0 — Establish reliable project context
- [partial] Add repository instructions and durable project documentation.
- [partial] Record known Supabase findings and explicitly label unresolved audit evidence.
- [planned] Inspect actual repository tree, scripts, current branch, environment-variable usage, and all API Route Handlers.
- [planned] Finish read-only database audit: constraints, indexes, RLS policies, grants, relevant roles, and existing data implications.

## P1 — Approve the data/security design
- [planned] Define entities and relationships for plans, registration requests, members, subscriptions, payments, and business audit events.
- [planned] Decide request lifecycle and exact allowed state transitions.
- [planned] Decide subscription expiry calculation (calendar months vs fixed days), timezone, and date/time storage conventions.
- [planned] Define owner authentication and server-side authorization model.
- [planned] Review transaction/consistency requirements for approval, payment recording, activation, renewal, and payment reversal.
- [planned] Present a design proposal for explicit owner approval. No schema changes before approval.

## P2 — Database foundation (only after approval)
- [planned] Create version-controlled, reviewed migrations.
- [planned] Add constraints, foreign keys, indexes, and appropriate RLS policies/grants.
- [planned] Preserve existing registration data and plan a safe transition from current text-based duration/price fields.
- [planned] Define backup/recovery and migration rollback procedures.
- [planned] Test migration on a non-production environment before production.

## P3 — Secure backend
- [partial] Public membership-registration POST endpoint exists according to prior code review.
- [planned] Move reusable domain rules and database access into server-only backend modules incrementally.
- [planned] Implement owner authentication/authorization for protected endpoints.
- [planned] Registration review: approve/reject with reason retained privately; close approved-but-unpaid requests with reason.
- [planned] Record full cash payment and activate subscription only when approval and payment conditions are both met.
- [planned] Support renewals without overwriting old subscription/payment history.
- [planned] Record auditable payment reversals/corrections.
- [planned] Add rate/abuse protection, robust error handling, and automated tests.

## P4 — Owner dashboard
- [planned] Pending registrations and review actions.
- [planned] Active members and membership history.
- [planned] Expiring/expired memberships and three-day warnings.
- [planned] Payment summary: today's and current calendar month's received payments, based on payment transactions.
- [planned] Owner-triggered WhatsApp messages after provider, cost, consent, and failure behavior are decided.

## P5 — Classes (paused)
- [paused] Class schedule and capacity.
- [paused] Reservations restricted to active members; prevent overbooking.
- [paused] Admin-only cancellation and reservation history preservation.
- [paused] Attendance/no-show tracking.
- [paused] Class-cancellation notifications and rescheduling behavior.

## P6 — Verification and release
- [planned] Automated tests for domain rules and access control.
- [planned] Verify production environment variables and deployment settings.
- [planned] Run lint, type-check, tests, and production build.
- [planned] Test workflows end-to-end with non-production data.
- [planned] Document deployment, backups, recovery, and operational checks.
