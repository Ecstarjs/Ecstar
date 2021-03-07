import {
  Client as DiscordClient,
  ClientEvents,
  ClientOptions as DiscordClientOptions,
  Message,
} from 'discord.js';
import { context } from 'ecstar';
import { Store } from 'ecstar/Store';
import { commandOptions } from 'ecstar/command';
import { eventOptions } from 'ecstar/event';

interface EcstarOptions extends DiscordClientOptions {
  prefix: string;
}

export class Client extends DiscordClient {
  readonly commands = new Store<commandOptions>('commands');
  readonly events = new Store<eventOptions>('events');
  readonly options!: EcstarOptions;
  constructor(options: EcstarOptions) {
    super(options);

    super.on('*', (name: keyof ClientEvents, ...args: unknown[]) => {
      const event = this.events.get(name);
      if (event?.run) event.run(args);

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
