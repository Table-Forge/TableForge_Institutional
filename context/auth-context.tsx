"use client";

import React, { createContext, useContext, useState, useSyncExternalStore } from "react";
import { IAuthUser, ILoginForm, IRegisterForm } from "@/schemas/auth.schema";
import { AuthService } from "@/services/auth.service";

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
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const TOKEN_KEY = "tableforge_token";
const USER_KEY = "tableforge_user";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("tableforge_auth_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("tableforge_auth_change", callback);
  };
}

function getStoredToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

function getStoredUser() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(USER_KEY);
}

function notifyAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("tableforge_auth_change"));
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");

  const token = useSyncExternalStore(subscribe, getStoredToken, () => null);
  const rawUser = useSyncExternalStore(subscribe, getStoredUser, () => null);

  const user: IAuthUser | null = React.useMemo(() => {
    if (!rawUser) return null;
    try {
      return JSON.parse(rawUser) as IAuthUser;
    } catch {
      return null;
    }
  }, [rawUser]);

  const openAuthModal = (tab: "login" | "register" = "login") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (credentials: ILoginForm) => {
    const result = await AuthService.login(credentials);
    localStorage.setItem(TOKEN_KEY, result.token);
    localStorage.setItem(USER_KEY, JSON.stringify(result.user));
    notifyAuthChange();
    closeAuthModal();
  };

  const register = async (data: IRegisterForm) => {
    const result = await AuthService.register(data);
    localStorage.setItem(TOKEN_KEY, result.token);
    localStorage.setItem(USER_KEY, JSON.stringify(result.user));
    notifyAuthChange();
    closeAuthModal();
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    notifyAuthChange();
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
