import React from "react";
import App from "next/app";

class ReactImageCompressorApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default ReactImageCompressorApp;
