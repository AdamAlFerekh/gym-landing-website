# ADR 0002: Preserve business and financial history

- **Status:** Accepted business rule; exact database enforcement is pending design approval.
- **Date:** 2026-10-20

## Context
The system must preserve a trustworthy history of registration decisions, memberships, renewals, and cash payments.

## Decision
Do not permanently delete business records. Preserve rejected/closed requests, prior subscriptions, and original payment events. Corrections and reversals must be separately recorded with an actor, timestamp, and reason.

## Consequences
- The schema needs explicit lifecycle statuses and auditability.
- Unique constraints must reflect business lifecycle rather than accidentally preventing valid reapplications.
- Financial summaries must be computed from payment transaction records and their correction/reversal semantics, not from registration prices.
- Data retention and access controls still need a reviewed policy.
