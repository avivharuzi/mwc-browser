# mwc-browser

![npm](https://img.shields.io/npm/v/mwc-browser)
![GitHub](https://img.shields.io/github/license/avivharuzi/mwc-browser)

Manager-Workers communication between browser tabs.

## Features

✅ No dependencies

✅ Browser support

✅ Manager-Workers communication

✅ Can be used also for just messaging between tabs

## Installation

```sh
npm i mwc-browser
```

## Usage

Create channel connection with `mwcBrowser`.

```ts
import { mwcBrowser } from 'mwc-browser';

const channel = mwcBrowser<string>('my-channel-name');
```

Create channel connection with `Channel` constructor.

```ts
import { Channel } from 'mwc-browser';

const channel = new Channel<string>('my-channel-name');
```

You can pass optional `options`.

```ts
import { mwcBrowser } from 'mwc-browser';

const channel = mwcBrowser<string>('my-channel-name', {
  pingTimer: 500, // The time to make ping.
  zombiesTimer: 500, // The time to search for zombie connection.
  managerTimer: 1000, // The time to look for manager if possible.
  isEmitMessageToSelf: false, // If you want to get the message you sent to your self from onMessage event.
});
```

Channel `properties`.

```ts
import { mwcBrowser } from 'mwc-browser';

const channel = mwcBrowser<string>('my-channel-name');

channel.id; // Channel UUID.
channel.isManager; // If Channel is Manager.
channel.numberOfConnections; // The number of current connections that connected to the same channel.
```

Send message to other connections or to your self.

```ts
import { mwcBrowser } from 'mwc-browser';

const channel = mwcBrowser<string>('my-channel-name');

channel.emitMessage('hi all :)');
```

Listen to `events`.

```ts
import { mwcBrowser } from 'mwc-browser';

const channel = mwcBrowser<string>('my-channel-name');

channel.onManager = (isManager: boolean): void => {
  // Do something by if you are manager or not...
};

channel.onMessage = (message: string): void => {
  // Do something with the message...
};
```

Destroy the channel connection if you don't need it anymore.

```ts
import { mwcBrowser } from 'mwc-browser';

const channel = mwcBrowser<string>('my-channel-name');

// ...

channel.destroy(); // Destroy channel, will cancel intervals, event listeners, etc.
```

## License

[MIT](LICENSE)
