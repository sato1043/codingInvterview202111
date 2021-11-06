import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../src/pages/Home';

import { user1 } from '../fixtures';
import { User } from '../../src/domain';

const mockStoreWithValidUser = {
  ready: true,
  user: user1,
};
const mockStoreWithoutValidUser = {
  ready: true,
  user: undefined,
};
let mockStore: {
  ready: boolean;
  user: User | undefined;
} = mockStoreWithValidUser;
jest.mock('../../src/store', () => ({
  __esModule: true,
  default: () => mockStore,
}));

describe('pages/Home', () => {
  beforeEach(() => {
    mockStore = mockStoreWithValidUser;
  });
  test('ユーザロード前', () => {
    mockStore = mockStoreWithoutValidUser;
    const { getByText } = render(<Home />);
    expect(() => getByText(user1.fullName)).toThrow();
    expect(getByText(/loading/)).toBeInTheDocument();
  });
  test('ユーザロード後', () => {
    const { getByText } = render(<Home />);
    expect(getByText(new RegExp(user1.fullName, 'g'))).toBeInTheDocument();
  });
});