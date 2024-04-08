import { createContext } from "react";

const liveChatContextInitialValue: {
  isChatVisible: boolean;
  setIsChatVisible: React.Dispatch<React.SetStateAction<boolean>>;
  newMessages: number;
  handleOnClickLeaveRoom: () => void;
} = {
  isChatVisible: false,
  setIsChatVisible: () => undefined,
  newMessages: 0,
  handleOnClickLeaveRoom: () => {},
};

export const LiveChatContext = createContext(liveChatContextInitialValue);
