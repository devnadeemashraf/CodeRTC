import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AppIcon = () => {
  return (
    <div className="border-b p-2">
      <Link
        to="#"
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "icon",
          })
        )}
        aria-label="Home"
      >
        <Code2 className="size-5 fill-foreground" />
      </Link>
    </div>
  );
};

export default AppIcon;
