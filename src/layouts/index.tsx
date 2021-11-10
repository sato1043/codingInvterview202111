import React from 'react';

import DefaultPageLayout from './DefaultPageLayout';
export { DefaultPageLayout };

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';

export type ComponentGetLayoutFunc = (page: ReactElement) => JSX.Element;

export type ComponentWithGetLayout = NextPage & {
  getLayout?: ComponentGetLayoutFunc;
};

export type AppPropsWithGetLayout = AppProps & {
  Component: ComponentWithGetLayout;
};

export const wrapDefaultPageLayout = (
  component: ComponentWithGetLayout,
  title = '',
): ComponentWithGetLayout => {
  component.getLayout = (page) => (
    <DefaultPageLayout title={title}>{page}</DefaultPageLayout>
  );
  return component;
};
