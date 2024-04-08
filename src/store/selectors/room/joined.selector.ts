import { RootState } from "@/store";

export const selectJoinedRooms = (state: RootState) => state.joinedRooms.rooms;

export const selectJoinedRoomsProtected = (state: RootState) =>
  state.joinedRooms.protected;

export const selectJoinedRoomsRedirect = (state: RootState) =>
  state.joinedRooms.redirect;

export const selectJoinedRoomsStatus = (state: RootState) =>
  state.joinedRooms.status;

export const selectJoinedRoomsError = (state: RootState) =>
  state.joinedRooms.error;
