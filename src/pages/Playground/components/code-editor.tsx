/* eslint-disable @typescript-eslint/no-explicit-any */
import MonacoEditor from "@monaco-editor/react";

import Outputs from "./outputs";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useRef, useState } from "react";
import { socket } from "@/socket";
import { useAppSelector } from "@/hooks/useTypedRTK";
import { selectActiveRoom } from "@/store/selectors/room/active.selector";
import { selectAppUser } from "@/store/selectors/app.selector";

const CodeEditor = ({
  codeOutput,
  codeContent,
  setCodeContent,
}: {
  codeOutput: string;
  codeContent: string;
  setCodeContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const user = useAppSelector(selectAppUser);
  const activeRoom = useAppSelector(selectActiveRoom);

  const socketTimeoutRef = useRef<any>(null);
  const [content, setContent] = useState(codeContent);

  useEffect(() => {
    socket.on("BROADCAST_ROOM_UPDATES", (updates) => {
      console.log("Client Updates: ", updates);

      if (updates.user.id != user?.id) {
        setContent(updates.room.codeContent);
      }
    });
  }, []);

  const handleOnCodeContentChange = (value: string) => {
    if (activeRoom && user) {
      setCodeContent(value);
      setContent(value);

      if (socketTimeoutRef.current) {
        clearInterval(socketTimeoutRef.current);
      }

      const payload = {
        user,
        room: activeRoom,
        value,
      };

      const timeoutId = setTimeout(() => {
        socket.emit("ROOM_UPDATES", payload);
      }, 2 * 1000);

      socketTimeoutRef.current = timeoutId;
    }
  };

  return (
    <ResizablePanelGroup
      direction="vertical"
      className="relative flex w-full h-full min-h-[50vh] border flex-col rounded-xl  p-4 lg:col-span-2"
    >
      <ResizablePanel minSize={50} defaultSize={75}>
        <MonacoEditor
          height="100%"
          theme="vs-dark"
          options={{
            fontSize: 18,
          }}
          defaultLanguage="javascript"
          language="javascript"
          defaultValue={codeContent}
          value={content}
          onChange={(value) => handleOnCodeContentChange(value as string)}
        />
      </ResizablePanel>
      <ResizableHandle className="my-2" />
      <ResizablePanel maxSize={50} minSize={25}>
        <Outputs outputDetails={codeOutput} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default CodeEditor;
