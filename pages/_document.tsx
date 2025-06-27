import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="MCP Panel - Manage and test your MCP integrations" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}