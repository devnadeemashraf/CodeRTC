import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/store";
import { AppState, User } from "@/types/rtk/app";

const initialState: AppState = {
  authenticated: false,
  user: {
    id: "",
    name: "",
    username: "",
    password: "",
    createdAt: "",
    updatedAt: "",
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAuth: (currentState, { payload }: { payload: boolean }) => {
      currentState.authenticated = payload;
    },
    setUser: (currentState, { payload }: { payload: User }) => {
      currentState.user = payload;
    },
    fetchUser: () => {},
    resetUser: (currentState) => {
      currentState.user = {
        id: "",
        name: "",
        username: "",
        password: "",
        createdAt: "",
        updatedAt: "",
      };
    },
    resetAppState: () => {
      resetUser();
      setAuth(false);
    },
  },
});

export const { setAuth, setUser, resetUser, resetAppState } = appSlice.actions;

export const selectAuthenticated = (state: RootState) =>
  state.app.authenticated;

export default appSlice.reducer;
