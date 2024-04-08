import { cn } from "@/lib/utils";
import { ClassNameWithChildrenProps } from "@/types/global";

interface MainLayoutInterface extends ClassNameWithChildrenProps {
  id?: string;
}

const PlaygroundLayout = ({
  children,
  className,
  id = "",
}: MainLayoutInterface) => {
  return (
    <section id={id} className={cn("w-full h-full", className)}>
      {children}
    </section>
  );
};

export default PlaygroundLayout;
