export interface ChannelCommunication<T> {
  channelName: string;
  onMessage(cb: (data: T) => void): void;
  postMessage(message: T): void;
  close(): void;
}
