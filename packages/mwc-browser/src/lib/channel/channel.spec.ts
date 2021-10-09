import { Channel } from './channel';
import { delay } from '../utils';

describe('Channel', () => {
  it('should be with valid id', function () {
    const channel = new Channel('my-channel');
    expect(channel.id).toBeDefined();
    expect(channel.id).toHaveLength(36);
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

  it('should be at start with 1 connection', function () {
    const channel = new Channel('my-channel');
    expect(channel.numberOfConnections).toEqual(1);
    channel.destroy();
    expect(channel.numberOfConnections).toEqual(0);
  });
});
