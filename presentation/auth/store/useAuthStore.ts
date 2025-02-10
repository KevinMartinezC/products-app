import { create } from "zustand";
import { User } from "@/core/auth/interfaces/user";
import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";

export type AuthStatus = "authenticated" | "unauthenticated" | "cheking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  login: (email: string, password: string) => Promise<Boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  changeStatus: (token?: string, user?: User) => boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  //properties
  status: "cheking",
  token: undefined,
  user: undefined,

  changeStatus: (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      //todo llamar loout
      return false;
    }

    set({
      status: "authenticated",
      token: token,
      user: user,
    });

    return true;
  },

  //actions
  login: async (email: string, password: string) => {
    const respo = await authLogin(email, password);

    return get().changeStatus(respo?.token, respo?.user);
  },

  checkStatus: async () => {
    const respo = await authCheckStatus();

    get().changeStatus(respo?.token, respo?.user);
  },

  logout: async () => {
    //clear token del secure storafe

    set({
      status: "unauthenticated",
      token: undefined,
      user: undefined,
    });
  },
}));
