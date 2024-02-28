import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";

import { Theme } from "@radix-ui/themes";

import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Theme accentColor="plum">
      <Component {...pageProps} />
    </Theme>
  );
};

export default App;
