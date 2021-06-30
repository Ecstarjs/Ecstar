![image](https://user-images.githubusercontent.com/38714187/72132993-bb2ab900-33c3-11ea-9ddc-c3dd7feba787.png)

<h1 align="center">Ecstar</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/ecstar">
    <img src="https://img.shields.io/npm/v/ecstar" alt="npm version" />
  </a>
  <a href="https://github.com/Ecstarjs/Ecstar/stargazers">
    <img
      src="https://img.shields.io/github/stars/mouse484/Ecstar"
      alt="github starts"
    />
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

Ecstar is the easiest framework [Discord.js](https://github.com/discordjs/discord.js).

## 📖Document

[ecstar.js.org](https://ecstar.js.org/)

## 📥Installation

Install [Ecstar](https://www.npmjs.com/package/ecstar) using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).

```
npm install ecstar
or
yarn add ecstar
```

## 💬Usage

_\*You can also use plain JavaScript, but TypeScript is recommended._

```js
// src/index.ts
import { Client } from 'ecstar';

new Client({ prefix: '!' }).login(/* token */);

// src/commands/ping.ts
import { command } from 'ecstar';

export default command(() => ({
  name: 'ping', // Name of the command
  render({ message, send }) {
    /* We will implement as usual. */
    message.channel.send('pong!');
    /* There is a more convenient way. */
    send('pong!');
  },
}));
```
Run it, and it's done!

![image](https://user-images.githubusercontent.com/38714187/123935293-0d540580-d9cf-11eb-8236-c6b8a8ae09df.png)


See more [examples](https://github.com/Ecstar-js/Ecstar/tree/main/examples) , [document](https://ecstar.js.org/)

## 🎫License

- [MIT](https://github.com/Ecstar-js/Ecstar/blob/main/LICENSE)

## 👀Author

- [Twitter](https://twitter.com/mouse_484)
- [Discord](https://discord.gg/T4e5xbP)
