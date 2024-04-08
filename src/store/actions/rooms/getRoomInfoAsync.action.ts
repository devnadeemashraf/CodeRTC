import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRoomDetails } from "@/http";

import { RESET_ACTIVE_ROOM } from "@/store/slices/room/active.slice";

type TGetRoomInfoAsyncActionParams = {
  roomId: string;
};

export const getRoomInfoAsyncAction = createAsyncThunk(
  "GET_ROOM_INFO_ASYNC",
  async ({ roomId }: TGetRoomInfoAsyncActionParams, thunkAPI) => {
    const response = await getRoomDetails(roomId);
    if (response.status === "SUCCESS") {
      return response.data;
    } else {
      thunkAPI.dispatch(RESET_ACTIVE_ROOM());
      throw new Error(response.message);
    }
  }
);
