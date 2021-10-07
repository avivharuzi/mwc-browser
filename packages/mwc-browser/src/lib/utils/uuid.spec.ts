import { uuid } from './uuid';

describe('uuid', () => {
  it('should be create valid uuid with 36 length', () => {
    expect(uuid()).toHaveLength(36);
  });

  it('should be create unique uuid value', () => {
    expect(uuid() === uuid()).toBeFalsy();
    expect(uuid() === uuid()).toBeFalsy();
    expect(uuid() === uuid()).toBeFalsy();
    expect(uuid() === uuid()).toBeFalsy();
    expect(uuid() === uuid()).toBeFalsy();
  });
});
