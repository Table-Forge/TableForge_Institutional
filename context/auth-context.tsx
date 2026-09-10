"use client";

import { useEffect, type PropsWithChildren } from "react";
import { IAuthUser, ILoginForm, IRegisterForm } from "@/schemas/auth.schema";
import { AuthService } from "@/services/auth.service";
import { useBoundStore } from "@/store";

export function AuthProvider({ children }: PropsWithChildren) {
  const hydrateAuth = useBoundStore((state) => state.hydrateAuth);

  useEffect(() => {
    hydrateAuth();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === null || event.key === "auth_data") {
        hydrateAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [hydrateAuth]);

  return children;
}

export function useAuth() {
  const authData = useBoundStore((state) => state.authData);
  const isLoading = useBoundStore((state) => state.isLoading);
  const isAuthModalOpen = useBoundStore((state) => state.isAuthModalOpen);
  const authModalTab = useBoundStore((state) => state.authModalTab);
  const openAuthModal = useBoundStore((state) => state.openAuthModal);
  const closeAuthModal = useBoundStore((state) => state.closeAuthModal);
  const signInStore = useBoundStore((state) => state.signIn);
  const signOutStore = useBoundStore((state) => state.signOut);
  const setAuthUser = useBoundStore((state) => state.setAuthUser);

  const login = async (credentials: ILoginForm) => {
    const data = await AuthService.login(credentials);
    signInStore(data);
    closeAuthModal();
  };

  const register = async (data: IRegisterForm) => {
    const result = await AuthService.register(data);
    signInStore(result);
    closeAuthModal();
  };

  const logout = async () => {
    const refreshToken = authData?.refreshToken?.value;
    await AuthService.logout(refreshToken);
    signOutStore();
  };

  const refreshUser = async () => {
    const userId = authData?.user?.id;
    if (!userId) return;

    try {
      const updatedUser = await AuthService.getProfile(userId);
      setAuthUser(updatedUser);
    } catch {
      return;
    }
  };

  return {
    user: (authData?.user as IAuthUser) ?? null,
    token: authData?.token?.value ?? null,
    isAuthenticated: Boolean(authData?.token?.value),
    isLoading,
    isAuthModalOpen,
    authModalTab,
    openAuthModal,
    closeAuthModal,
    login,
    register,
    logout,
    refreshUser,
  };
}
