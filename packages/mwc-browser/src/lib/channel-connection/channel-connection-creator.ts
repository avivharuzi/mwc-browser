import { ChannelConnection } from './channel-connection';
import { uuid } from '../utils';

export class ChannelConnectionCreator {
  private id!: string;
  private isManager!: boolean;
  private updatedAt!: Date;
  private createdAt!: Date;

  constructor() {
    this.init();
  }

  init(): void {
    this.id = uuid();
    this.isManager = false;
    this.updatedAt = new Date();
    this.createdAt = new Date();
  }

  getChannelConnection(): ChannelConnection {
    const channelConnection = {
      id: this.id,
      isManager: this.isManager,
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

  setIsManager(isManager: boolean): void {
    this.isManager = isManager;
  }
}
