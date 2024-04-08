import { RootState } from "@/store";

export const selectCreatedRooms = (state: RootState) =>
  state.createdRooms.rooms;

export const selectCreatedRoomsRedirect = (state: RootState) =>
  state.createdRooms.redirect;

export const selectCreatedRoomsStatus = (state: RootState) =>
  state.createdRooms.status;

export const selectCreatedRoomsError = (state: RootState) =>
  state.createdRooms.error;
