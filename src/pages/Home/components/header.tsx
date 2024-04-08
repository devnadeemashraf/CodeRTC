import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAppDispatch, useAppSelector } from "@/hooks/useTypedRTK";

import { logoutUserAsyncAction } from "@/store/actions/app/userActions";

import LoadingOverlay from "@/components/shared/loadingOverlay";
import {
  selectAppUser,
  selectAppSigningOutStatus,
} from "@/store/selectors/app.selector";
import useLocalStorage from "@/hooks/useLocalStorage";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { clearCache } = useLocalStorage();

  const status = useAppSelector(selectAppSigningOutStatus);
  const user = useAppSelector(selectAppUser);

  const handleOnClickLogout = async () => {
    clearCache();
    dispatch(logoutUserAsyncAction());
  };

  useEffect(() => {
    if (status == "success") {
      navigate("/login");
    }
  }, [status]);

  if (status == "loading") {
    return <LoadingOverlay text="Signing Out.." />;
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full max-w-[1440px] mx-auto items-center justify-end gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {/* <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 mt-[2.5px] text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar>
              <AvatarImage src={"." + user?.profileImage} />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={handleOnClickLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
