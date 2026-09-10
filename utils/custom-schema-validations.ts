import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { z } from "zod";
import { ERROR_MESSAGE } from "@/components/error-message/error-message.constant";

dayjs.extend(customParseFormat);

const stringRequired = z.preprocess(
  (arg) => {
    if (arg === null || arg === undefined) return "";
    return String(arg);
  },
  z.string().refine((val) => val.trim() !== "", {
    message: ERROR_MESSAGE.required,
  }),
);

const stringOptional = z.preprocess((arg) => {
  if (arg === null || arg === undefined) return undefined;
  const value = String(arg).trim();
  return value === "" ? undefined : value;
}, z.string().optional());

const dateRequired = z.preprocess(
  (arg) => {
    if (arg === null || arg === undefined || arg === "") return "";

    if (arg instanceof Date) {
      if (Number.isNaN(arg.getTime())) return "invalid";
      return dayjs(arg).format("YYYY-MM-DD");
    }

    return arg;
  },
  z.union([
    z
      .string()
      .trim()
      .nonempty(ERROR_MESSAGE.required)
      .refine((val) => dayjs(val, "YYYY-MM-DD", true).isValid(), {
        message: ERROR_MESSAGE.validate,
      }),
    z.date().refine((val) => !Number.isNaN(val.getTime()), {
      message: ERROR_MESSAGE.validate,
    }),
  ]),
);

const dateOnlyOptional = z.preprocess(
  (arg) => {
    if (arg === null || arg === undefined || arg === "") return undefined;
    if (arg instanceof Date) return dayjs(arg).format("YYYY-MM-DD");
    return arg;
  },
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, ERROR_MESSAGE.validate)
    .optional(),
);

const dateOptional = z.preprocess((arg) => {
  if (typeof arg === "string" && arg.trim() === "") return undefined;
  if (arg === null || arg === undefined) return undefined;
  return arg;
}, z.coerce.date().optional());

const emailRequired = z.preprocess(
  (arg) => (typeof arg === "string" ? arg.trim() : ""),
  z
    .string()
    .min(1, { message: ERROR_MESSAGE.required })
    .email({ message: "Formato de e-mail inválido" }),
);

const emailOptional = z.preprocess(
  (arg) => {
    if (arg === null || arg === undefined) return undefined;
    const value = String(arg).trim();
    if (value === "") return undefined;
    return value;
  },
  z.string().email({ message: "Formato de e-mail inválido" }).optional(),
);

export const PASSWORD_MIN_LENGTH = 6;

export const sanitizePasswordValue = (value: string) =>
  value.replace(/[^\x21-\x7E]/g, "");

export const PASSWORD_RULES: {
  label: string;
  message: string;
  test: (value: string) => boolean;
}[] = [
  {
    label: `Pelo menos ${PASSWORD_MIN_LENGTH} caracteres`,
    message: `A senha deve ter pelo menos ${PASSWORD_MIN_LENGTH} caracteres.`,
    test: (value) => value.length >= PASSWORD_MIN_LENGTH,
  },
  {
    label: "Uma letra maiúscula (A-Z)",
    message: "A senha deve conter ao menos uma letra maiúscula.",
    test: (value) => /[A-Z]/.test(value),
  },
  {
    label: "Uma letra minúscula (a-z)",
    message: "A senha deve conter ao menos uma letra minúscula.",
    test: (value) => /[a-z]/.test(value),
  },
  {
    label: "Um número (0-9)",
    message: "A senha deve conter ao menos um número.",
    test: (value) => /[0-9]/.test(value),
  },
  {
    label: "Um caractere especial (ex.: ! @ # $ %)",
    message: "A senha deve conter ao menos um caractere especial (ex.: ! @ # $ %).",
    test: (value) => /[^A-Za-z0-9\s]/.test(value),
  },
];

export const getPasswordError = (value: string): string | null =>
  PASSWORD_RULES.find((rule) => !rule.test(value))?.message ?? null;

export const createPasswordSchema = () =>
  z.string().superRefine((value, ctx) => {
    const message = getPasswordError(value ?? "");
    if (message) {
      ctx.addIssue({ code: "custom", message });
    }
  });

export {
  dateOnlyOptional,
  dateOptional,
  dateRequired,
  emailOptional,
  emailRequired,
  stringOptional,
  stringRequired,
};
