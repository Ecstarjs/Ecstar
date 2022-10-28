import consola from 'consola';
import {
  Client as DiscordClient,
  ClientOptions as DiscordClientOptions,
  GatewayIntentBits,
  IntentsBitField,
} from 'discord.js';
import { eventContext } from 'ecstar/context/event';
import { ArgumentStore } from 'ecstar/store/ArgumentStore';
import { CommandStore } from 'ecstar/store/CommandStore';
import { EventStore } from 'ecstar/store/EventStore';

export type ExtendedOption = {
  prefix: string;
};
export type EcstarClientOptions = Omit<DiscordClientOptions, 'intents'> & {
  intents?: IntentsBitField;
} & ExtendedOption;

export class Client extends DiscordClient {
  readonly commands = new CommandStore();
  readonly events = new EventStore();
  readonly arguments = new ArgumentStore();
  readonly options!: Omit<EcstarClientOptions, 'intents'> & {
    intents: IntentsBitField;
  }; // Intents is required in Discrod.js
  static log = consola;
  log = consola;
  constructor(options: EcstarClientOptions) {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      ...options,
    });
  }
  emit(name: string, ...args: unknown[]): boolean {
    const events = this.events.get(name);
    if (events) {
      const ctx = eventContext(this, name);

      events.forEach((event) => {
        event.run(ctx, args);
      });
    }
    return true;
  }
}
