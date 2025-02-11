import { create } from "zustand";
import { User } from "@/core/auth/interfaces/user";
import {
  authCheckStatus,
  authLogin,
  authRegister,
} from "@/core/auth/actions/auth-actions";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";

export type AuthStatus = "authenticated" | "unauthenticated" | "cheking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  login: (email: string, password: string) => Promise<Boolean>;
  register: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<Boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  changeStatus: (token?: string, user?: User) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  //properties
  status: "cheking",
  token: undefined,
  user: undefined,

  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      await SecureStorageAdapter.deleteItem("token");
      return false;
    }

    set({
      status: "authenticated",
      token: token,
      user: user,
    });

    await SecureStorageAdapter.setItem("token", token);
    return true;
  },

  //actions
  login: async (email: string, password: string) => {
    const respo = await authLogin(email, password);

    return get().changeStatus(respo?.token, respo?.user);
  },

  register: async (email: string, password: string, fullName: string) => {
    const resp = await authRegister(email, password, fullName);
    return get().changeStatus(resp?.token, resp?.user);
  },

  checkStatus: async () => {
    const respo = await authCheckStatus();

    get().changeStatus(respo?.token, respo?.user);
  },

  logout: async () => {
    SecureStorageAdapter.deleteItem("token");

    set({
      status: "unauthenticated",
      token: undefined,
      user: undefined,
    });
  },
}));
