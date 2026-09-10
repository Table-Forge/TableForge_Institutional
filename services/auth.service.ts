import { api } from "@/services/api";
import {
  ILoginForm,
  IRegisterForm,
  IAuthUser,
  ILoginResponse,
  LoginResponseSchema,
  AuthUserSchema,
} from "@/schemas/auth.schema";

const formatDateOnly = (date: Date | string): string => {
  if (typeof date === "string") {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
    const parsed = new Date(date);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split("T")[0];
    }
    return date;
  }
  return date.toISOString().split("T")[0];
};

export const AuthService = {
  login: async (credentials: ILoginForm): Promise<ILoginResponse> => {
    const { data } = await api.post("/users/authenticate", null, {
      params: {
        login: credentials.login,
        password: credentials.password,
      },
    });

    const parsed = LoginResponseSchema.parse(data);
    return {
      ...parsed,
      user: parsed.user
        ? {
            ...parsed.user,
            badge: parsed.user.badge || "FerreiroFundador",
          }
        : parsed.user,
    };
  },

  register: async (data: IRegisterForm): Promise<ILoginResponse> => {
    const payload = {
      username: data.username,
      nickname: data.nickname,
      email: data.email,
      birthDate: formatDateOnly(data.birthDate),
      password: data.password,
    };

    await api.post("/users/register", payload);

    return AuthService.login({
      login: data.email,
      password: data.password,
    });
  },

  getProfile: async (id: number): Promise<IAuthUser> => {
    const { data } = await api.get(`/users/${id}`);
    const user = AuthUserSchema.parse(data);
    return {
      ...user,
      badge: user.badge || "FerreiroFundador",
    };
  },

  logout: async (refreshToken?: string | null): Promise<void> => {
    if (!refreshToken) return;
    try {
      await api.post("/users/logout", { refreshToken });
    } catch {
      return;
    }
  },
};
