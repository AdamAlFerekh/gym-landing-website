# Architecture

**Status: proposed target architecture, not a claim that every layer currently exists.** The existing app and API must be inspected before moving files or introducing abstractions.

## 1. Product boundaries
1. **Public website** — explains the gym and collects membership-registration requests.
2. **Private owner dashboard** — allows the gym owner to review requests and manage members, subscriptions, payments, and later classes.
3. **Server-side application** — Next.js Route Handlers and server-only use cases enforce business rules.
4. **Data/auth platform** — Supabase PostgreSQL and Supabase Auth.

## 2. Request/data flow
Browser UI → Next.js Route Handler (`app/api/.../route.ts`) → input validation → server-side use case/service (`backend/...`) → repository/data-access module → Supabase → mapped response.

- Browser code must never receive `SUPABASE_SECRET_KEY` or another service-role secret.
- The service-role key bypasses Row Level Security (RLS). Any server route using it must perform explicit authentication, authorization, validation, and narrowly scoped operations.
- Use the authenticated user's identity for admin actions. Do not treat a request as authorized just because it originated from the dashboard.
- Avoid duplicating business rules across React components and API routes. The server is authoritative.

## 3. Suggested folder responsibilities
This is a target structure to review, not a mandate to create every folder immediately.

- `app/` — routes, layouts, page composition, and Route Handlers.
- `app/api/<resource>/route.ts` — HTTP boundary only; request parsing, response status/body, and delegation.
- `backend/<domain>/` — use cases and domain rules, such as registration review, activation, renewal, and payment correction.
- `backend/db/` or `backend/supabase/` — server-only Supabase client and data-access functions.
- `data/` — static presentation/configuration data only where it is genuinely static. Do not make it the authority for changeable prices once plans are database-managed.
- `docs/` — architecture, roadmap, audit findings, and decision records.
- Tests should live alongside the convention already used by the repository; inspect before choosing a test framework or layout.

Do not perform a broad folder migration just to match this proposal. Introduce boundaries incrementally when implementing a feature.

## 4. Core domain model — conceptual proposal
The following entities are candidates for the reviewed data model. This is not a migration specification.

- **Membership plans** — configurable plan names/durations/prices, with historical price snapshots where needed.
- **Registration requests** — public applications with pending/approved/rejected/closed outcomes; not the same thing as an active membership.
- **Members** — stable internal identity and current contact details.
- **Subscriptions** — a member's purchased membership period, with start/end dates and lifecycle status.
- **Payments** — immutable financial events, including amount, currency, timestamp, method, recorder, and optional receipt/reference.
- **Administrative audit events** — who performed an important action, when, and the relevant entity/change/reason.
- **Class sessions and reservations** — intentionally deferred until the owner reopens the class scope.

Relationships, uniqueness rules, exact statuses, foreign keys, date semantics, and transaction boundaries remain design work. Do not create these tables based on this document alone.

## 5. Business invariants
- Submitting a public form creates a registration request; it does not activate a subscription.
- Activation requires owner approval and full payment. The membership start date is the date full payment is recorded.
- Initial payment method is cash at the gym, in USD, full payment only.
- Rejected requests remain immutable historical records. A person may submit a new request after rejection.
- A phone number with a pending request should not create another ordinary pending request.
- An active member's public registration attempt should be recorded as an administrative event/alert and direct them to ask the gym about renewal.
- Renewals preserve previous subscription/payment history.
- Expired memberships must no longer count as active; expiry warnings begin three days before expiry.
- Business records must not be permanently deleted.
- Financial corrections must preserve the original transaction and have an auditable reason.
- Only active members may reserve classes when class functionality is resumed.

## 6. Authentication and authorization
- Initial deployment has one owner/admin account; design should not prevent future staff roles.
- Use Supabase Auth for identity, then check the user's role/permissions on the server.
- A hidden button or client-side route guard is only a UX measure, never the security boundary.
- Review RLS policies and grants separately from application-level authorization.
- Do not expose secret/service-role credentials to the client.
- Before shipping dashboard APIs, test unauthenticated access, wrong-role access, and attempts to operate on another user's records.

## 7. API conventions
- Validate body shape and field lengths/types server-side; normalize email/phone consistently.
- Return deliberate HTTP statuses and safe, user-appropriate errors.
- Log operational details server-side without leaking secrets or unnecessary personal data to clients.
- Keep technical logs separate from durable business audit records.
- Consider request size limits, abuse/rate limiting, idempotency, and database transaction boundaries when designing endpoints.
- Never trust client-supplied prices or permissions; derive prices/plan details from the authoritative server-side plan record.
