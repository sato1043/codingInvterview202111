import { AppProps } from 'next/app';
import React from 'react';
import useStore, { StoreProvider } from '../store';

const AppImpl = ({ Component, pageProps }: AppProps): JSX.Element => {
  const store = useStore();

  React.useEffect(() => {
    if (!store.ready) return;
    if (store.user) return;
    console.log('store.userFetch', store.user);
    store.userFetch();
  }, [store]);

  return <Component {...pageProps} />;
};

const App = (appProps: AppProps): JSX.Element => {
  return (
    <StoreProvider>
      <AppImpl {...appProps} />
    </StoreProvider>
  );
};

export default App;
