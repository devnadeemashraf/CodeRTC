import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { getAllAssociatedRoomsAsyncAction } from "@/store/actions/app/userActions";

import { IAppSliceInitialState } from "@/types/redux/slices/app";

const getAllAssociatedRoomsReducer = (
  builder: ActionReducerMapBuilder<IAppSliceInitialState>
) => {
  builder
    .addCase(getAllAssociatedRoomsAsyncAction.pending, (state) => {
      state.fetchingAssociatedRoomsStatus = "loading";
    })
    .addCase(getAllAssociatedRoomsAsyncAction.fulfilled, (state) => {
      state.fetchingAssociatedRoomsStatus = "success";
    })
    .addCase(getAllAssociatedRoomsAsyncAction.rejected, (state, action) => {
      state.error = action.error.message;
      state.fetchingAssociatedRoomsStatus = "failed";
    });
};

export default getAllAssociatedRoomsReducer;
