import {
  Client as DiscordClient,
  ClientOptions as DiscordClientOptions,
  Message,
} from 'discord.js';

interface EcstarOptions extends DiscordClientOptions {
  prefix: string;
}

export class Client extends DiscordClient {
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

      if (commandName === 'ping') {
        const command = (await import('../examples/commands/ping')).default;
        if (command) {
          if (command?.render) {
            command.render({ message, args });
          }
        }
      }
    });
  }
}
