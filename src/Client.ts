import {
  Client as DiscordClient,
  //   ClientOptions as DiscordClientOptions,
} from 'discord.js';

// interface EcstarOptions extends DiscordClientOptions {
//   prefix: string;
// }

export class Client extends DiscordClient {
  constructor() {
    super();

    super.once('ready', () => {
      console.log('ready');
    });
  }
}
