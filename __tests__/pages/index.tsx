import React from 'react';
import { render } from '@testing-library/react';
import Index from '../../src/pages/index';

describe('pages/index', () => {
  test('レンダー可能', () => {
    expect(() => render(<Index />)).not.toThrowError();
  });
});