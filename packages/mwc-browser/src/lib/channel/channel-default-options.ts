import { ChannelOptions } from './channel-options';

export const channelDefaultOptions: ChannelOptions = {
  pingTimer: 500,
  zombiesTimer: 500,
  managerTimer: 1000,
  maxZombieLife: 3000,
  isEmitMessageToSelf: false,
};
