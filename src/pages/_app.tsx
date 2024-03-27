import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";

import { Theme } from "@radix-ui/themes";
import { Header } from "@/components";

import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Theme accentColor="plum" className="bg-[var(--accent-2)]">
      <Header />
      <Component {...pageProps} />
    </Theme>
  );
};

export default App;
