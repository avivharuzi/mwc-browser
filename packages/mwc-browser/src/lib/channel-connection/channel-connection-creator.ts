import { ChannelConnection } from './channel-connection';
import { uuid } from '../utils';

export class ChannelConnectionCreator {
  private id: string;
  private isMaster: boolean;
  private updatedAt: Date;
  private createdAt: Date;

  constructor() {
    this.init();
  }

  init(): void {
    this.id = uuid();
    this.isMaster = false;
    this.updatedAt = new Date();
    this.createdAt = new Date();
  }

  getChannelConnection(): ChannelConnection {
    const channelConnection = {
      id: this.id,
      isMaster: this.isMaster,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };
    return {
      ...channelConnection,
    };
  }

  update(): void {
    this.updatedAt = new Date();
  }

  setIsMaster(isMaster: boolean): void {
    this.isMaster = isMaster;
  }
}
