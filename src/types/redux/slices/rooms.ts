/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAsyncThunkError, TStatus } from "@/types/thunk";

export interface IActiveRoomInitialState extends IAsyncThunkError {
  room: IRoom | null;
  protected: boolean;
  verified: boolean;

  performCacheCleanup: boolean;

  fetchingRoomInfoStatus: TStatus;
  savingCodeContentStatus: TStatus;
  deletingRoomStatus: TStatus;

  members: any[];
  messages: any[];
}
