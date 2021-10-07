import { ChannelCommunication } from './channel-communication';

export class BroadcastChannelCommunication<T>
  implements ChannelCommunication<T>
{
  channelName: string;
  broadcastChannel: BroadcastChannel;

  constructor(channelName: string) {
    this.channelName = channelName;
    this.broadcastChannel = new BroadcastChannel(this.channelName);
  }

  onMessage(cb: (data: T) => void): void {
    this.broadcastChannel.onmessage = (event: MessageEvent) => {
      cb(event.data);
    };
  }

  postMessage(message: T): void {
    this.broadcastChannel.postMessage(message);
  }

  close(): void {
    this.broadcastChannel.onmessage = null;
    this.broadcastChannel.close();
  }
}
