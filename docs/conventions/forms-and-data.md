# Forms and Data

This document outlines form validation, schema declaration, and date handling rules in `TableForge_Institutional`.

---

## Reference implementations
- [schemas/partner.schema.ts](../../schemas/partner.schema.ts) — Partner lead validation schema.
- [schemas/taverna.schema.ts](../../schemas/taverna.schema.ts) — Taverna topic and reply schemas.
- [app/para-lojas/page.tsx](../../app/para-lojas/page.tsx) — Partner form implementation using React Hook Form and Zod.
- [components/taverna/create-topic-modal.tsx](../../components/taverna/create-topic-modal.tsx) — Modal form for publishing new topics.

---

## React Hook Form + Zod

All forms must use `react-hook-form` paired with `@hookform/resolvers/zod`:

```typescript
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<IFormValues>({
  resolver: zodResolver(FormSchema),
});
```

### Single Source of Truth
Form types must always be inferred directly from their Zod schemas:

```typescript
export const PartnerLeadSchema = z.object({
  spaceOrEventName: z.string().min(3, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  type: z.number().min(1, "Selecione o tipo"),
});

export type IPartnerLeadForm = z.infer<typeof PartnerLeadSchema>;
```

### Number Inputs with React Hook Form
When validating numeric fields with `z.number()`, always configure `{ valueAsNumber: true }` in `register` so React Hook Form passes the converted number value to the resolver:

```typescript
<select {...register("type", { valueAsNumber: true })}>
<input type="number" {...register("capacity", { valueAsNumber: true })} />
```

---

## Dates and Timestamps

1. **Storage and Mock Contracts**: Dates are persisted and exchanged strictly in UTC ISO 8601 (`YYYY-MM-DDTHH:mm:ssZ`).
2. **UI Rendering**: Conversion from UTC to local user time takes place exclusively during render using `toLocaleDateString("pt-BR", ...)` or `Intl.DateTimeFormat`.
3. **Form Submissions**: New entries generate timestamps with `new Date().toISOString()`.
