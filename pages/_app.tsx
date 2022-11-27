import React from "react";
import type { AppProps } from "next/app";
import { Plus_Jakarta_Sans } from "@next/font/google";

import "../styles/globals.css";
import { Loading } from "../components/Loading";
import { usePageLoading } from "../hooks/loading";
import styles from "../styles/App.module.css";

const jakarta = Plus_Jakarta_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

export const App = ({ Component, pageProps }: AppProps) => {
  const { isPageLoading } = usePageLoading();

  return (
    <main className={jakarta.className}>
      <div className={styles.container}>
        {isPageLoading ? <Loading /> : <Component {...pageProps} />}
      </div>
    </main>
  );
};

export default App;
