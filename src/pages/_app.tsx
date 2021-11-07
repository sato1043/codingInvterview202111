import { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme, { createEmotionCache } from '../theme';

const clientSideEmotionCache = createEmotionCache();

import { APP_NAME } from '../constants';
import useStore, { StoreProvider } from '../store';

const AppImpl = ({ Component, pageProps }: AppProps): JSX.Element => {
  const store = useStore();

  React.useEffect(() => {
    if (!store.ready) return;
    if (store.user) return;
    store.userFetch();
  }, [store]);

  return <Component {...pageProps} />;
};

const App = (appProps: AppProps): JSX.Element => {
  return (
    <StoreProvider>
      <CacheProvider value={clientSideEmotionCache}>
        <Head>
          <title>{APP_NAME}</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppImpl {...appProps} />
        </ThemeProvider>
      </CacheProvider>
    </StoreProvider>
  );
};

export default App;
