import { api } from "@/features/api";
import {
  ILoginForm,
  IRegisterForm,
  IAuthUser,
  ILoginResponse,
  LoginResponseSchema,
  AuthUserSchema,
} from "@/features/auth/schemas/auth.schema";


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

  updateProfile: async (payload: {
    id: number;
    username: string;
    email: string;
    nickname?: string | null;
    birthDate: string | Date;
    gender?: string | null;
  }): Promise<IAuthUser> => {
    const body = {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      nickname: payload.nickname ?? null,
      birthDate: formatDateOnly(payload.birthDate),
      gender: payload.gender || "PreferNotToSay",
    };

    const { data } = await api.put("/users/profile", body);
    const parsed = AuthUserSchema.parse(data);
    return {
      ...parsed,
      badge: parsed.badge || "FerreiroFundador",
    };
  },

  updateAvatar: async (id: number, file: File): Promise<IAuthUser> => {
    const formData = new FormData();
    formData.append("Id", String(id));
    formData.append("File", file);

    const { data } = await api.put("/users/avatar", formData);
    const parsed = AuthUserSchema.parse(data);
    return {
      ...parsed,
      badge: parsed.badge || "FerreiroFundador",
    };
  },
};
