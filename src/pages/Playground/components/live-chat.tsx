/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { CornerDownLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/hooks/useTypedRTK";
import { selectActiveRoomMessages } from "@/store/selectors/room/active.selector";

const LiveChat = ({ isChatVisible }: { isChatVisible: boolean }) => {
  const activeRoomMessages = useAppSelector(selectActiveRoomMessages);

  const liveChatRef = useRef<HTMLUListElement | null>(null);

  const handleOnSubmitMessageForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };

  /**
   * position scrollbar in chat screen to the bottom
   * as soon as the page finishes loading
   */
  useEffect(() => {
    if (liveChatRef.current) {
      liveChatRef.current.scrollTop = liveChatRef.current.scrollHeight;
    }
  }, []);

  return (
    <div
      className={`relative hidden flex-col items-start gap-8 overflow-hidden ${
        isChatVisible && "md:flex"
      }`}
    >
      <div className="grid w-full h-full items-start gap-6 overflow-hidden">
        <fieldset className="h-full flex flex-col gap-4 rounded-lg border p-4 overflow-hidden">
          <legend className="-ml-1 px-1 text-sm font-medium">Live Chat</legend>
          <div className="flex-1 h-full rounded-lg overflow-hidden">
            {/* Show Chats Here */}
            <ul
              ref={liveChatRef}
              className="flex flex-col items-center justify-start w-full h-full overflow-y-auto py-4"
            >
              {activeRoomMessages?.map((message) => {
                return (
                  <li className="my-2 select-none flex flex-col items-center justify-center gap-1">
                    <span className="text-[0.6rem] text-muted-foreground/50">
                      {new Date(message?.timestamp).toLocaleString()}
                    </span>
                    <span className="text-[0.75rem] text-muted-foreground/50 bg-accent px-4 py-1 rounded-md">
                      {message?.content}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <form
            onSubmit={(e) => handleOnSubmitMessageForm(e)}
            className="relative overflow-hidden h-fit mt-auto rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
          >
            <Label htmlFor="message" className="sr-only">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0">
              {/* Can Add Buttons for Emojis and Stuff Here */}
              <Button type="submit" size="sm" className="ml-auto gap-1.5">
                Send
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default LiveChat;
