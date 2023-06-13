import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../store";
import { AuthProvider } from "./provider";

export interface Credentials {
  username: string;
  password: string;
}

export const USER_ROLES = {
  ADMIN: "admin",
  PERSONNEL: "personnel",
};

export const ALLOWED_ROLES = [USER_ROLES.ADMIN, USER_ROLES.PERSONNEL];

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  token: string;
  isEnabled: boolean;
}

export interface AuthState {
  authenticated: User | null;
  registered: User[];
  status: "idle" | "loading" | "failed";
}

export const moduleName = "auth";

export const initialState: AuthState = {
  authenticated: null,
  registered: AuthProvider.getRegisteredUsers(),
  status: "idle",
};

export const authSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Credentials>) => {
      state.authenticated =
        state.registered.find(
          (user) =>
            user.email === action.payload.username &&
            user.password === action.payload.password
        ) || null;
      //   state.status = "loading";
    },
    logout: (state) => {
      state.authenticated = null;
    },
    signup: (state, action: PayloadAction<User>) => {
      //   state.status = "loading";
      state.registered.push(action.payload);
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(login.fulfilled, (state, action) => {
  //       state.user = action.payload;
  //       state.status = "idle";
  //     });
  //   },
});

export const { login, signup } = authSlice.actions;

export const selectUser = (state: AppState): User | null =>
  state.auth.authenticated;
export const selectStatus = (state: AppState): "idle" | "loading" | "failed" =>
  state.auth.status;
export const selectRegistered = (state: AppState): User[] =>
  state.auth.registered;

export default authSlice.reducer;
