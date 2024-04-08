import { Provider } from "react-redux";
import { ThemeProvider } from "./themeProvider";
import { ChildrenProps } from "@/types/global";

import { store } from "@/store";
import { TooltipProvider } from "../ui/tooltip";

const Providers = ({ children }: ChildrenProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="code-rtc-theme">
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;
