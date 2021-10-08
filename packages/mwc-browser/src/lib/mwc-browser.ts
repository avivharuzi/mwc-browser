import { Channel, ChannelOptions } from './channel';

export const mwcBrowser = <T>(
  channelName: string,
  channelOptions: Partial<ChannelOptions> = {}
): Channel<T> => {
  return new Channel<T>(channelName, channelOptions);
};
