import { configureStore } from "@reduxjs/toolkit";

import appSlice from "./slices/app.slice";

import activeRoomSlice from "./slices/room/active.slice";
import createdRoomsSlice from "./slices/room/created.slice";
import joinedRoomsSlice from "./slices/room/joined.slice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    activeRoom: activeRoomSlice,
    createdRooms: createdRoomsSlice,
    joinedRooms: joinedRoomsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
