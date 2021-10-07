import { BroadcastChannelCommunication } from './broadcast-channel-communication';
import { ChannelCommunication } from './channel-communication';
import { ChannelCommunicationFactory } from './channel-communication-factory';
import { LocalstorageChannelCommunication } from './localstorage-channel-communication';

export class SupportedChannelCommunicationFactory extends ChannelCommunicationFactory {
  create<T>(channelName: string): ChannelCommunication<T> {
    if ('BroadcastChannel' in window) {
      return new BroadcastChannelCommunication(channelName);
    }
    return new LocalstorageChannelCommunication(channelName);
  }
}
