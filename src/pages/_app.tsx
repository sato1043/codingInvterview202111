import 'the-new-css-reset/css/reset.css';
import '@fontsource/noto-sans-jp/300.css';
import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/500.css';
import '@fontsource/noto-sans-jp/700.css';

import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import theme, { createEmotionCache } from '../theme'; // eslint-disable-line import/order
const clientSideEmotionCache = createEmotionCache();

import { APP_NAME } from '../constants';
import useStore, { StoreProvider } from '../store';

export default function MyApp(
  props: AppProps & { emotionCache?: EmotionCache },
): JSX.Element {
  const { emotionCache = clientSideEmotionCache } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppImpl {...props} />
      </ThemeProvider>
    </CacheProvider>
  );
}

const AppImpl = ({ Component, pageProps }: AppProps): JSX.Element => {
  const store = useStore();

  React.useEffect(() => {
    (async () => {
      if (!store.ready) return;
      if (store.user) return;
      await store.userFetch();
    })();
  }, [store]);

  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
};
