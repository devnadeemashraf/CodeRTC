import { createAsyncThunk } from "@reduxjs/toolkit";
import { attemptJoinRoom, attemptVerifyPasscodeAndJoinRoom } from "@/http";

import {
  RESET_ACTIVE_ROOM,
  SET_ACTIVE_ROOM,
} from "@/store/slices/room/active.slice";
import { ROOMS_CACHE_KEYS } from "@/constants/localStorageKeys";
import useLocalStorage from "@/hooks/useLocalStorage";
import { toast } from "sonner";
import { SET_STATUS } from "@/store/slices/room/joined.slice";

type TJoinRoomAsyncActionParams = {
  roomId: string;
  userId: string;
};

type TVerifyPasscodeAndJoinRoomAsyncActionParams = {
  roomId: string;
  userId: string;
  passcode: string;
};

export const joinRoomAsyncAction = createAsyncThunk(
  "JOIN_ASYNC",
  async ({ roomId, userId }: TJoinRoomAsyncActionParams, thunkAPI) => {
    const { getItems, setItems } = useLocalStorage();

    // Update Cache
    const cachedJoinedRooms = getItems(ROOMS_CACHE_KEYS.JOINED_ROOMS);
    const hasJoined = cachedJoinedRooms.filter(
      (room: IRoom) => room.id === roomId
    );

    if (hasJoined.length <= 0) {
      const response = await attemptJoinRoom({
        roomId,
        userId,
      });
      if (response.status === "SUCCESS") {
        if (!response.data.requiresPasscode) {
          cachedJoinedRooms.push(response.data);
          setItems(ROOMS_CACHE_KEYS.JOINED_ROOMS, cachedJoinedRooms);

          thunkAPI.dispatch(
            SET_ACTIVE_ROOM({
              room: response.data,
              protected: response.data.isProtected,
              verified: true,
            })
          );
        }

        return response.data;
      } else {
        toast(`Uh Oh! ${response.message}`);
        thunkAPI.dispatch(RESET_ACTIVE_ROOM());
        throw new Error(response.message);
      }
    } else {
      toast(`You are already a member of this room!`);
      thunkAPI.dispatch(RESET_ACTIVE_ROOM());
      thunkAPI.dispatch(SET_STATUS("success"));
      return null;
    }
  }
);

export const verifyPasscodeAndJoinRoomAsyncAction = createAsyncThunk(
  "VERIFY_PASSCODE_AND_JOIN_ASYNC",
  async (
    { roomId, userId, passcode }: TVerifyPasscodeAndJoinRoomAsyncActionParams,
    thunkAPI
  ) => {
    const { getItems, setItems } = useLocalStorage();

    const response = await attemptVerifyPasscodeAndJoinRoom({
      roomId,
      userId,
      passcode,
    });
    if (response.status === "SUCCESS") {
      // Update Cache
      const cachedJoinedRooms = getItems(ROOMS_CACHE_KEYS.JOINED_ROOMS);
      cachedJoinedRooms.push(response.data);

      setItems(ROOMS_CACHE_KEYS.JOINED_ROOMS, cachedJoinedRooms);

      thunkAPI.dispatch(
        SET_ACTIVE_ROOM({
          room: response.data,
          protected: response.data.isProtected,
          verified: true,
        })
      );

      return response.data;
    } else {
      toast(`Uh Oh! ${response.message}`);
      thunkAPI.dispatch(RESET_ACTIVE_ROOM());
      throw new Error(response.message);
    }
  }
);
