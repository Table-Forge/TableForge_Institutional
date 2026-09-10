import { z } from "zod";

export const LoginSchema = z.object({
  login: z.string().min(3, "Informe seu e-mail ou nome de usuário"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, "Nome de usuário deve ter no mínimo 3 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "Apenas letras, números e underline"),
  nickname: z.string().min(2, "Informe seu apelido na Taverna"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data no formato AAAA-MM-DD"),
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
