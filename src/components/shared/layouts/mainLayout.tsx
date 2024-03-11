import { cn } from "@/lib/utils";
import { ClassNameWithChildrenProps } from "@/types/global";

const MainLayout = ({ children, className }: ClassNameWithChildrenProps) => {
  return (
    <section className={cn("w-full h-full", className)}>{children}</section>
  );
};

export default MainLayout;
