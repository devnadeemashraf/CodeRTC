import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveRoomCodeContent } from "@/http";

type TSaveRoomCodeContentAsyncActionParams = {
  roomId: string;
  codeContent: string;
};

export const saveRoomCodeContentAsyncAction = createAsyncThunk(
  "SAVE_CODE_CONTENT_ASYNC",
  async ({ roomId, codeContent }: TSaveRoomCodeContentAsyncActionParams) => {
    const response = await saveRoomCodeContent(roomId, codeContent);
    if (response.status === "SUCCESS") {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  }
);
