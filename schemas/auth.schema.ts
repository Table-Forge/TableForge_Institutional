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

export const AuthUserSchema = z.object({
  id: z.number(),
  username: z.string(),
  nickname: z.string().nullable().optional(),
  email: z.string(),
  avatarUrl: z.string().nullable().optional(),
  badge: z.string().optional(),
});

export type ILoginForm = z.infer<typeof LoginSchema>;
export type IRegisterForm = z.infer<typeof RegisterSchema>;
export type IAuthUser = z.infer<typeof AuthUserSchema>;
