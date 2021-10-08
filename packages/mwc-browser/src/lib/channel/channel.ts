import {
  ChannelCommunication,
  SupportedChannelCommunicationFactory,
} from '../channel-communication';
import {
  ChannelConnection,
  ChannelConnectionCreator,
  ChannelConnectionsHandler,
} from '../channel-connection';
import { channelDefaultOptions } from './channel-default-options';
import { ChannelMessage, ChannelMessageType } from '../channel-message';
import { ChannelOptions } from './channel-options';
import { LIBRARY_NAME } from '../library-name';

export class Channel<T> {
  onManager: ((isManager: boolean) => void) | null;
  onMessage: ((message: T) => void) | null;

  private readonly name: string;
  private options: ChannelOptions;
  private intervalIds: number[];
  private connectionCreator: ChannelConnectionCreator;
  private connectionsHandler: ChannelConnectionsHandler;
  private communication: ChannelCommunication<
    ChannelMessage<T | ChannelConnection>
  >;

  constructor(name: string, options: Partial<ChannelOptions> = {}) {
    this.name = `${LIBRARY_NAME}_CHANNEL_NAME_${name}`;
    this.options = {
      ...channelDefaultOptions,
      ...options,
    };
    this.onManager = null;
    this.onMessage = null;
    this.intervalIds = [];
    this.connectionCreator = new ChannelConnectionCreator();
    this.connectionsHandler = new ChannelConnectionsHandler();
    this.communication = new SupportedChannelCommunicationFactory().create<
      ChannelMessage<T | ChannelConnection>
    >(this.name);
    this.setIntervals();
    this.listenToMessages();
  }

  get connections(): ChannelConnection[] {
    return this.connectionsHandler.getConnections();
  }

  get isManager(): boolean {
    return this.connectionCreator.getChannelConnection().isManager;
  }

  emitMessage(data: T): void {
    this.emit(ChannelMessageType.Message, data);
  }

  destroy(): void {
    this.connectionCreator.setIsManager(false);
    this.emitPing();
    this.clearIntervals();
    this.communication.close();
  }

  private setIntervals(): void {
    this.clearIntervals();
    this.intervalIds.push(
      setInterval(this.pingInterval(), this.options.pingTimer)
    );
    this.intervalIds.push(
      setInterval(this.managerInterval(), this.options.managerTimer)
    );
    this.intervalIds.push(
      setInterval(this.zombiesInterval(), this.options.zombiesTimer)
    );
  }

  private clearIntervals(): void {
    this.intervalIds.forEach((intervalId) => {
      clearInterval(intervalId);
    });
    this.intervalIds = [];
  }

  private managerInterval(): () => void {
    return (): void => {
      if (
        this.connectionsHandler.isConnectionCanBeManager(
          this.connectionCreator.getChannelConnection()
        )
      ) {
        this.emitManager();
      }
    };
  }

  private zombiesInterval(): () => void {
    return (): void => {
      this.connectionsHandler.removeZombiesConnections();
    };
  }

  private pingInterval(): () => void {
    return (): void => {
      this.emitPing();
    };
  }

  private listenToMessages(): void {
    this.communication.onMessage((message) => {
      if (message.channelName !== this.name) {
        return;
      }
      if (message.libraryName !== LIBRARY_NAME) {
        return;
      }
      switch (message.type) {
        case ChannelMessageType.Ping:
          this.connectionsHandler.addOrUpdateConnection(
            message.data as ChannelConnection
          );
          break;
        case ChannelMessageType.Manager:
          this.connectionCreator.setIsManager(false);
          if (this.onManager) {
            this.onManager(false);
          }
          break;
        case ChannelMessageType.Message:
          if (this.onMessage) {
            this.onMessage(message.data as T);
          }
          break;
      }
    });
  }

  private emitPing(): void {
    this.connectionCreator.update();
    this.emit(
      ChannelMessageType.Ping,
      this.connectionCreator.getChannelConnection()
    );
  }

  private emitManager(): void {
    this.connectionCreator.setIsManager(true);
    this.emitPing();
    this.emit(
      ChannelMessageType.Manager,
      this.connectionCreator.getChannelConnection()
    );
    if (this.onManager) {
      this.onManager(true);
    }
  }

  private emit(type: ChannelMessageType, data: T | ChannelConnection): void {
    const message: ChannelMessage<T | ChannelConnection> = {
      libraryName: LIBRARY_NAME,
      channelName: this.name,
      type,
      data,
    };
    this.communication.postMessage(message);
  }
}
