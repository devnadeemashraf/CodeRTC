import { RootState } from "@/store";

export const selectActiveRoom = (state: RootState) => state.activeRoom.room;

export const selectActiveRoomProtected = (state: RootState) =>
  state.activeRoom.protected;

export const selectActiveRoomVerified = (state: RootState) =>
  state.activeRoom.verified;

export const selectPerformCacheCleanup = (state: RootState) =>
  state.activeRoom.performCacheCleanup;

export const selectActiveRoomSavingCodeContentStatus = (state: RootState) =>
  state.activeRoom.savingCodeContentStatus;

export const selectFetchingRoomInfoStatus = (state: RootState) =>
  state.activeRoom.fetchingRoomInfoStatus;

export const selectDeletingRoomStatus = (state: RootState) =>
  state.activeRoom.deletingRoomStatus;

export const selectActiveRoomError = (state: RootState) =>
  state.activeRoom.error;

export const selectActiveRoomMembers = (state: RootState) =>
  state.activeRoom.members;

export const selectActiveRoomMessages = (state: RootState) =>
  state.activeRoom.messages;
