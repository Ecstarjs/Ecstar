import {
  Client as DiscordClient,
  ClientOptions as DiscordClientOptions,
} from 'discord.js';
import { Store } from 'ecstar/Store';
import { plugin } from 'ecstar/plugin';
import { plugins } from 'ecstar/plugins';

interface EcstarOptions extends DiscordClientOptions {
  prefix: string;
}

class Client extends DiscordClient {
  static plugins: plugin[] = [];

  readonly commands = new Store('command');
  readonly events = new Store('event');
  readonly options!: EcstarOptions;
  constructor(options: EcstarOptions) {
    super(options);

    [...plugins, ...Client.plugins].forEach((plugin) => {
      plugin.run(this);
    });
  }
  emit(name: string, ...args: unknown[]): boolean {
    return super.emit('*', name, ...args);
  }
}

export { Client };
