import React from 'react';
import NextDocument, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';

function Document() {
  return (
    <Html className="dark">
      <Head>
        <meta
          httpEquiv="content-type"
          content="text/html; charset=UTF-8"
        />
      </Head>
      <body className="bg-[#080808]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (context: DocumentContext): Promise<DocumentInitialProps> => {
  const initialProps = await NextDocument.getInitialProps(context);
  return {
    ...initialProps,
  };
};

export default Document;
