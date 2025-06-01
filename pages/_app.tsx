import { useEffect, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import Hotjar from '@hotjar/browser';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AppContext from 'appContext';
import theme from 'mui/theme/theme';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { spaceGrotesk, spaceMono } from 'resources/fonts/fonts';
import useAuth from 'sharedProject/hooks/useAuth';

import Layout from 'components/Layout/Layout';

import { useApollo } from '../src/apolloClient';

import '../src/resources/css/globals.css';
import '../src/resources/css/scrollbar.css';
import 'react-toastify/dist/ReactToastify.min.css';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    grecaptcha: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  const { token, setToken } = useAuth();

  const contextUm = useMemo(
    () => ({
      token,
      setToken
    }),
    [token, setToken]
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      const siteId = 5038508;
      const hotjarVersion = 6;

      Hotjar.init(siteId, hotjarVersion);
    }
  }, []);

  return (
    <>
      <Head>
        <title>CraftTrust</title>
        <meta name="description" content="Individual Farm Storefront with Metrc Integration" />
        <meta property="og:image" content="/posterImage.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="apple-mobile-web-app-title" content="CraftTrust" />
        <meta name="application-name" content="CraftTrust" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme(spaceGrotesk.style.fontFamily, spaceMono.style.fontFamily)}>
          <CssBaseline />
          <div className={spaceGrotesk.className}>
            <ApolloProvider client={apolloClient}>
              <AppContext.Provider value={contextUm}>
                <Layout>
                  <>
                    <Component {...pageProps} />
                  </>
                </Layout>
                <ToastContainer position="top-right" theme="dark" pauseOnHover closeOnClick />
              </AppContext.Provider>
            </ApolloProvider>
            {/* <CustomerIoAnalytics /> */}
          </div>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}
// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   // eslint-disable-next-line no-console
//   console.log(metric);
// }

export default MyApp;
