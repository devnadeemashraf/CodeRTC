import { Provider } from "react-redux";
import { ThemeProvider } from "./themeProvider";
import { ChildrenProps } from "@/types/global";

import { store } from "@/store";

const Providers = ({ children }: ChildrenProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="code-rtc-theme">
        {children}
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;
