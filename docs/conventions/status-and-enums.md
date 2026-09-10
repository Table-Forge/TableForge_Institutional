# Status & enums

This document defines how we handle backend enums and render status badges and labels in `TableForge_Institutional`, strictly following the `TableForge-Panel` architecture.

---

## Reference implementations
- [features/users/hooks/enums/use-user-type-enum.ts](../../features/users/hooks/enums/use-user-type-enum.ts) — Standard enum hook.
- [features/users/services/users.services.ts](../../features/users/services/users.services.ts) — Domain service exposing enum endpoints.
- [utils/map-to-select-options.ts](../../utils/map-to-select-options.ts) — Option mapping utility.
- [components/user-status/user-status.tsx](../../components/user-status/user-status.tsx) — Status badge component.
- [app/perfil/page.tsx](../../app/perfil/page.tsx) — Profile details resolving type, status, and gender from backend enums.
- [components/profile/edit-profile-modal.tsx](../../components/profile/edit-profile-modal.tsx) — Form select consuming enum options.

---

## Backend enum hooks

Lists of options (types, statuses, genders, delivery methods) come from the backend whenever an enum endpoint exists.

1. **Service method**: Each domain service exposes `get<X>Enum()` hitting `GET /<domain>/enums/<enum-name>` (e.g., `UserService.getTypeEnum()` → `/users/enums/user-type` in `features/users/services/users.services.ts`).
2. **Enum hook**: One hook per enum at `features/<domain>/hooks/enums/use-<name>-enum.ts`, following the standard shape:

```ts
const typeEnumQuery = useQuery({
  queryKey: USER_KEYS.typeEnum(),
  queryFn: () => UserService.getTypeEnum(),
  select: (data) =>
    mapToSelectOptions({ data, labelKey: "name", valueKey: "value" }),
  enabled,
  staleTime: Infinity,
  gcTime: ENUM_GC_TIME,
  refetchOnWindowFocus: false,
});
```

- Query keys come from the domain key factory (`USER_KEYS.enums()` → `USER_KEYS.typeEnum()` in `features/users/hooks/query-key.ts`).
- `staleTime: Infinity` + `gcTime` of 24h: N consumers on screen share a single request.
- The hook returns `{ typeEnum, isLoadingTypeEnum, typeEnumQuery }` (list defaults to `[]`).

## Option mapping

`mapToSelectOptions` (`utils/map-to-select-options.ts`) transforms backend items into `TSelectOptions` (`components/select/select.interfaces.ts`):

- Params: `data`, `labelKey`, `valueKey` (defaults to `"id"`; enum hooks pass `"value"`), `filterAllowed` (default `true`), `stringifyValue`.
- Output: `{ id, value, label, name, allowSelect }`. The display text field of `TSelectOptions` is `name`.
- `filterAllowed: true` drops options with `allowSelect === false` — keep default in form selects; pass `filterAllowed: false` when resolving labels for listing/display so old records still resolve.

## Displaying status in the UI

When rendering a status pill or badge:
- The **label** comes from the backend enum when available (already in pt-BR); local labels are fallback only.
- The **color** is strictly a frontend concern.
- Pattern (see `components/user-status/user-status.tsx` + `app/perfil/page.tsx`): a per-domain component holding a local map `status value → { label, Tailwind classes }`, receiving the enum options to prefer the backend `name`:

```tsx
const { statusEnum } = useUserStatusEnum();
<UserStatus value={user.status} options={statusEnum} />
```

`UserStatus` normalizes the incoming value (case/accents via `normalizeString`) and resolves aliases (`"ativo"` → `active`) before matching, so it tolerates both enum names and legacy pt-BR values.

Plain-text variant without badge:
```tsx
const userTypeLabel =
  typeEnum.find((o) => String(o.value).toLowerCase() === String(user?.type ?? "").toLowerCase())?.name ||
  user?.type ||
  "Jogador";
```

## Rules

1. **Frontend colors**: Never expect the backend to send hex codes or color names. Map statuses to colors (Tailwind classes) on the frontend.
2. **Strings, matched resiliently**: Status values travel as enum name strings (`"Active"`, `"Draft"`); normalize before matching against local maps.
3. **Cache enums aggressively**: Enum queries always use `staleTime: Infinity` and `refetchOnWindowFocus: false`.

## What NOT to do
- **Don't hardcode labels if an enum exists**: If the backend provides an enum endpoint, use it as the source of truth for labels; local labels are only a fallback for when the enum has not loaded.
- **Don't map enum responses ad hoc in components**: Consume the domain enum hook; the mapping belongs in the hook's `select` via `mapToSelectOptions`.
- **Don't create one-off `TSelectOptions` shapes**: `name` is the display field — don't build options with only `label`.
