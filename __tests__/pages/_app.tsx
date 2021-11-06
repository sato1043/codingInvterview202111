import React from 'react';
import { render } from '@testing-library/react';
import App from '../../src/pages/_app';
import Home from '../../src/pages/Home';

jest.mock('next/dist/client/router', () => require('next-router-mock'));
import singletonRouter, { Router } from 'next/router';
import { user1 } from '../fixtures';
import { User } from '../../src/domain';
const mockRouter = singletonRouter as unknown as Router;

const mockStoreWithoutStoreReady = {
  ready: false,
  user: user1,
  userFetch: jest.fn().mockResolvedValue(user1),
};
const mockStoreWithoutValidUser = {
  ready: true,
  user: undefined,
  userFetch: jest.fn().mockResolvedValue(user1),
};
const mockStoreWithValidUser = {
  ready: true,
  user: user1,
  userFetch: jest.fn().mockResolvedValue(user1),
};
let mockStore: {
  ready: boolean;
  user: User | undefined;
  userFetch: () => Promise<User | undefined>;
} = mockStoreWithValidUser;
jest.mock('../../src/store', () => ({
  __esModule: true,
  default: () => mockStore,
  StoreProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe('pages/_app', () => {
  beforeEach(() => {
    mockRouter.push('/');
    mockStore = mockStoreWithValidUser;
  });
  test('レンダー可能', () => {
    expect(() =>
      render(<App Component={Home} pageProps={{}} router={mockRouter} />),
    ).not.toThrowError();
  });
  test('store初期化前', () => {
    mockStore = mockStoreWithoutStoreReady;
    expect(() =>
      render(<App Component={Home} pageProps={{}} router={mockRouter} />),
    ).not.toThrowError();
  });
  test('store初期化後user取得前', () => {
    mockStore = mockStoreWithoutValidUser;
    expect(() =>
      render(<App Component={Home} pageProps={{}} router={mockRouter} />),
    ).not.toThrowError();
  });
});
