import {
  APP_API_BASE_URL,
  APP_BASE_URL,
  APP_ENV,
  APP_NAME,
} from '../src/constants';

describe('constants', () => {
  test('定数が定義済み', () => {
    expect(APP_ENV).toBeDefined();
    expect(APP_NAME).toBeDefined();
    expect(APP_BASE_URL).toBeDefined();
    expect(APP_API_BASE_URL).toBeDefined();
  });
});
