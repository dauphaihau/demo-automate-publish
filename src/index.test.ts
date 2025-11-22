import { hello } from './index';

describe('hello', () => {
  it('should return Hello, World!', () => {
    expect(hello()).toBe('Hello, World!');
  });
});

