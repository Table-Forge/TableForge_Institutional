import { z } from "zod";
import {
  createPasswordSchema,
  dateRequired,
  emailRequired,
  stringRequired,
} from "@/utils/custom-schema-validations";

export const LoginSchema = z.object({
  login: stringRequired,
  password: stringRequired,
});

export const RegisterSchema = z
  .object({
    username: stringRequired.refine(
      (val) => /^[a-zA-Z0-9_]{3,}$/.test(val),
      "Nome de usuário deve ter no mínimo 3 caracteres e conter apenas letras, números e underline",
    ),
    nickname: stringRequired.refine(
      (val) => val.length >= 2,
      "Apelido deve ter no mínimo 2 caracteres",
    ),
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

export const TokenResponseSchema = z.object({
  type: z.string().optional().nullable(),
  value: z.string(),
  expiration: z.coerce.date().optional().nullable(),
});

export const RefreshTokenResponseSchema = z
  .object({
    value: z.string(),
    expiration: z.coerce.date().optional().nullable(),
  })
  .optional()
  .nullable();

export const AuthUserSchema = z
  .object({
    id: z.coerce.number(),
    username: z.string(),
    nickname: z.string().optional().nullable(),
    email: z.string(),
    avatarUrl: z.string().optional().nullable(),
    type: z.string().optional().nullable(),
    status: z.string().optional().nullable(),
    gender: z.string().optional().nullable(),
    birthDate: z.union([z.string(), z.date()]).optional().nullable(),
    createdAt: z.union([z.string(), z.date()]).optional().nullable(),
    badge: z.string().optional().nullable(),
  })
  .passthrough();

export const LoginResponseSchema = z
  .object({
    user: AuthUserSchema.optional().nullable(),
    token: TokenResponseSchema.optional().nullable(),
    refreshToken: RefreshTokenResponseSchema,
  })
  .passthrough();

export type ILoginForm = z.infer<typeof LoginSchema>;
export type IRegisterForm = z.infer<typeof RegisterSchema>;
export type IAuthUser = z.infer<typeof AuthUserSchema>;
export type ITokenResponse = z.infer<typeof TokenResponseSchema>;
export type ILoginResponse = z.infer<typeof LoginResponseSchema>;
