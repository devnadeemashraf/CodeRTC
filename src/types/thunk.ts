export type TStatus = "idle" | "loading" | "success" | "failed";

export interface IAsyncThunkStatus {
  status: TStatus;
}

export interface IAsyncThunkError {
  error: string | undefined | unknown;
}
