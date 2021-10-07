import * as delay from 'delay';

import { ChannelConnectionCreator } from './channel-connection-creator';
import { ChannelConnectionsHandler } from './channel-connections-handler';

describe('ChannelConnectionsHandler', () => {
  it('should be created with empty connections', () => {
    const channelConnectionsHandler = new ChannelConnectionsHandler();
    expect(channelConnectionsHandler.getConnections()).toHaveLength(0);
  });

  it('should be add the same connection only once', () => {
    const channelConnectionCreator = new ChannelConnectionCreator();
    const channelConnectionsHandler = new ChannelConnectionsHandler();
    channelConnectionsHandler.addOrUpdateConnection(
      channelConnectionCreator.getChannelConnection()
    );
    channelConnectionsHandler.addOrUpdateConnection(
      channelConnectionCreator.getChannelConnection()
    );
    channelConnectionsHandler.addOrUpdateConnection(
      channelConnectionCreator.getChannelConnection()
    );
    expect(channelConnectionsHandler.getConnections()).toHaveLength(1);
  });

  it('should be update if there is already connection', () => {
    const channelConnectionCreator = new ChannelConnectionCreator();
    const channelConnectionsHandler = new ChannelConnectionsHandler();
    const channelConnectionFirstTime =
      channelConnectionCreator.getChannelConnection();
    channelConnectionsHandler.addOrUpdateConnection(channelConnectionFirstTime);
    expect(channelConnectionsHandler.getConnections()[0]).toEqual(
      channelConnectionFirstTime
    );
    channelConnectionCreator.setIsMaster(true);
    const channelConnectionSecondTime =
      channelConnectionCreator.getChannelConnection();
    channelConnectionsHandler.addOrUpdateConnection(
      channelConnectionSecondTime
    );
    expect(channelConnectionsHandler.getConnections()[0]).toEqual(
      channelConnectionSecondTime
    );
  });

  it('should reset the connection correctly', () => {
    const channelConnectionCreator = new ChannelConnectionCreator();
    const channelConnectionsHandler = new ChannelConnectionsHandler();
    expect(channelConnectionsHandler.getConnections()).toHaveLength(0);
    channelConnectionsHandler.addOrUpdateConnection(
      channelConnectionCreator.getChannelConnection()
    );
    expect(channelConnectionsHandler.getConnections()).toHaveLength(1);
    channelConnectionsHandler.reset();
    expect(channelConnectionsHandler.getConnections()).toHaveLength(0);
  });

  it('should choose the right master', async () => {
    const channelConnectionCreator = new ChannelConnectionCreator();
    const channelConnectionsHandler = new ChannelConnectionsHandler();
    const channelConnectionFromOutsideBefore =
      channelConnectionCreator.getChannelConnection();
    await delay(1000);
    channelConnectionCreator.init();
    const channelConnectionFirst =
      channelConnectionCreator.getChannelConnection();
    channelConnectionsHandler.addOrUpdateConnection(channelConnectionFirst);
    channelConnectionCreator.init();
    const channelConnectionSecond =
      channelConnectionCreator.getChannelConnection();
    channelConnectionsHandler.addOrUpdateConnection(channelConnectionSecond);
    channelConnectionCreator.init();
    const channelConnectionFromOutsideAfter =
      channelConnectionCreator.getChannelConnection();
    expect(
      channelConnectionsHandler.isConnectionCanBeMaster(
        channelConnectionFromOutsideBefore
      )
    ).toBeTruthy();
    expect(
      channelConnectionsHandler.isConnectionCanBeMaster(
        channelConnectionFromOutsideAfter
      )
    ).toBeFalsy();
  });

  it('should remove zombie connections', async () => {
    const channelConnectionCreator = new ChannelConnectionCreator();
    const channelConnectionsHandler = new ChannelConnectionsHandler();
    channelConnectionsHandler.addOrUpdateConnection(
      channelConnectionCreator.getChannelConnection()
    );
    expect(channelConnectionsHandler.getConnections()).toHaveLength(1);
    await delay(4000);
    channelConnectionsHandler.removeZombiesConnections();
    expect(channelConnectionsHandler.getConnections()).toHaveLength(0);
  });

  it('should not remove zombie connections if there is updates', async () => {
    const channelConnectionCreator = new ChannelConnectionCreator();
    const channelConnectionsHandler = new ChannelConnectionsHandler();
    channelConnectionsHandler.addOrUpdateConnection(
      channelConnectionCreator.getChannelConnection()
    );
    expect(channelConnectionsHandler.getConnections()).toHaveLength(1);
    await delay(4000);
    channelConnectionCreator.update();
    channelConnectionsHandler.addOrUpdateConnection(
      channelConnectionCreator.getChannelConnection()
    );
    channelConnectionsHandler.removeZombiesConnections();
    expect(channelConnectionsHandler.getConnections()).toHaveLength(1);
  });
});
