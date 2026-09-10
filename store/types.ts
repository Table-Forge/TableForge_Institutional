import type { ILoginResponse, IAuthUser } from "@/schemas/auth.schema";
import type { StateCreator } from "zustand";

export interface AuthSlice {
  authData: ILoginResponse | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalTab: "login" | "register";
  hydrateAuth: () => void;
  signIn: (data: ILoginResponse) => void;
  signOut: () => void;
  setAuthUser: (user: IAuthUser) => void;
  openAuthModal: (tab?: "login" | "register") => void;
  closeAuthModal: () => void;
}

export type BoundStore = AuthSlice;
export type SliceCreator<TSlice> = StateCreator<BoundStore, [], [], TSlice>;
