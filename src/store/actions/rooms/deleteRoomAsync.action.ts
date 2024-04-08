import { deleteRoom } from "@/http";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const deleteRoomAsyncAction = createAsyncThunk(
  "DELETE_ROOM_ASYNC",
  async (roomId: string) => {
    const response = await deleteRoom(roomId);
    if (response.status == "SUCCESS") {
      return response;
    } else {
      toast(response.message);
      throw new Error(response.message);
    }
  }
);
