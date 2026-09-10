# Forms

This document defines how we manage forms and validation using React Hook Form and Zod in `TableForge_Institutional`.

> Date and timestamp rules in forms are defined in [dates-and-timestamps.md](./dates-and-timestamps.md).

## Reference implementations
- [schemas/auth.schema.ts](../../schemas/auth.schema.ts) — Zod schemas with inferred types (`LoginSchema`, `RegisterSchema`).
- [utils/custom-schema-validations.ts](../../utils/custom-schema-validations.ts) — Reusable validators (`stringRequired`, `emailRequired`, `dateRequired`, `createPasswordSchema`, `PASSWORD_RULES`).
- [components/auth/auth-modal.tsx](../../components/auth/auth-modal.tsx) — Full form implementation: `zodResolver`, controlled inputs, password rules checklist, and date input.

---

## Schema-first types

The Zod schema is the single source of truth for any form payload.

1. Define schemas in `schemas/<domain>.schema.ts` (singular: `auth.schema.ts`, `taverna.schema.ts`).
2. Infer the TypeScript type directly from the schema and export it with the `I` prefix.
3. Wire the schema via `zodResolver` to React Hook Form.

```ts
export const RegisterSchema = z
  .object({
    username: stringRequired,
    nickname: stringRequired,
    email: emailRequired,
    birthDate: dateRequired,
    password: createPasswordSchema(),
    confirmPassword: stringRequired,
  })
  .superRefine((data, context) => {
    if (data.password !== data.confirmPassword) {
      context.addIssue({
        code: "custom",
        message: "As senhas devem ser iguais.",
        path: ["confirmPassword"],
      });
    }
  });

export type IRegisterForm = z.infer<typeof RegisterSchema>;
```

Cross-field validation (e.g. password matching) lives strictly in `.superRefine` on the schema.

Form setup:

```ts
const form = useForm<IRegisterForm>({
  resolver: zodResolver(RegisterSchema),
  mode: "onChange",
  defaultValues: {
    username: "",
    nickname: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  },
});
```

---

## Reusable validators

Always use the pre-built Zod primitives in `utils/custom-schema-validations.ts`. They preprocess empty/null values and guarantee pt-BR validation messages:

- `stringRequired` / `stringOptional`
- `emailRequired` / `emailOptional`
- `dateRequired` / `dateOnlyOptional` / `dateOptional`
- `PASSWORD_MIN_LENGTH = 6`
- `PASSWORD_RULES`: list of the 5 mandatory rules (min 6 characters, uppercase, lowercase, number, special character).
- `getPasswordError(value)`: returns the error message for the first unsatisfied rule or null.
- `createPasswordSchema()`: schema validator adhering to `PASSWORD_RULES`.
- `sanitizePasswordValue(value)`: strips invalid/invisible characters from password inputs.

---

## Controlled components

Standard form controls consume React Hook Form's `useController` internally:

- `ControlledInput` — `components/input/input.default.controlled.tsx` (flags: `sanitize`, `sanitizeEmail`, `uppercase`, `removeSpaces`).
- `PasswordInput` — `components/input/input.password.tsx` (toggle visibility, sanitization).
- `PasswordRequirements` — `components/input/password-requirements.tsx` (visual checklist displaying check/X state for the 5 password rules in real time).
- `DateInput` — `components/input/input.date.controlled.tsx` (masked input `DD/MM/AAAA`, calendar picker trigger, serializes to `YYYY-MM-DD`).
- `MaskedInput` — `components/input/input.masked.tsx` (generic mask formatter).

---

## Form layout

Each field is wrapped in an `InputGroup` containing a `Label` and the controlled component:

```tsx
<InputGroup>
  <Label htmlFor="email" isRequired>
    E-mail
  </Label>
  <ControlledInput
    hookForm={form}
    name="email"
    type="email"
    placeholder="seu@email.com"
  />
</InputGroup>
```

---

## Rules

1. **Strict typing**: Every form is typed with `useForm<IYourSchemaType>`, inferred from the schema.
2. **pt-BR validation**: All user-facing error messages must be in pt-BR with correct UTF-8 accents.
3. **No parallel types**: Never declare manual payload interfaces when a Zod schema exists.
4. **No side-effect callbacks**: Do not add `onChangeText` or custom event callbacks to controlled inputs to alter other fields; use `watch` / `useWatch` + `setValue` instead.
