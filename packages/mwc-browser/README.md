# mwc-browser

![CI Development](https://img.shields.io/github/workflow/status/avivharuzi/mwc-browser/CI%20Development/main)
![npm](https://img.shields.io/npm/v/mwc-browser)
![Bundle Size](https://img.shields.io/bundlephobia/min/mwc-browser)
![GitHub](https://img.shields.io/github/license/avivharuzi/mwc-browser)

Manager-Workers communication between browser tabs.

## Features

✅ No dependencies

✅ Browser support

✅ Manager-Workers communication

✅ Can be used also for just messaging between tabs

## Demo

[Demo page](https://avivharuzi.github.io/mwc-browser)

## Installation

```sh
npm i mwc-browser
```

## Usage

Create channel connection with `mwcBrowser`.

```ts
import { mwcBrowser } from 'mwc-browser';

const channelConnection = mwcBrowser<string>('my-channel-name');
```

Create channel connection with `Channel` constructor.

```ts
import { Channel } from 'mwc-browser';

const channelConnection = new Channel<string>('my-channel-name');
```

You can also pass optional `options`.

```ts
import { mwcBrowser } from 'mwc-browser';

const channelConnection = mwcBrowser<string>('my-channel-name', {
  pingTimer: 500, // The time to make ping.
  zombiesTimer: 500, // The time to search for zombie connection.
  managerTimer: 1000, // The time to look for manager if possible.
  maxLife: 3000, // The max life time to decide if channel connection is zombie if not responded.
  isEmitMessageToSelf: false, // If you want to get the message you sent to your self from onMessage event.
});
```

Channel connection `properties`.

```ts
import { mwcBrowser } from 'mwc-browser';

const channelConnection = mwcBrowser<string>('my-channel-name');

channelConnection.id; // Channel UUID.
channelConnection.isManager; // If Channel is Manager.
channelConnection.numberOfConnections; // The number of current connections that connected to the same channel.
```

Send message to other channel connections or to your self.

```ts
import { mwcBrowser } from 'mwc-browser';

const channelConnection = mwcBrowser<string>('my-channel-name');

channelConnection.emitMessage('hi all :)');
```

Listen to channel connection `events`.

```ts
import { mwcBrowser } from 'mwc-browser';

const channelConnection = mwcBrowser<string>('my-channel-name');

channelConnection.onManager = (isManager: boolean): void => {
  // Do something by if you are manager or not...
};

channelConnection.onMessage = (message: string): void => {
  // Do something with the message...
};
```

Remove the channel connection if you don't need it anymore.

```ts
import { mwcBrowser } from 'mwc-browser';

const channelConnection = mwcBrowser<string>('my-channel-name');

// ...

channelConnection.destroy(); // Will cancel intervals, event listeners, etc.
```

## License

[MIT](LICENSE)
