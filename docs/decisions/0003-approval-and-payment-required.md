# ADR 0003: Approval and full payment are both required for activation

- **Status:** Accepted business rule; implementation is pending.
- **Date:** 2026-10-20

## Context
Submitting an online registration is only a request. The gym owner confirms eligibility in person and collects payment at the gym.

## Decision
A membership must not become active until the owner has approved the request and full cash payment has been recorded. The membership start date is the date full payment is recorded. An approved-but-unpaid request remains pending payment unless the owner closes it with a reason.

## Consequences
- Registration requests, members, subscriptions, and payments must not be collapsed into one row with a single status.
- Payment recording and activation need reliable consistency guarantees.
- Expiry calculation still needs a decision (calendar months versus fixed days).
