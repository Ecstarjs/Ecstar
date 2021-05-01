import { event, context } from 'ecstar';

export default event(() => ({
  name: 'message',
  run({ client }, [message]) {
    if (!message.content.startsWith(client.options.prefix)) return;

    const ctx = context(client, message);

    const command = client.commands.get(ctx.name);

    if (command?.render) command.render(ctx);
  },
}));
