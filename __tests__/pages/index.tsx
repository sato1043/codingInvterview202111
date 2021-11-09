import { render } from '@testing-library/react';
import React from 'react';

import mockLink from '../../__mocks__/components/Link';
import Index from '../../src/pages/index';

jest.mock('../../src/components/Link', () => mockLink);

describe('pages/index', () => {
  test('レンダー可能', () => {
    expect(() => render(<Index />)).not.toThrowError();
  });
});
