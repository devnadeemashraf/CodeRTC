import { Card, CardContent } from "../ui/card";
import { Loader } from "lucide-react";

const LoadingOverlay = ({ text = "Please Wait.." }: { text?: string }) => {
  return (
    <main className="absolute top-0 left-0 w-full h-full z-[99999] bg-background/80 flex items-center justify-center backdrop-blur-sm">
      <Card className="max-w-[350px] max-h-[150px] w-full h-full">
        <CardContent className="w-full h-full flex flex-col items-center justify-center">
          <Loader className="animate-spin ease-in-out" />
          <span className="text-muted-foreground text-lg font-medium mt-2">
            {text}
          </span>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoadingOverlay;
