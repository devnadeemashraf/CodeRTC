import { createSlice } from "@reduxjs/toolkit";

import { createRoomAsyncAction } from "@/store/actions/rooms/createAsync.action";
import { IAsyncThunkError, IAsyncThunkStatus } from "@/types/thunk";

interface ICreatedRoomInitialState extends IAsyncThunkStatus, IAsyncThunkError {
  rooms: IRoom[];
  redirect: boolean;
}

const initialState: ICreatedRoomInitialState = {
  rooms: [],
  redirect: false,
  status: "idle",
  error: undefined,
};

const createdRoomsSlice = createSlice({
  name: "ROOM_SLICE",
  initialState,
  reducers: {
    SET_CREATED_ROOMS: (currentState, action) => {
      currentState.rooms = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createRoomAsyncAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRoomAsyncAction.fulfilled, (state, action) => {
        state.redirect = true;
        state.rooms.push(action.payload);

        state.status = "success";
      })
      .addCase(createRoomAsyncAction.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      });
  },
});

export const { SET_CREATED_ROOMS } = createdRoomsSlice.actions;

export default createdRoomsSlice.reducer;
