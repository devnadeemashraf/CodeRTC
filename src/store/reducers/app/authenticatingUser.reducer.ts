import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { checkAuthUserAsyncAction } from "@/store/actions/app/userActions";

import { IAppSliceInitialState } from "@/types/redux/slices/app";

const authenticatingUserReducer = (
  builder: ActionReducerMapBuilder<IAppSliceInitialState>
) => {
  builder
    .addCase(checkAuthUserAsyncAction.pending, (state) => {
      state.authenticating = true;
      state.authenticated = false;

      state.authenticatingUserStatus = "loading";

      state.signingInUserStatus = "idle";
      state.signingOutUserStatus = "idle";
      state.registeringUserStatus = "idle";
    })
    .addCase(checkAuthUserAsyncAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authenticated = true;
      state.authenticating = false;

      state.authenticatingUserStatus = "success";

      state.signingInUserStatus = "idle";
      state.signingOutUserStatus = "idle";
      state.registeringUserStatus = "idle";
    })
    .addCase(checkAuthUserAsyncAction.rejected, (state, action) => {
      state.user = null;
      state.authenticated = false;
      state.authenticating = false;
      state.error = action.error.message;

      state.authenticatingUserStatus = "failed";

      state.signingInUserStatus = "idle";
      state.signingOutUserStatus = "idle";
      state.registeringUserStatus = "idle";
    });
};

export default authenticatingUserReducer;
