import { ChannelConnectionCreator } from './channel-connection-creator';
import { delay } from '../utils';

describe('ChannelConnectionCreator', () => {
  it('should be create ChannelConnection interface', () => {
    const channelConnectionCreator = new ChannelConnectionCreator();
    const channelConnection = channelConnectionCreator.getChannelConnection();
    expect(channelConnection.id).toBeDefined();
    expect(channelConnection.isManager).toEqual(false);
    expect(channelConnection.updatedAt).toBeInstanceOf(Date);
    expect(channelConnection.createdAt).toBeInstanceOf(Date);
  });

  it('should be create unique ChannelConnection', () => {
    const channelConnectionCreatorFirst = new ChannelConnectionCreator();
    const channelConnectionFirst =
      channelConnectionCreatorFirst.getChannelConnection();
    const channelConnectionCreatorSecond = new ChannelConnectionCreator();
    const channelConnectionSecond =
      channelConnectionCreatorSecond.getChannelConnection();
    expect(
      channelConnectionFirst.id === channelConnectionSecond.id
    ).toBeFalsy();
  });

  it('should be update the updatedAt date value', async () => {
    const channelConnectionCreator = new ChannelConnectionCreator();
    const updatedAtBefore =
      channelConnectionCreator.getChannelConnection().updatedAt;
    await delay(1000);
    channelConnectionCreator.update();
    const updatedAtAfter =
      channelConnectionCreator.getChannelConnection().updatedAt;
    expect(updatedAtAfter.getTime()).toBeGreaterThan(updatedAtBefore.getTime());
  });

  it('should be create change manager value', () => {
    const channelConnectionCreator = new ChannelConnectionCreator();
    expect(channelConnectionCreator.getChannelConnection().isManager).toEqual(
      false
    );
    channelConnectionCreator.setIsManager(true);
    expect(channelConnectionCreator.getChannelConnection().isManager).toEqual(
      true
    );
    channelConnectionCreator.setIsManager(false);
    expect(channelConnectionCreator.getChannelConnection().isManager).toEqual(
      false
    );
  });
});
