import { cn } from "@/lib/utils";
import { ClassNameWithChildrenProps } from "@/types/global";

interface MainLayoutInterface extends ClassNameWithChildrenProps {
  id?: string;
}

const MainLayout = ({ children, className, id = "" }: MainLayoutInterface) => {
  return (
    <section
      id={id}
      className={cn("flex min-h-screen h-full w-full flex-col", className)}
    >
      {children}
    </section>
  );
};

export default MainLayout;
