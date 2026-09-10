import {
  LoginResponseSchema,
  type ILoginResponse,
} from "@/schemas/auth.schema";
import type { AuthSlice, SliceCreator } from "@/store/types";

export const AUTH_STORAGE_KEY = "auth_data";

function parsePersistedAuth(value: string | null): ILoginResponse | null {
  if (!value) return null;

  try {
    const parsedJson: unknown = JSON.parse(value);
    const parsedAuth = LoginResponseSchema.safeParse(parsedJson);
    if (!parsedAuth.success) return null;

    const expiration = parsedAuth.data.token?.expiration;
    if (expiration) {
      const expTime = new Date(expiration).getTime();
      if (!Number.isNaN(expTime) && expTime <= Date.now()) {
        return null;
      }
    }

    return parsedAuth.data;
  } catch {
    return null;
  }
}

export const createAuthSlice: SliceCreator<AuthSlice> = (set) => ({
  authData: null,
  isLoading: true,
  isAuthModalOpen: false,
  authModalTab: "login",

  hydrateAuth: () => {
    if (typeof window === "undefined") return;

    const persisted = localStorage.getItem(AUTH_STORAGE_KEY);
    const parsedAuth = parsePersistedAuth(persisted);

    if (persisted && !parsedAuth) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    set({
      authData: parsedAuth,
      isLoading: false,
    });
  },

  signIn: (data) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    }
    set({ authData: data, isLoading: false });
  },

  signOut: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem("tableforge_auth");
      localStorage.removeItem("tableforge_token");
      localStorage.removeItem("tableforge_user");
    }
    set({ authData: null, isLoading: false });
  },

  setAuthUser: (user) => {
    set((state) => {
      if (!state.authData) return state;
      const updated: ILoginResponse = {
        ...state.authData,
        user: {
          ...state.authData.user,
          ...user,
        },
      };
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
      }
      return { authData: updated };
    });
  },

  openAuthModal: (tab = "login") =>
    set({ isAuthModalOpen: true, authModalTab: tab }),

  closeAuthModal: () => set({ isAuthModalOpen: false }),
});
