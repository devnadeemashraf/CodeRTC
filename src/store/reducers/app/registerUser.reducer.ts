import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { registerUserAsyncAction } from "@/store/actions/app/userActions";

import { IAppSliceInitialState } from "@/types/redux/slices/app";

const registerUserReducer = (
  builder: ActionReducerMapBuilder<IAppSliceInitialState>
) => {
  builder
    .addCase(registerUserAsyncAction.pending, (state) => {
      state.authenticating = true;
      state.authenticated = false;

      state.registeringUserStatus = "loading";

      state.signingOutUserStatus = "idle";
      state.signingInUserStatus = "idle";
      state.authenticatingUserStatus = "idle";
    })
    .addCase(registerUserAsyncAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authenticated = true;
      state.authenticating = false;

      state.registeringUserStatus = "success";

      state.signingOutUserStatus = "idle";
      state.signingInUserStatus = "idle";
      state.authenticatingUserStatus = "idle";
    })
    .addCase(registerUserAsyncAction.rejected, (state, action) => {
      state.user = null;
      state.authenticated = false;
      state.authenticating = false;
      state.error = action.error.message;

      state.registeringUserStatus = "failed";

      state.signingOutUserStatus = "idle";
      state.signingInUserStatus = "idle";
      state.authenticatingUserStatus = "idle";
    });
};

export default registerUserReducer;
