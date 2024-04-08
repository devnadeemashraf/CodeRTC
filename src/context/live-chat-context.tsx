import { createContext } from "react";

const liveChatContextInitialValue: {
  isChatVisible: boolean;
  setIsChatVisible: React.Dispatch<React.SetStateAction<boolean>>;
  newMessages: number;
  handleOnClickLeaveRoom: () => void;
  handleOnClickDeleteRoom: () => void;
} = {
  isChatVisible: false,
  setIsChatVisible: () => undefined,
  newMessages: 0,
  handleOnClickLeaveRoom: () => {},
  handleOnClickDeleteRoom: () => {},
};

export const LiveChatContext = createContext(liveChatContextInitialValue);
