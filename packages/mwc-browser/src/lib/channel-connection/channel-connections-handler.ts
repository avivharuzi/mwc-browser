import { ChannelConnection } from './channel-connection';
import { channelConnectionDefaultOptions } from './channel-connection-default-options';
import { ChannelConnectionOptions } from './channel-connection-options';

export class ChannelConnectionsHandler {
  private connections: ChannelConnection[];
  private options: ChannelConnectionOptions;

  constructor(options: Partial<ChannelConnectionOptions> = {}) {
    this.reset();
    this.options = {
      ...channelConnectionDefaultOptions,
      ...options,
    };
  }

  reset(): void {
    this.connections = [];
  }

  getConnections(): ChannelConnection[] {
    return [...this.connections];
  }

  addOrUpdateConnection(channelConnection: ChannelConnection): void {
    const connections = this.getConnections();
    const isConnectionAlreadyExists = connections.find(
      (connection) => connection.id === channelConnection.id
    );
    if (isConnectionAlreadyExists) {
      this.updateConnection(channelConnection);
      return;
    }
    this.addConnection(channelConnection);
  }

  isConnectionCanBeManager(channelConnection: ChannelConnection): boolean {
    if (this.isSomeoneManager() || channelConnection.isManager) {
      return false;
    }
    const allConnectionsSorted = [
      ...this.getConnections(),
      channelConnection,
    ].sort((first, second) => {
      return (
        new Date(first.createdAt).getTime() -
        new Date(second.createdAt).getTime()
      );
    });
    const selectedConnection = allConnectionsSorted[0];
    return selectedConnection.id === channelConnection.id;
  }

  removeZombiesConnections(): void {
    this.getZombiesConnections().forEach((zombieConnection) =>
      this.removeConnection(zombieConnection)
    );
  }

  private addConnection(channelConnection: ChannelConnection): void {
    this.connections = [...this.getConnections(), channelConnection];
  }

  private updateConnection(channelConnection: ChannelConnection): void {
    this.connections = this.getConnections().map((connection) => {
      if (connection.id === channelConnection.id) {
        return { ...channelConnection };
      }
      return { ...connection };
    });
  }

  private isSomeoneManager(): boolean {
    return (
      this.getConnections().filter((connection) => connection.isManager)
        .length > 0
    );
  }

  private getZombiesConnections(): ChannelConnection[] {
    return this.getConnections().filter((connection) => {
      const diff = Date.now() - new Date(connection.updatedAt).getTime();
      return diff > this.options.maxLife;
    });
  }

  private removeConnection(channelConnection: ChannelConnection): void {
    this.connections = this.getConnections().filter(
      (connection) => connection.id !== channelConnection.id
    );
  }
}
