import { create } from "zustand";
import { createAuthSlice } from "@/store/slices/auth-slice";
import type { BoundStore } from "@/store/types";

export const useBoundStore = create<BoundStore>()((...args) => ({
  ...createAuthSlice(...args),
}));
