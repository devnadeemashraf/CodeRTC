/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAsyncThunkError, TStatus } from "@/types/thunk";

export interface IActiveRoomInitialState extends IAsyncThunkError {
  room: IRoom | null;
  protected: boolean;
  verified: boolean;
  fetchingRoomInfoStatus: TStatus;
  savingCodeContentStatus: TStatus;

  members: any[];
  messages: any[];
}
