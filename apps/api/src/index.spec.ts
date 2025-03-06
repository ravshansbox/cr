import { inject } from 'vitest';

test('true is true', () => {
  expect(inject('baseUrl')).toMatch(/http:\/\/localhost:/);
});
