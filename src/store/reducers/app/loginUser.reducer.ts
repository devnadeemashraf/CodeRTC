import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { loginUserAsyncAction } from "@/store/actions/app/userActions";

import { IAppSliceInitialState } from "@/types/redux/slices/app";

const loginUserReducer = (
  builder: ActionReducerMapBuilder<IAppSliceInitialState>
) => {
  builder
    .addCase(loginUserAsyncAction.pending, (state) => {
      state.authenticated = false;
      state.authenticating = true;

      state.signingInUserStatus = "loading";

      state.signingOutUserStatus = "idle";
      state.registeringUserStatus = "idle";
      state.authenticatingUserStatus = "idle";
    })
    .addCase(loginUserAsyncAction.fulfilled, (state, action) => {
      state.authenticated = true;
      state.authenticating = false;
      state.user = action.payload;

      state.signingInUserStatus = "success";

      state.signingOutUserStatus = "idle";
      state.registeringUserStatus = "idle";
      state.authenticatingUserStatus = "idle";
    })
    .addCase(loginUserAsyncAction.rejected, (state, action) => {
      state.user = null;
      state.authenticated = false;
      state.authenticating = false;
      state.error = action.error.message;

      state.signingInUserStatus = "failed";

      state.signingOutUserStatus = "idle";
      state.registeringUserStatus = "idle";
      state.authenticatingUserStatus = "idle";
    });
};

export default loginUserReducer;
