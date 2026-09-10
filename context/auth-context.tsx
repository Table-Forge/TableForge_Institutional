"use client";

import React, { createContext, useContext, useState, useSyncExternalStore } from "react";
import { IAuthUser, ILoginForm, IRegisterForm } from "@/schemas/auth.schema";
import { AuthService } from "@/services/auth.service";
import { AUTH_STORAGE_KEY } from "@/services/api";

interface IAuthContext {
  user: IAuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalTab: "login" | "register";
  openAuthModal: (tab?: "login" | "register") => void;
  closeAuthModal: () => void;
  login: (credentials: ILoginForm) => Promise<void>;
  register: (data: IRegisterForm) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("tableforge_auth_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("tableforge_auth_change", callback);
  };
}

function getStoredAuthData(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem(AUTH_STORAGE_KEY) ||
    localStorage.getItem("auth_data") ||
    localStorage.getItem("tableforge_user")
  );
}

function notifyAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("tableforge_auth_change"));
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");

  const rawAuthData = useSyncExternalStore(subscribe, getStoredAuthData, () => null);

  const { user, token, refreshToken } = React.useMemo(() => {
    if (!rawAuthData) {
      return { user: null, token: null, refreshToken: null };
    }

    try {
      const parsed = JSON.parse(rawAuthData);
      if (parsed.user && (parsed.token || parsed.token?.value)) {
        const tokenValue =
          typeof parsed.token === "string"
            ? parsed.token
            : parsed.token?.value || "";
        return {
          user: parsed.user as IAuthUser,
          token: tokenValue,
          refreshToken: parsed.refreshToken?.value || parsed.refreshToken || null,
        };
      }

      const tokenValue = localStorage.getItem("tableforge_token") || "";
      return {
        user: parsed as IAuthUser,
        token: tokenValue,
        refreshToken: null,
      };
    } catch {
      return { user: null, token: null, refreshToken: null };
    }
  }, [rawAuthData]);

  const openAuthModal = (tab: "login" | "register" = "login") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (credentials: ILoginForm) => {
    const result = await AuthService.login(credentials);
    const sessionData = {
      token: { value: result.token },
      user: result.user,
      refreshToken: result.refreshToken ? { value: result.refreshToken } : null,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
    localStorage.setItem("auth_data", JSON.stringify(sessionData));
    localStorage.setItem("tableforge_token", result.token);
    localStorage.setItem("tableforge_user", JSON.stringify(result.user));

    notifyAuthChange();
    closeAuthModal();
  };

  const register = async (data: IRegisterForm) => {
    const result = await AuthService.register(data);
    const sessionData = {
      token: { value: result.token },
      user: result.user,
      refreshToken: result.refreshToken ? { value: result.refreshToken } : null,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
    localStorage.setItem("auth_data", JSON.stringify(sessionData));
    localStorage.setItem("tableforge_token", result.token);
    localStorage.setItem("tableforge_user", JSON.stringify(result.user));

    notifyAuthChange();
    closeAuthModal();
  };

  const logout = async () => {
    await AuthService.logout(refreshToken);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem("auth_data");
    localStorage.removeItem("tableforge_token");
    localStorage.removeItem("tableforge_user");
    notifyAuthChange();
  };

  const refreshUser = async () => {
    if (!user?.id) return;
    try {
      const updatedUser = await AuthService.getProfile(user.id);
      const sessionData = {
        token: { value: token || "" },
        user: updatedUser,
        refreshToken: refreshToken ? { value: refreshToken } : null,
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
      localStorage.setItem("auth_data", JSON.stringify(sessionData));
      localStorage.setItem("tableforge_user", JSON.stringify(updatedUser));
      notifyAuthChange();
    } catch {
      return;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
