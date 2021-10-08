import * as delay from 'delay';

import { Channel } from './channel';

describe('Channel', () => {
  it('should be at start with 0 connections', function () {
    const channel = new Channel('my-channel');
    expect(channel.connections).toHaveLength(0);
    channel.destroy();
  });

  it('should be isManager false', () => {
    const channel = new Channel('my-channel');
    expect(channel.isManager).toEqual(false);
    channel.destroy();
  });

  it('should be manager after few seconds', async () => {
    const channel = new Channel('my-channel');
    await delay(4000);
    expect(channel.isManager).toEqual(true);
  });
});
