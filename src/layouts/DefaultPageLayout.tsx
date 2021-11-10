import Head from 'next/head';
import React, { PropsWithChildren } from 'react';

import Link from '../components/Link';
import { APP_NAME } from '../constants';

const DefaultPageLayout: React.VFC<
  PropsWithChildren<{
    title?: string;
  }>
> = ({ children, title = '' }) => (
  <div>
    <Head>
      <title>{APP_NAME + (title ? ` - ${title}` : '')}</title>
    </Head>
    <header>
      <nav>
        <Link href="/">Home</Link> | <Link href="/about">About</Link> |{' '}
        <Link href="/users">Users List</Link> |{' '}
        <a href="/api/users">Users API</a>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I&apos;m here to stay (Footer)</span>
    </footer>
  </div>
);

export default DefaultPageLayout;
