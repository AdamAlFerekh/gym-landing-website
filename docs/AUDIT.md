# Audit Findings

**Audit status: incomplete.** This document separates evidence previously reported from assumptions and open checks. It is not a substitute for a fresh inspection of the repository and live Supabase project.

## 1. Current database evidence reported during the audit

### Table
One public table was reported: `public.membership_registrations`.

| Column | Type | Nullability/default |
|---|---|---|
| `id` | `uuid` | NOT NULL, `gen_random_uuid()` |
| `full_name` | `text` | NOT NULL |
| `phone` | `text` | NOT NULL |
| `email` | `text` | NOT NULL |
| `membership_duration` | `text` | NOT NULL |
| `membership_price` | `text` | NOT NULL |
| `created_at` | `timestamp with time zone` | NOT NULL, `now()` |

### Indexes reported
- `membership_registrations_pkey`: unique btree on `id`.
- `membership_registrations_phone_unique`: unique btree on `phone`.

The unique phone index has a business-rule conflict with the confirmed requirement that someone may submit a new request after a previous request is rejected. It also means a phone can never appear in multiple registration rows unless the data model/index changes. Do not drop or alter it until a reviewed migration plan accounts for existing data and concurrent requests.

### Constraints
The constraints-only SQL query was requested, but its result has not yet been confirmed in the available project context.

### Constraints verified

The constraints query returned:
- Primary key: `membership_registrations_pkey` on `id`.
- Unique constraint: `membership_registrations_phone_unique` on `phone`.
- `NOT NULL` checks for all seven columns.
- No foreign keys or additional business check constraints were returned by the query.

The unique phone constraint conflicts with the confirmed requirement that rejected applicants may submit new requests. A future schema migration must support multiple historical requests per phone while preventing duplicate pending requests. Do not change the existing constraint until a migration plan is reviewed and approved.

### RLS and grants
- RLS was reported enabled on `membership_registrations`; `FORCE ROW LEVEL SECURITY` was reported false.
- A policy query was run, but the only response captured was “success”. It is **not confirmed** whether that means zero rows or a successful query with results.
- Table grants reported for `anon` and `authenticated` included DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, and UPDATE, none grantable. `postgres` was reported with the same privileges grantable; `service_role` with the same privileges not grantable.
- Grants do not, by themselves, establish row access: RLS and the identity/key used by each request also matter.
- Reported role flags: `anon` and `authenticated` had `rolbypassrls=false`; `service_role` and `postgres` had `rolbypassrls=true`. These must be rechecked if security decisions depend on them.

## 2. Existing API reviewed from pasted code

Path: `app/api/membership-registrations/route.ts`.

Observed behavior:
- `POST` checks `NEXT_PUBLIC_SUPABASE_URL` and server-side `SUPABASE_SECRET_KEY`.
- Parses full name, phone, email, and numeric membership ID.
- Validates and normalizes a Lebanese phone number and email.
- Looks up the selected membership in static `@/data/memberships`.
- Inserts full name, phone, email, duration, and price into `membership_registrations`.
- Maps PostgreSQL unique-violation code `23505` to HTTP `409`.
- Returns `201` after insertion, `400` for invalid input, and `500` for server/database failures.
- Uses `createClient` in the route and does not appear to expose the secret key to browser code.

Strengths:
- Server-side input validation and normalization.
- Price/plan is derived from server-side static data rather than accepted directly from the request.
- Explicit response codes for common outcomes.
- Server-side secret usage.

Risks / follow-up checks:
- A Supabase service-role/secret key bypasses RLS. Every endpoint using it must have its own explicit authorization checks and narrow operations.
- No owner authentication or protected dashboard API was shown in the pasted route; inspect the rest of the repository before drawing conclusions.
- Static plan data and `membership_price text` are not yet a normalized, auditable pricing model.
- A permanent unique constraint on registration phone conflicts with repeat applications after rejection.
- Duplicate phone currently returns a generic conflict; desired behavior depends on whether there is a pending request, an active member, or a previously rejected request.
- JSON parsing errors and unexpected runtime/database failures may be conflated by the broad catch; review actual code before changing it.
- Request-size limits, rate/abuse protection, idempotency, logging/privacy, and tests were not evidenced in the pasted route.
- Current endpoint creates a registration request only; it does not create a member, record payment, or activate a subscription. This is consistent with the business rule that application is not activation.

## 3. Confirmed business rules
- Public submission creates a request only; no membership activation on submission.
- One initial owner/admin account. Future staff roles should remain possible.
- Owner reviews the applicant in person and can approve or reject.
- Activation requires both owner approval and full payment.
- Payment is full cash payment at the gym, in USD; no installments initially.
- Membership starts on the date full payment is recorded.
- Rejected requests and reasons are preserved. Rejection reason is owner-only; applicant is notified of rejection without the reason.
- Rejected requests cannot be reopened. Applicant may submit a new request; old records remain.
- A phone with a pending request should be blocked from creating another ordinary pending request.
- An active member's public registration attempt should be recorded as an administrative event/alert, not as a normal new request, and should direct the person to contact the gym about renewal.
- Approved-but-unpaid requests remain awaiting payment until payment or an owner action. No automatic deadline was agreed.
- Owner may close an approved-but-unpaid request with a reason; preserve the record and do not activate.
- Phone is a matching identifier, not permanent identity. Owner phone edits need an audit trail. Stable internal member IDs should preserve history.
- Emails may be shared; do not reject solely because an email already exists.
- Plans/prices currently discussed: 1 month = USD 60; 3 months = USD 165; 5 months = USD 250. Prices may change.
- Renewals can use a different duration and preserve old subscription/payment history.
- Expiry automatically changes active eligibility after the expiry date. Three-day upcoming-expiry warnings are required.
- Dashboard payment totals must derive from payment transactions, not registrations or plan prices.
- Payment correction/reversal must preserve the original payment and record an auditable reason.
- Business records must not be permanently deleted.
- Class functionality is paused and must not be brought into scope without the owner reopening it.
- WhatsApp is desired for rejection and expiry notifications, but provider, cost, consent, delivery failure, and related operational details are unresolved.

## 4. Decisions still open
1. Exact constraints and foreign keys on the existing database.
2. Actual result of the RLS policy query; policy definitions and role grants must be reverified.
3. Whether any data already exists and how it should be migrated.
4. Supabase Auth configuration, owner identity/role storage, and protected-route/API implementation.
5. Canonical registration statuses and allowed transitions.
6. Data model and relationships for members, registration requests, plans, subscriptions, payments, and audit events.
7. Whether plan prices are stored as integer minor units or a suitable numeric currency type, plus historical price snapshots.
8. Membership end-date calculation: calendar-month vs fixed-day durations.
9. Timezone used for expiry and payment dashboard day/month boundaries.
10. Transaction/consistency behavior for approval + payment + activation and payment reversal.
11. WhatsApp provider, consent, cost, retry/failure handling.
12. Backup/recovery and deployment migration process.

## 5. Required next audit steps
- Re-run the constraints query and capture its result.
- Re-run the RLS policy query and explicitly confirm whether it returns rows.
- Inspect current repo tree, `package.json` scripts, `AGENTS.md`, environment variable names (never values), all API routes, Supabase client setup, auth/middleware/proxy, and any admin pages.
- Verify whether migrations are already present and inspect existing data counts without exposing personal records.
- Keep all operations read-only until the model/security design is reviewed and approved.
