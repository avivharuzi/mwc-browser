import { ChannelMessageType } from './channel-message-type';

export interface ChannelMessage<T> {
  libraryName: string;
  channelName: string;
  type: ChannelMessageType;
  data: T;
}
