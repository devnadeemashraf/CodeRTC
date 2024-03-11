export type User = {
  id: string;
  username: string;
  name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export interface AppState {
  authenticated: boolean;
  user: User;
}
