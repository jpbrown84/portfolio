import React from "react";
import type { AppProps } from "next/app";
import "../decent.css";
import useViewportHeight from "../helpers/useViewportHeight";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useViewportHeight();
  return <Component {...pageProps} />;
};

export default MyApp;
