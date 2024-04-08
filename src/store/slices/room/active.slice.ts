import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import saveCodeContentReducer from "@/store/reducers/room/saveCodeContent.reducer";
import getRoomInfoReducer from "@/store/reducers/room/getRoomInfo.reducer";
import deleteRoomReducer from "@/store/reducers/room/deleteRoom.reducer";

import { IActiveRoomInitialState } from "@/types/redux/slices/rooms";

const initialState: IActiveRoomInitialState = {
  room: null,
  protected: true,
  verified: false,

  performCacheCleanup: false,

  fetchingRoomInfoStatus: "idle",
  savingCodeContentStatus: "idle",
  deletingRoomStatus: "idle",

  error: undefined,

  members: [],
  messages: [],
};

const activeRoomSlice = createSlice({
  name: "ROOM_SLICE",
  initialState,
  reducers: {
    ADD_MEMBER_TO_LIST: (currentState, action) => {
      currentState.members.push(action.payload);
    },
    REMOVE_MEMBER_FROM_LIST: (currentState, action) => {
      currentState.members = currentState.members.filter(
        (member) => member.id !== action.payload.id
      );
    },
    ADD_MESSAGE: (currentState, action) => {
      currentState.messages.push(action.payload);
    },
    SET_VERIFIED: (currentState, action: PayloadAction<boolean>) => {
      currentState.verified = action.payload;
    },
    SET_ACTIVE_ROOM: (currentState, action) => {
      currentState.room = action.payload.room;
      currentState.protected = action.payload.protected;
      currentState.verified = action.payload.verified;
    },
    RESET_ACTIVE_ROOM: (currentState) => {
      currentState.room = null;
      currentState.protected = true;
      currentState.verified = false;

      currentState.members = [];
      currentState.messages = [];
    },
  },
  extraReducers(builder) {
    getRoomInfoReducer(builder);
    saveCodeContentReducer(builder);
    deleteRoomReducer(builder);
  },
});

export const {
  SET_VERIFIED,
  SET_ACTIVE_ROOM,
  RESET_ACTIVE_ROOM,
  ADD_MEMBER_TO_LIST,
  REMOVE_MEMBER_FROM_LIST,
  ADD_MESSAGE,
} = activeRoomSlice.actions;
export default activeRoomSlice.reducer;
