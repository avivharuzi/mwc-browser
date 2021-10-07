import { ChannelConnectionCreator } from './channel-connection-creator';

describe('ChannelConnectionCreator', () => {
  it('should be create ChannelConnection interface', () => {
    const channelConnectionCreator = new ChannelConnectionCreator();
    const channelConnection = channelConnectionCreator.getChannelConnection();
    expect(channelConnection.id).toBeDefined();
    expect(channelConnection.isMaster).toEqual(false);
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
    await setTimeout(() => {
      channelConnectionCreator.update();
      const updatedAtAfter =
        channelConnectionCreator.getChannelConnection().updatedAt;
      expect(updatedAtAfter.getTime()).toBeGreaterThan(
        updatedAtBefore.getTime()
      );
    }, 1000);
  });

  it('should be create change master value', () => {
    const channelConnectionCreator = new ChannelConnectionCreator();
    expect(channelConnectionCreator.getChannelConnection().isMaster).toEqual(
      false
    );
    channelConnectionCreator.setIsMaster(true);
    expect(channelConnectionCreator.getChannelConnection().isMaster).toEqual(
      true
    );
    channelConnectionCreator.setIsMaster(false);
    expect(channelConnectionCreator.getChannelConnection().isMaster).toEqual(
      false
    );
  });
});
