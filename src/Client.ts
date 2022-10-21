import {
  Client as DiscordClient,
  ClientOptions as DiscordClientOptions,
  GatewayIntentBits,
  IntentsBitField,
} from 'discord.js';
import { plugin } from 'ecstar/plugin';
import { plugins } from 'ecstar/plugins';
import { Store } from 'ecstar/Store';

export type ExtendedOption = {
  prefix: string;
};

export type DiscordAndEcstarClientOptions = DiscordClientOptions &
  ExtendedOption;

export type EcstarClientOptions = Omit<DiscordClientOptions, 'intents'> & {
  intents?: DiscordClientOptions['intents'];
} & ExtendedOption;

export class Client extends DiscordClient {
  static plugins: plugin[] = [];

  readonly commands = new Store('command');
  readonly events = new Store('event');
  readonly options!: Omit<DiscordAndEcstarClientOptions, 'intents'> & {
    intents: IntentsBitField;
  };
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
