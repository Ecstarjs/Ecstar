import { Message, ClientEvents } from 'discord.js';
import { context } from 'ecstar';
import { plugin } from 'ecstar/plugin';

export default {
  name: 'EventHandler',
  run: (client) => {
    client.on('*', (name: keyof ClientEvents, ...args: unknown[]) => {
      const event = client.events.get(name);

      const ctx = context(client, name);

      if (event?.run) {
        event.run(ctx, args);
        client.log.info('EventHandler:', ctx.name);
      }

      if (name === 'message') {
        const [message] = args as Message[];
        if (!message.content.startsWith(client.options.prefix)) return;

        const ctx = context(client, message);

        const command = client.commands.get(ctx.name);

        if (command?.render) command.render(ctx);
      }
    });
  },
} as plugin;
