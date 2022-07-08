import React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";

class ReactImageCompressorDocument extends Document {
  render() {
    return (
      <Html>
        <style>
          {`
            body {
              background: linear-gradient(to right, #6dd5fa, #2980b9, #6dd5fa);
            }
          `}
        </style>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="A Simple Offline Image Compressor Built With React"
          />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ReactImageCompressorDocument;
