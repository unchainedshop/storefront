import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class UnchainedDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className="scroll-smooth">
        <noscript
          // eslint-disable-next-line
          dangerouslySetInnerHTML={{
            __html: `
<!--

 _____ _____ _____ _____ _____ _____ _____ _____ ____
|  |  |   | |     |  |  |  _  |     |   | |   __|    \\
|  |  | | | |   --|     |     |-   -| | | |   __|  |  |
|_____|_|___|_____|__|__|__|__|_____|_|___|_____|____/


- Technology & Engineering by Unchained Commerce GmbH - https://unchained.shop

-->

  `,
          }}
        />
        <link rel="preload" type="text/css" href="/api/theme" as="style" />
        <link rel="stylesheet" type="text/css" href="/api/theme" />
        <link
          rel="shortcut icon"
          href="https://unchained.shop/_next/static/media/logo.41b5589a.svg"
        />
        <Head />
        <link rel="stylesheet" type="text/css" href="/api/custom-styles" />

        <body className="bg-slate-100 dark:bg-slate-600">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default UnchainedDocument;
