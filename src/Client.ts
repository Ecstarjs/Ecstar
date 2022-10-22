import {
  Client as DiscordClient,
  ClientOptions as DiscordClientOptions,
  GatewayIntentBits,
  IntentsBitField,
} from 'discord.js';
import { plugin } from 'ecstar/plugin';
import { plugins } from 'ecstar/plugins';
import { CommandStore } from 'ecstar/store/CommandStore';
import { EventStore } from 'ecstar/store/EventStore';

export type ExtendedOption = {
  prefix: string;
};
export type EcstarClientOptions = Omit<DiscordClientOptions, 'intents'> & {
  intents?: IntentsBitField;
} & ExtendedOption;

export class Client extends DiscordClient {
  static plugins: plugin[] = [];

  readonly commands = new CommandStore();
  readonly events = new EventStore();
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
