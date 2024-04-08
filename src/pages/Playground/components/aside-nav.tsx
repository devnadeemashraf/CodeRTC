import { useContext } from "react";
import {
  DoorOpen,
  LucideIcon,
  MessageCircleIcon,
  MessageCircleOff,
  Trash,
} from "lucide-react";

import { LiveChatContext } from "@/context/live-chat-context";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { selectAppUser } from "@/store/selectors/app.selector";
import { selectActiveRoom } from "@/store/selectors/room/active.selector";

import { useAppSelector } from "@/hooks/useTypedRTK";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AsideNav = () => {
  const user = useAppSelector(selectAppUser);
  const activeRoom = useAppSelector(selectActiveRoom);

  const {
    isChatVisible,
    setIsChatVisible,
    newMessages,
    handleOnClickLeaveRoom,
    handleOnClickDeleteRoom,
  } = useContext(LiveChatContext);

  return (
    <>
      <nav className="grid gap-1 p-2">
        <AsideNavItem
          icon={isChatVisible ? MessageCircleIcon : MessageCircleOff}
          tooltip={
            newMessages > 0 ? `${newMessages} new messages` : "Toggle Messages"
          }
          bubbleValue={newMessages}
          onClick={() => setIsChatVisible(!isChatVisible)}
        />
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <AsideNavItem
          onClick={handleOnClickLeaveRoom}
          bubbleValue={0}
          icon={DoorOpen}
          tooltip="Leave Room"
        />
        {user?.id == activeRoom?.ownerId ? (
          <AlertDialog>
            <AlertDialogTrigger onClick={(e) => e.stopPropagation()}>
              <AsideNavItem bubbleValue={0} icon={Trash} tooltip="Close Room" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this room and remove the data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No, not right now</AlertDialogCancel>
                <AlertDialogAction onClick={handleOnClickDeleteRoom}>
                  Yes, delete this room
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null}
      </nav>
    </>
  );
};

const AsideNavItem = ({
  icon: Icon,
  tooltip,
  bubbleValue,
  onClick,
}: {
  icon: LucideIcon;
  tooltip: string;
  bubbleValue: number;
  onClick?: () => void;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative mt-auto rounded-lg"
          aria-label="Account"
          onClick={onClick}
        >
          <Icon className="size-5" />
          {bubbleValue > 0 ? (
            <span className="absolute w-5 h-5 flex items-center justify-center rounded-full -top-1 -right-1 bg-red-500 text-xs">
              {bubbleValue > 9 ? `9+` : bubbleValue}
            </span>
          ) : null}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
};

export default AsideNav;
