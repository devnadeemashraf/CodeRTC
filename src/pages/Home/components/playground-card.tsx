import { Lock } from "lucide-react";

import { toast } from "sonner";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/hooks/useTypedRTK";
import { selectAppUser } from "@/store/selectors/app.selector";

interface PlaygroundCardProps {
  room: IRoom;
}

const PlaygroundCard = ({ room }: PlaygroundCardProps) => {
  const user = useAppSelector(selectAppUser);

  const handleOnClickDeleteRoom = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    toast(`Deleting: ${room.id}`);
  };

  const handleOnClickCopyRoomId = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    navigator.clipboard.writeText(room.id);
    toast(`Copied: ${room.id}`);
  };

  return (
    <Card
      title={room.topic}
      className="border-0 bg-accent/20 min-w-[350px] hover:bg-accent/60 transition-colors cursor-pointer select-none"
    >
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg text-ellipsis truncate">
            {room?.topic}
          </CardTitle>
          <CardDescription>{room?.owner?.name}</CardDescription>
        </div>
        <div className="flex items-center justify-center gap-4">
          {room.isProtected && (
            <Lock size={14} className="text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardFooter className="w-full">
        <span
          onClick={handleOnClickCopyRoomId}
          className="text-xs mr-auto text-muted-foreground font-mono hover:underline"
        >
          {room?.id}
        </span>
        <span className="border-2 rounded-xl px-2 py-1 text-xs text-muted-foreground">
          # {room?.language}
        </span>
      </CardFooter>
    </Card>
  );
};

export default PlaygroundCard;
