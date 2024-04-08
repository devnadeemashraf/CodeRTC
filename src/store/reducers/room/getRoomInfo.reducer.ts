import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { IActiveRoomInitialState } from "@/types/redux/slices/rooms";
import { getRoomInfoAsyncAction } from "@/store/actions/rooms/getRoomInfoAsync.action";

const getRoomInfoReducer = (
  builder: ActionReducerMapBuilder<IActiveRoomInitialState>
) => {
  builder
    .addCase(getRoomInfoAsyncAction.pending, (state) => {
      state.fetchingRoomInfoStatus = "loading";
    })
    .addCase(getRoomInfoAsyncAction.fulfilled, (state, action) => {
      state.room = action.payload;
      state.protected = action.payload.isProtected;
      state.verified = false;

      state.fetchingRoomInfoStatus = "success";
    })
    .addCase(getRoomInfoAsyncAction.rejected, (state, action) => {
      state.error = action.error.message;

      state.fetchingRoomInfoStatus = "failed";
    });
};

export default getRoomInfoReducer;
