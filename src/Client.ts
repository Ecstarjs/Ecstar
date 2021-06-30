import {
  Client as DiscordClient,
  ClientOptions as DiscordClientOptions,
} from 'discord.js';
import { plugin } from 'ecstar/plugin';
import { plugins } from 'ecstar/plugins';
import { Store } from 'ecstar/Store';

export type EcstarClientOptions = DiscordClientOptions & {
  prefix: string;
};

export class Client extends DiscordClient {
  static plugins: plugin[] = [];

  readonly commands = new Store('command');
  readonly events = new Store('event');
  readonly options!: EcstarClientOptions;
  constructor(options: EcstarClientOptions) {
    super(options);

    [...plugins, ...Client.plugins].forEach((plugin) => {
      plugin.run(this);
    });
  }
  emit(name: string, ...args: unknown[]): boolean {
    return super.emit('*', name, ...args);
  }
}
