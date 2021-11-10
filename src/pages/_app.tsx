import 'the-new-css-reset/css/reset.css';
import '@fontsource/noto-sans-jp/300.css';
import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/500.css';
import '@fontsource/noto-sans-jp/700.css';

import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import React from 'react';

import { APP_NAME } from '../constants';
import useStore, { StoreProvider } from '../store';
import theme, { createEmotionCache } from '../theme'; // eslint-disable-line import/order
const clientSideEmotionCache = createEmotionCache();

import type { AppPropsWithGetLayout } from '../layouts';

export default function MyApp(
  props: AppPropsWithGetLayout & { emotionCache?: EmotionCache },
): JSX.Element {
  const { emotionCache = clientSideEmotionCache } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{APP_NAME}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StoreProvider>
          <AppImpl {...props} />
        </StoreProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

const AppImpl = ({ Component, pageProps }: AppPropsWithGetLayout) => {
  const store = useStore();

  React.useEffect(() => {
    (async () => {
      if (!store.ready) return;
      if (store.user) return;
      await store.userFetch();
    })();
  }, [store]);

  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
};
