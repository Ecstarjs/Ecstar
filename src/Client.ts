import {
  Client as DiscordClient,
  ClientOptions as DiscordClientOptions,
  GatewayIntentBits,
  IntentsBitField,
} from 'discord.js';
import { plugin } from 'ecstar/plugin';
import { plugins } from 'ecstar/plugins';
import { Store } from 'ecstar/Store';
import { Store as nextStore } from 'ecstar/store';

export type ExtendedOption = {
  prefix: string;
};
export type EcstarClientOptions = Omit<DiscordClientOptions, 'intents'> & {
  intents?: IntentsBitField;
} & ExtendedOption;

export class Client extends DiscordClient {
  static plugins: plugin[] = [];

  readonly commands = new nextStore<'command'>('commands');
  readonly events = new Store('event');
  readonly options!: Omit<EcstarClientOptions, 'intents'> & {
    intents: IntentsBitField;
  }; // Intents is required in Discrod.js
  constructor(options: EcstarClientOptions) {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      ...options,
    });

    [...plugins, ...Client.plugins].forEach((plugin) => {
      plugin.run(this);
    });
  }
  emit(name: string, ...args: unknown[]): boolean {
    return super.emit('*', name, ...args);
  }
}
