import { createContext } from "react";

export const RoomContext = createContext({
  users: [],
  count: 0,
  codeContent: "",
});
