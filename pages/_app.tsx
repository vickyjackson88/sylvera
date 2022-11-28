import React from "react";
import type { AppProps } from "next/app";
import { Plus_Jakarta_Sans } from "@next/font/google";

import hero from "../public/hero.png";

import "../styles/globals.css";
import { Loading } from "../components/Loading";
import { usePageLoading } from "../hooks/loading";
import styles from "../styles/App.module.css";
import Image from "next/image";

const jakarta = Plus_Jakarta_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

export const App = ({ Component, pageProps }: AppProps) => {
  const { isPageLoading } = usePageLoading();

  return (
    <main className={jakarta.className}>
      <div className={styles.container}>
        <Image className={styles.hero} src={hero} alt={"cool hero banner"} />
        {isPageLoading ? (
          <Loading />
        ) : (
          <div className={styles.content}>
            <Component {...pageProps} />
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
