import { Home, LucideIcon, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AsideNav = () => {
  return (
    <>
      <nav className="grid gap-1 p-2">
        <AsideNavItem
          bubbleValue={0}
          icon={Home}
          isSelectedItem
          tooltip="Home"
        />
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <AsideNavItem
          bubbleValue={0}
          icon={Settings2}
          isSelectedItem={false}
          tooltip="Settings"
        />
      </nav>
    </>
  );
};

const AsideNavItem = ({
  icon: Icon,
  tooltip,
  bubbleValue,
  isSelectedItem,
  onClick,
}: {
  icon: LucideIcon;
  tooltip: string;
  bubbleValue: number;
  isSelectedItem: boolean;
  onClick?: () => void;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`relative mt-auto rounded-lg ${
            isSelectedItem && "bg-accent"
          }`}
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
