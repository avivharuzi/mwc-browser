import { ChannelCommunication } from './channel-communication';

export class LocalstorageChannelCommunication<T>
  implements ChannelCommunication<T>
{
  channelName: string;
  eventHandlers: ((event: StorageEvent) => void)[];

  constructor(channelName: string) {
    this.channelName = channelName;
    this.eventHandlers = [];
  }

  onMessage(cb: (data: T) => void): void {
    const handler = (event: StorageEvent) => {
      if (event.storageArea !== localStorage) {
        return;
      }
      if (event.key === this.channelName && event.newValue !== null) {
        cb(JSON.parse(event.newValue));
      }
    };
    this.eventHandlers.push(handler);
    window.addEventListener('storage', handler);
  }

  postMessage(message: T): void {
    window.localStorage.setItem(this.channelName, JSON.stringify(message));
  }

  close(): void {
    this.eventHandlers.forEach((eventHandler) => {
      window.removeEventListener('storage', eventHandler);
    });
    this.eventHandlers = [];
  }
}
