# Date and Timestamp Conventions

This document defines the mandatory rules for handling dates, timestamps, and time zones in `TableForge_Institutional`.

The API distinguishes **three** date types and each one has its own rule:

---

## Reference implementations
- [components/input/input.date.controlled.tsx](../../components/input/input.date.controlled.tsx) — `DateInput`: built with `react-datepicker`, `date-fns` (locale `ptBR`), `MaskedInput`, and custom styling via `.tf-datepicker-*` with `#root-portal`. Emits `YYYY-MM-DD` (DateOnly) or ISO UTC string (when `showTime`).
- [utils/custom-schema-validations.ts](../../utils/custom-schema-validations.ts) — `dateRequired`, `dateOnlyOptional`, and `dateOptional`.

---

## 1. The three types

| Type | Wire format | Read with | Send with |
|---|---|---|---|
| Instant (`DateTime`) | `"2026-09-02T20:00:00Z"` | `Intl.DateTimeFormat` / `toLocaleDateString` | `new Date().toISOString()` |
| Day (`DateOnly`) | `"2026-08-21"` | `dayjs(value).format("DD/MM/YYYY")` | `dayjs(value).format("YYYY-MM-DD")` |
| Time of day (`TimeOnly`) | `"19:30:00"` | `value.slice(0, 5)` | `"HH:mm:ss"` |

The API sends every instant in UTC with the `Z` suffix.

A day carries no time and no time zone: it must render the same in any time zone. Never use `new Date("2026-08-21")` without setting explicit noon/local time, as UTC midnight shifts to the previous day in Brasília.

### Field inventory
- **Instants**: `createdAtUtc`, `lastActivityAtUtc`, `updatedAtUtc`.
- **Days**: `birthDate`.

---

## 2. Date and time lifecycle in forms

1. **User input**: `DateInput` renders in the browser time zone. It accepts `DD/MM/AAAA` typing via mask, provides a calendar selector trigger, and emits `YYYY-MM-DD`.
2. **Submission**: the schema validates the wire format:
   - Day fields: validated via `dateRequired` / `dateOnlyOptional`.
   - Instant fields: generated at submit time via `new Date().toISOString()`.

---

## 3. Golden rule

> Instants travel in UTC and are converted to local time only when rendered. Days are never converted at all.

---

## 4. What NOT to do

- ❌ Do not read or normalize a day field with `new Date("YYYY-MM-DD")` directly into UTC without accounting for local timezone shifts.
- ❌ Do not send instants without the `Z` suffix or without a UTC offset.
- ❌ Do not hardcode manual time zone math (e.g. adding or subtracting 3 hours).
