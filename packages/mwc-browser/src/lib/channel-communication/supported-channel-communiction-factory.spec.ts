import { SupportedChannelCommunicationFactory } from './supported-channel-communiction-factory';

describe('SupportedChannelCommunicationFactory', () => {
  it('should be create class with ChannelCommunication interface', () => {
    const factory = new SupportedChannelCommunicationFactory();
    const channelCommunication = factory.create<string>('My Channel :P');
    expect(channelCommunication.channelName).toBeDefined();
    expect(channelCommunication.postMessage).toBeDefined();
    expect(channelCommunication.onMessage).toBeDefined();
    expect(channelCommunication.close).toBeDefined();
  });
});
