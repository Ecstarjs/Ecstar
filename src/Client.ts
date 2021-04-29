import {
  Client as DiscordClient,
  ClientEvents,
  ClientOptions as DiscordClientOptions,
  Message,
} from 'discord.js';
import { context } from 'ecstar';
import { Store } from 'ecstar/Store';

interface EcstarOptions extends DiscordClientOptions {
  prefix: string;
}

export class Client extends DiscordClient {
  readonly commands = new Store('command');
  readonly events = new Store('event');
  readonly options!: EcstarOptions;
  constructor(options: EcstarOptions) {
    super(options);

    super.on('*', (name: keyof ClientEvents, ...args: unknown[]) => {
      const event = this.events.get(name);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ctx = context(this, name);

      if (event?.run) event.run(ctx, args);

      if (name === 'message') {
        const [message] = args as Message[];
        if (!message.content.startsWith(options.prefix)) return;

        const ctx = context(this, message);

        const command = this.commands.get(ctx.name);

        if (command?.render) command.render(ctx);
      }
    });
  }
  emit(name: string, ...args: unknown[]): boolean {
    return super.emit('*', name, ...args);
  }
}
