import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { IActiveRoomInitialState } from "@/types/redux/slices/rooms";
import { deleteRoomAsyncAction } from "@/store/actions/rooms/deleteRoomAsync.action";

const deleteRoomReducer = (
  builder: ActionReducerMapBuilder<IActiveRoomInitialState>
) => {
  builder
    .addCase(deleteRoomAsyncAction.pending, (state) => {
      state.deletingRoomStatus = "loading";
    })
    .addCase(deleteRoomAsyncAction.fulfilled, (state) => {
      state.performCacheCleanup = true;
      state.deletingRoomStatus = "success";
    })
    .addCase(deleteRoomAsyncAction.rejected, (state, action) => {
      state.error = action.error.message;
      state.performCacheCleanup = false;
      state.deletingRoomStatus = "failed";
    });
};

export default deleteRoomReducer;
