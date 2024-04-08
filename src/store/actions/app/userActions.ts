import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  registerUser,
  getAllAssociatedRooms,
} from "@/http";

import useLocalStorage from "@/hooks/useLocalStorage";
import { ROOMS_CACHE_KEYS } from "@/constants/localStorageKeys";

import { SET_CREATED_ROOMS } from "@/store/slices/room/created.slice";
import { SET_JOINED_ROOMS } from "@/store/slices/room/joined.slice";

export const getAllAssociatedRoomsAsyncAction = createAsyncThunk(
  "FETCH_ASSOCIATED_ROOMS_ASYNC",
  async (_, thunkAPI) => {
    const { getItems, setItems } = useLocalStorage();

    const cachedCreatedRooms = getItems(ROOMS_CACHE_KEYS.CREATED_ROOMS);
    const cachedJoinedRooms = getItems(ROOMS_CACHE_KEYS.JOINED_ROOMS);

    if (cachedCreatedRooms && cachedJoinedRooms) {
      thunkAPI.dispatch(SET_CREATED_ROOMS(cachedCreatedRooms));
      thunkAPI.dispatch(SET_JOINED_ROOMS(cachedJoinedRooms));

      return {
        createdRooms: cachedCreatedRooms,
        joinedRooms: cachedJoinedRooms,
      };
    } else {
      const response = await getAllAssociatedRooms();

      if (response.status === "SUCCESS") {
        // Cache Created and Joined Rooms
        setItems(ROOMS_CACHE_KEYS.CREATED_ROOMS, response.data.createdRooms);
        setItems(ROOMS_CACHE_KEYS.JOINED_ROOMS, response.data.joinedRooms);

        thunkAPI.dispatch(SET_CREATED_ROOMS(response.data.createdRooms));
        thunkAPI.dispatch(SET_JOINED_ROOMS(response.data.joinedRooms));
        return response.data;
      } else {
        throw new Error(response.message);
      }
    }
  }
);

export const loginUserAsyncAction = createAsyncThunk(
  "LOGIN_USER_ASYNC",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await loginUser({
      username,
      password,
    });
    if (response.status === "SUCCESS") {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  }
);

export const registerUserAsyncAction = createAsyncThunk(
  "REGISTER_USER_ASYNC",
  async ({
    name,
    username,
    password,
    profileImage,
  }: {
    name: string;
    username: string;
    password: string;
    profileImage: string;
  }) => {
    const response = await registerUser({
      name,
      username,
      password,
      profileImage,
    });
    if (response.status === "SUCCESS") {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  }
);

export const logoutUserAsyncAction = createAsyncThunk(
  "LOGOUT_USER_ASYNC",
  async () => {
    const response = await logoutUser();
    if (response.status == "SUCCESS") {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  }
);

export const checkAuthUserAsyncAction = createAsyncThunk(
  "AUTH_STATUS_ASYNC",
  async () => {
    const response = await checkAuthStatus();
    if (response.status == "SUCCESS") {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  }
);
