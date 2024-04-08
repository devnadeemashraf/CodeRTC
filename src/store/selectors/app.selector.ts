import { RootState } from "@/store";

export const selectAppUser = (state: RootState) => state.app.user;

export const selectAppAuthenticating = (state: RootState) =>
  state.app.authenticating;
export const selectAppAuthenticated = (state: RootState) =>
  state.app.authenticated;

export const selectAppSigningInStatus = (state: RootState) =>
  state.app.signingInUserStatus;
export const selectAppSigningOutStatus = (state: RootState) =>
  state.app.signingOutUserStatus;
export const selectAppRegisteringStatus = (state: RootState) =>
  state.app.registeringUserStatus;
export const selectAppAuthenticatingStatus = (state: RootState) =>
  state.app.authenticatingUserStatus;

export const selectAppFetchingStatus = (state: RootState) =>
  state.app.fetchingUserStatus;
export const selectAppFetchingAssociatedRoomsStatus = (state: RootState) =>
  state.app.fetchingAssociatedRoomsStatus;

export const selectAppError = (state: RootState) => state.app.error;
