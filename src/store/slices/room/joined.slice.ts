import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  joinRoomAsyncAction,
  verifyPasscodeAndJoinRoomAsyncAction,
} from "@/store/actions/rooms/joinAsync.action";

import { IAsyncThunkError, IAsyncThunkStatus, TStatus } from "@/types/thunk";

interface IJoinedRoomInitialState extends IAsyncThunkStatus, IAsyncThunkError {
  rooms: IRoom[];
  redirect: boolean;
  protected: boolean;
}

const initialState: IJoinedRoomInitialState = {
  rooms: [],
  redirect: false,
  protected: false,
  status: "idle",
  error: undefined,
};

const joinedRoomsSlice = createSlice({
  name: "ROOM_SLICE",
  initialState,
  reducers: {
    SET_JOINED_ROOMS: (currentState, action) => {
      currentState.rooms = action.payload;
    },
    SET_STATUS: (currentState, action: PayloadAction<TStatus>) => {
      currentState.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(joinRoomAsyncAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(joinRoomAsyncAction.fulfilled, (state, action) => {
        if (action.payload !== null) {
          if (action.payload.requiresPasscode) {
            state.redirect = false;
            state.protected = true;
          } else {
            state.redirect = true;
            state.protected = false;
            state.rooms.push(action.payload);
          }
        }

        state.status = "success";
      })
      .addCase(joinRoomAsyncAction.rejected, (state, action) => {
        state.error = action.error.message;

        state.redirect = false;
        state.protected = false;

        state.status = "failed";
      })

      // Verify Passcode and Join Room
      .addCase(verifyPasscodeAndJoinRoomAsyncAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        verifyPasscodeAndJoinRoomAsyncAction.fulfilled,
        (state, action) => {
          state.redirect = true;
          state.protected = false;

          state.rooms.push(action.payload);

          state.status = "success";
        }
      )
      .addCase(
        verifyPasscodeAndJoinRoomAsyncAction.rejected,
        (state, action) => {
          state.error = action.error.message;
          state.redirect = false;

          state.status = "failed";
        }
      );
  },
});

export const { SET_JOINED_ROOMS, SET_STATUS } = joinedRoomsSlice.actions;
export default joinedRoomsSlice.reducer;
