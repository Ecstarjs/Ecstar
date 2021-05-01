import { ClientEvents } from 'discord.js';
import { context } from 'ecstar';
import { plugin } from 'ecstar/plugin';

export const eventHandler = {
  name: 'eventHandler',
  run: (client) => {
    client.on('*', (name: keyof ClientEvents, ...args: unknown[]) => {
      const events = client.events.get(name);

      const ctx = context(client, name);

      if (events) {
        events.forEach((event) => event.run(ctx, args));
      }
    });
  },
} as plugin;
