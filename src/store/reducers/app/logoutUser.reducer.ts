import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { logoutUserAsyncAction } from "@/store/actions/app/userActions";

import { IAppSliceInitialState } from "@/types/redux/slices/app";

const logoutUserReducer = (
  builder: ActionReducerMapBuilder<IAppSliceInitialState>
) => {
  builder
    .addCase(logoutUserAsyncAction.pending, (state) => {
      state.signingOutUserStatus = "loading";

      state.signingInUserStatus = "idle";
      state.registeringUserStatus = "idle";
      state.authenticatingUserStatus = "idle";
    })
    .addCase(logoutUserAsyncAction.fulfilled, (state, _) => {
      state.user = null;
      state.authenticated = false;

      state.signingOutUserStatus = "success";

      state.signingInUserStatus = "idle";
      state.registeringUserStatus = "idle";
      state.authenticatingUserStatus = "idle";
    })
    .addCase(logoutUserAsyncAction.rejected, (state, action) => {
      state.error = action.error.message;

      state.signingOutUserStatus = "failed";

      state.signingInUserStatus = "idle";
      state.registeringUserStatus = "idle";
      state.authenticatingUserStatus = "idle";
    });
};

export default logoutUserReducer;
