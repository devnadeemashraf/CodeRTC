import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { saveRoomCodeContentAsyncAction } from "@/store/actions/rooms/saveCodeContentAsync.action";
import { IActiveRoomInitialState } from "@/types/redux/slices/rooms";

const saveCodeContentReducer = (
  builder: ActionReducerMapBuilder<IActiveRoomInitialState>
) => {
  builder
    .addCase(saveRoomCodeContentAsyncAction.pending, (state) => {
      state.savingCodeContentStatus = "loading";
    })
    .addCase(saveRoomCodeContentAsyncAction.fulfilled, (state, action) => {
      state.room = action.payload;

      state.savingCodeContentStatus = "success";
    })
    .addCase(saveRoomCodeContentAsyncAction.rejected, (state, action) => {
      state.error = action.error.message;

      state.savingCodeContentStatus = "failed";
    });
};

export default saveCodeContentReducer;
