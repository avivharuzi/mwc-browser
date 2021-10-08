import { Channel } from './channel';
import { mwcBrowser } from './mwc-browser';

describe('mwcBrowser', () => {
  it('should create Channel instance', () => {
    expect(mwcBrowser('my-channel')).toBeInstanceOf(Channel);
  });
});
