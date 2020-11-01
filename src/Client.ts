import {
  Client as DiscordClient,
  ClientOptions as DiscordClientOptions,
  Message,
} from 'discord.js';
import { Store } from './lib/Store';
import { commandOptions } from './command';

interface EcstarOptions extends DiscordClientOptions {
  prefix: string;
}

export class Client extends DiscordClient {
  readonly commands = new Store<commandOptions>('commands');
  constructor(options: EcstarOptions) {
    super(options);

    super.once('ready', () => {
      console.log('ready');
    });
    super.on('message', async (message: Message) => {
      if (!message.content.startsWith(options.prefix)) return;

      const [commandName, ...args] = message.content
        .slice(options.prefix.length)
        .split(' ');

      const command = this.commands.get(commandName);

      if (!command) return;

      if (command?.render) command.render({ message, args });
    });
  }
}
