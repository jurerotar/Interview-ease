import '@styles/app.scss';
import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Montserrat } from '@next/font/google';

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext']
});

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            :root {
              --montserrat-font: ${montserrat.className}
            }
          `
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
