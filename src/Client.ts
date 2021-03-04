import {
  Client as DiscordClient,
  ClientOptions as DiscordClientOptions,
  Message,
} from 'discord.js';
import { context } from 'ecstar';
import { Store } from 'ecstar/Store';
import { commandOptions } from 'ecstar/command';

interface EcstarOptions extends DiscordClientOptions {
  prefix: string;
}

export class Client extends DiscordClient {
  readonly commands = new Store<commandOptions>('commands');
  readonly options!: EcstarOptions;
  constructor(options: EcstarOptions) {
    super(options);

    super.once('ready', () => {
      console.log('ready');
    });
    super.on('message', (message: Message) => {
      if (!message.content.startsWith(options.prefix)) return;

      const ctx = context(this, message);

      const command = this.commands.get(ctx.name);

      if (command?.render) command.render(ctx);
    });
  }
}
