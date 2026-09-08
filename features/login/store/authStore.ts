"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, SchoolInfo } from "../types/authTypes";

interface AuthState {
  token: string | null;
  user: User | null;
  firstTimeLogin: boolean;
  school: SchoolInfo | null;
  isHydrated: boolean;
  setAuth: (token: string, user: User, firstTimeLogin?: boolean) => void;
  setSchool: (school: SchoolInfo) => void;
  completeFirstTimeLogin: () => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      firstTimeLogin: false,
      school: null,
      isHydrated: false,
      setAuth: (token, user, firstTimeLogin = false) =>
        set({ token, user, firstTimeLogin }),
      setSchool: (school) => set({ school }),
      completeFirstTimeLogin: () => set({ firstTimeLogin: false }),
      logout: () =>
        set({ token: null, user: null, firstTimeLogin: false, school: null }),
      setHydrated: (value) => set({ isHydrated: value }),
    }),
    {
      name: "school-management-auth",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
