import { ILoginForm, IRegisterForm, IAuthUser } from "@/schemas/auth.schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export interface IAuthResult {
  token: string;
  user: IAuthUser;
}

export const AuthService = {
  login: async (credentials: ILoginForm): Promise<IAuthResult> => {
    if (API_BASE_URL) {
      try {
        const query = new URLSearchParams({
          login: credentials.login,
          password: credentials.password,
        });

        const response = await fetch(`${API_BASE_URL}/users/authenticate?${query.toString()}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const user = data.user || data;
          const token = data.token?.value || data.token || "";

          return {
            token,
            user: {
              id: user.id || Date.now(),
              username: user.username || credentials.login,
              nickname: user.nickname || user.username || credentials.login,
              email: user.email || credentials.login,
              avatarUrl: user.avatarUrl || null,
              badge: "FerreiroFundador",
            },
          };
        }
      } catch {
        // Fallback para mock se o backend estiver inacessível localmente
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      token: `mock_jwt_token_${Date.now()}`,
      user: {
        id: 42,
        username: credentials.login.includes("@") ? credentials.login.split("@")[0] : credentials.login,
        nickname: credentials.login.includes("@") ? credentials.login.split("@")[0] : credentials.login,
        email: credentials.login.includes("@") ? credentials.login : `${credentials.login}@tableforge.com.br`,
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        badge: "FerreiroFundador",
      },
    };
  },

  register: async (data: IRegisterForm): Promise<IAuthResult> => {
    if (API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          return AuthService.login({
            login: data.email,
            password: data.password,
          });
        }
      } catch {
        // Fallback para mock
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      token: `mock_jwt_token_${Date.now()}`,
      user: {
        id: Date.now(),
        username: data.username,
        nickname: data.nickname,
        email: data.email,
        avatarUrl: null,
        badge: "FerreiroFundador",
      },
    };
  },
};
