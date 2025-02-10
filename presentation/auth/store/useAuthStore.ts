import { create } from "zustand";
import { User } from "@/core/auth/interfaces/user";

export type AuthStatus = "authenticated" | "unauthenticated" | "cheking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  login: (email: string, password: string) => Promise<Boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  //properties
  status: "cheking",
  token: undefined,
  user: undefined,

  //actions
  login: async (email: string, password: string) => {
    return true;
  },
  checkStatus: async () => {},
  logout: async () => {},
}));
