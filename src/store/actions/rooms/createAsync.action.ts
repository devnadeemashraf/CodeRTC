import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNewRoom } from "@/http";

import {
  RESET_ACTIVE_ROOM,
  SET_ACTIVE_ROOM,
} from "@/store/slices/room/active.slice";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ROOMS_CACHE_KEYS } from "@/constants/localStorageKeys";

type TCreateRoomAsyncActionParams = {
  topic: string;
  isProtected: boolean;
  passcode: string;
  language: string;
};

export const createRoomAsyncAction = createAsyncThunk(
  "CREATE_ASYNC",
  async (
    { topic, isProtected, passcode, language }: TCreateRoomAsyncActionParams,
    thunkAPI
  ) => {
    const response = await createNewRoom({
      topic,
      isProtected,
      passcode,
      language,
    });
    if (response.status === "SUCCESS") {
      // Update Cache
      const { getItems, setItems } = useLocalStorage();

      const cachedCreatedRooms = getItems(ROOMS_CACHE_KEYS.CREATED_ROOMS);
      cachedCreatedRooms.push(response.data);

      setItems(ROOMS_CACHE_KEYS.CREATED_ROOMS, cachedCreatedRooms);

      thunkAPI.dispatch(
        SET_ACTIVE_ROOM({
          room: response.data,
          protected: response.data.isProtected,
          verified: true,
        })
      );
      return response.data;
    } else {
      thunkAPI.dispatch(RESET_ACTIVE_ROOM());
      throw new Error(response.message);
    }
  }
);
