import type { AppProps } from 'next/app';
import '@styles/app.scss';
import React from 'react';
import { Montserrat } from '@next/font/google';
import Head from 'next/head';
import { PreferencesProvider } from '@providers/preferences-context';
import { ApplicationProvider } from '@providers/application-context';
import Layout from '@components/layout/layout';
import { appWithTranslation } from 'next-i18next';

const montserrat = Montserrat();

const App: React.FC<AppProps> = (props) => {
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
            --default-font: ${montserrat.className}
          }`,
          }}
        />
      </Head>
      <ApplicationProvider structure={pageProps?.structure ?? []}>
        <PreferencesProvider colorScheme="dark">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PreferencesProvider>
      </ApplicationProvider>
    </>
  );
};

export default appWithTranslation(App);
