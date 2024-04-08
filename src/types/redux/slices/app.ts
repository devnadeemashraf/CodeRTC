import { IAsyncThunkError, TStatus } from "@/types/thunk";

export interface IAppSliceInitialState extends IAsyncThunkError {
  user: IUser | null;
  authenticated: boolean;

  authenticating: boolean;

  signingInUserStatus: TStatus;
  signingOutUserStatus: TStatus;
  registeringUserStatus: TStatus;
  authenticatingUserStatus: TStatus;

  fetchingUserStatus: TStatus;
  fetchingAssociatedRoomsStatus: TStatus;
}
