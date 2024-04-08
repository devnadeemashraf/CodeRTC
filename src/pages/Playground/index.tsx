import { useEffect, useState } from "react";

import Aside from "./components/aside";
import Header from "./components/header";
import LiveChat from "./components/live-chat";
import CodeEditor from "./components/code-editor";

import { LiveChatContext } from "@/context/live-chat-context";

import LoadingOverlay from "@/components/shared/loadingOverlay";
import PasscodeOverlay from "@/components/shared/passcodeOverlay";

import useRoomFunctionalities from "@/hooks/useRoomFunctionalities";
import useRoomSocket from "@/hooks/useRoomSocket";
import { selectDeletingRoomStatus } from "@/store/selectors/room/active.selector";
import { useAppSelector } from "@/hooks/useTypedRTK";

export default function Playground() {
  const {
    roomId,
    activeRoom,
    activeRoomPasscodeVerified,
    codeContent,
    setCodeContent,
    codeOutput,
    compilingCode,
    savingCode,
    statusGetRoomDetails,
    handleOnClickShare,
    handleOnClickSave,
    handleOnClickRun,
  } = useRoomFunctionalities();

  const { loading, connectSocket, disconnectSocket, handleOnClickDeleteRoom } =
    useRoomSocket();

  const deletingRoomStatus = useAppSelector(selectDeletingRoomStatus);

  const [passcodeVerified, setPasscodeVerified] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);

  /**
   * Room Side Effects
   */

  /**
   * Connect User when Joining the Room and Password has been entered for protected Rooms
   */
  useEffect(() => {
    if (activeRoom?.isProtected && passcodeVerified) {
      connectSocket();
    } else if (activeRoom) {
      connectSocket();
    } else {
      console.log("Awaiting Socket Connection!");
    }
  }, [activeRoom, passcodeVerified]);

  if (
    !passcodeVerified &&
    activeRoom?.isProtected &&
    !activeRoomPasscodeVerified
  ) {
    return <PasscodeOverlay setPasscodeVerified={setPasscodeVerified} />;
  }

  if (
    statusGetRoomDetails == "loading" ||
    deletingRoomStatus == "loading" ||
    roomId == "" ||
    loading
  ) {
    return <LoadingOverlay />;
  }

  return (
    <div className="grid h-screen w-full pl-[56px]">
      <LiveChatContext.Provider
        value={{
          isChatVisible,
          setIsChatVisible,
          newMessages: 0,
          handleOnClickLeaveRoom: disconnectSocket,
          handleOnClickDeleteRoom: handleOnClickDeleteRoom,
        }}
      >
        <Aside />
      </LiveChatContext.Provider>
      <div className="flex flex-col h-full max-h-[100svh]">
        <Header
          title={activeRoom?.topic as string}
          savingCode={savingCode}
          compilingCode={compilingCode}
          handleOnClickShare={handleOnClickShare}
          handleOnClickSave={handleOnClickSave}
          handleOnClickRun={handleOnClickRun}
        />
        <main
          className={`h-full grid flex-1 gap-4 p-4 overflow-hidden ${
            isChatVisible == true
              ? "md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          <LiveChat isChatVisible={isChatVisible} />
          <CodeEditor
            codeContent={codeContent}
            codeOutput={codeOutput}
            setCodeContent={setCodeContent}
          />
        </main>
      </div>
    </div>
  );
}
