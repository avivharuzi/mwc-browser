import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';

import { Channel, mwcBrowser } from 'mwc-browser';

@Component({
  selector: 'mwc-browser-demo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnDestroy {
  isManager: boolean;
  messages: string[];
  channel: Channel<string>;
  channelId: string;

  constructor(private cd: ChangeDetectorRef) {
    this.isManager = false;
    this.messages = [];
    this.channel = mwcBrowser('my-channel', { isEmitMessageToSelf: true });
    this.channelId = this.channel.id;
    this.channel.onManager = (isManager) => {
      this.isManager = isManager;
      this.cd.detectChanges();
    };
    this.channel.onMessage = (message) => {
      this.messages.push(message);
      this.cd.detectChanges();
    };
  }

  sendMessage(message: string): boolean {
    if (!message) {
      return false;
    }
    this.channel.emitMessage(message);
    return true;
  }

  ngOnDestroy(): void {
    this.channel.destroy();
  }
}
