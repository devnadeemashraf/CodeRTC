/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cloud, Code, Loader, Share } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/hooks/useTypedRTK";

import { selectActiveRoomMembers } from "@/store/selectors/room/active.selector";

interface HeaderProps {
  title: string;
  savingCode: boolean;
  compilingCode: boolean;
  handleOnClickShare: () => void;
  handleOnClickSave: () => void;
  handleOnClickRun: () => void;
}

const Header = ({
  compilingCode,
  savingCode,
  title,
  handleOnClickShare,
  handleOnClickSave,
  handleOnClickRun,
}: HeaderProps) => {
  const members = useAppSelector(selectActiveRoomMembers);

  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold">{title}</h1>

      <div className="ml-auto flex items-center justify-center gap-2">
        <ActiveUsers members={members} />

        {/* Share Button */}
        <Button
          disabled={savingCode || compilingCode}
          onClick={handleOnClickShare}
          variant="ghost"
          size="sm"
          className="ml-auto gap-1.5 text-sm"
        >
          <Share className="size-3.5" />
          <span>Share</span>
        </Button>

        {/* Save Button */}
        <Button
          disabled={savingCode || compilingCode}
          onClick={handleOnClickSave}
          variant="outline"
          size="sm"
          className="ml-auto gap-1.5 text-sm"
        >
          {savingCode == true ? (
            <Loader className="size-3.5 animate-spin ease-in-out" />
          ) : (
            <Cloud className="size-3.5" />
          )}
          <span>Save</span>
        </Button>

        {/* Run Button */}
        <Button
          disabled={compilingCode}
          onClick={handleOnClickRun}
          variant="outline"
          size="sm"
          className="ml-auto gap-1.5 text-sm"
        >
          {compilingCode ? (
            <Loader className="size-3.5 animate-spin ease-in-out" />
          ) : (
            <Code className="size-3.5" />
          )}
          <span>Run</span>
        </Button>
      </div>
    </header>
  );
};

const ActiveUsers = ({ members }: { members: IUser[] | undefined }) => {
  if (!members) {
    return null;
  }

  if (members.length < 1) {
    return null;
  }

  return (
    <ul className="flex gap-2">
      {members.map((user) => {
        return (
          <Avatar className="w-6 h-6">
            <AvatarImage src={user.profileImage} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
        );
      })}
    </ul>
  );
};

export default Header;
