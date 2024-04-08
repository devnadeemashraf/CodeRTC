import { createSlice } from "@reduxjs/toolkit";

import { IAppSliceInitialState } from "@/types/redux/slices/app";

import authenticatingUserReducer from "@/store/reducers/app/authenticatingUser.reducer";
import loginUserReducer from "@/store/reducers/app/loginUser.reducer";
import getAllAssociatedRoomsReducer from "@/store/reducers/app/getAllAssociatedRooms.reducer";
import logoutUserReducer from "@/store/reducers/app/logoutUser.reducer";
import registerUserReducer from "@/store/reducers/app/registerUser.reducer";

const initialState: IAppSliceInitialState = {
  user: null,

  authenticated: true,
  authenticating: true,

  signingInUserStatus: "idle",
  signingOutUserStatus: "idle",
  registeringUserStatus: "idle",
  authenticatingUserStatus: "idle",

  fetchingUserStatus: "idle",
  fetchingAssociatedRoomsStatus: "idle",

  error: undefined,
};

const appSlice = createSlice({
  name: "APP",
  initialState,
  reducers: {},
  extraReducers(builder) {
    getAllAssociatedRoomsReducer(builder);
    loginUserReducer(builder);
    registerUserReducer(builder);
    logoutUserReducer(builder);
    authenticatingUserReducer(builder);
  },
});

export default appSlice.reducer;
