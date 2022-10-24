![image](https://user-images.githubusercontent.com/38714187/72132993-bb2ab900-33c3-11ea-9ddc-c3dd7feba787.png)

<h1 align="center">Ecstar</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/ecstar">
    <img src="https://img.shields.io/npm/v/ecstar" alt="npm version" />
  </a>
  <a>
    <img src="https://img.shields.io/npm/dependency-version/ecstar/discord.js" alt="discord.js version">
  </a>
  <a href="https://gitpod.io/from-referrer/">
    <img
      src="https://img.shields.io/badge/Gitpod-ready--to--code-908a85?logo=gitpod"
      alt="Gitpod Ready-to-Code"
    />
  </a>
</p>

## 📃Introduction

Ecstar is the easiest framework for [Discord.js](https://github.com/discordjs/discord.js).

## 📖Document

[ecstar.js.org](https://ecstar.js.org/)

## 🎉Features

- [x] commands
- [x] events
- [ ] slash command
  - Only partially available

## 📥Installation

Install [Ecstar](https://www.npmjs.com/package/ecstar)

```
npm install ecstar

yarn add ecstar
```

## 💬Usage

_\*You can also use plain JavaScript, but TypeScript is recommended._

```ts
// src/index.ts
import { Client } from 'ecstar';

new Client({ prefix: '!' }).login(/* token */);
```

```ts
// src/commands/ping.ts
import { command } from 'ecstar';

export default command(() => ({
  name: 'ping', // Name of the command
  run({ message, send }) {
    /* We will implement as usual. */
    message.channel.send('pong!');
    /* There is a more convenient way. */
    send('pong!');
  },
}));
```

```ts
// src/events/ready.ts
import { event } from 'ecstar';

export default event(() => ({
  name: 'ready', // event name
  run({ client }) {
    client.log.ready(client.user?.tag);
  },
}));
```

Run it, and it's done!

![image](https://user-images.githubusercontent.com/38714187/197368797-9afd04b7-4b93-4048-b9e9-9a5e1b5b6a0d.png)

See more [examples](https://github.com/Ecstar-js/Ecstar/tree/main/examples) , [document](https://ecstar.js.org/)

## 🎫License

- [MIT](https://github.com/Ecstar-js/Ecstar/blob/main/LICENSE)

## 👀Author

- mouse_484
  - [Twitter](https://twitter.com/mouse_484)
  - [Discord](https://discord.gg/T4e5xbP)
