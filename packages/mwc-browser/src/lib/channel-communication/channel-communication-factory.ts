import { ChannelCommunication } from './channel-communication';

export abstract class ChannelCommunicationFactory {
  abstract create<T>(channelName: string): ChannelCommunication<T>;
}
