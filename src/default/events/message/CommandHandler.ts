import { context, event } from 'ecstar';

export default event(() => ({
  name: 'message',
  run({ client }, [message]) {
    if (message.author.bot) return;

    if (
      !message.content.startsWith(client.options.prefix) &&
      !message.content.startsWith(`<@!${client.user?.id}>`)
    )
      return;

    const ctx = context(client, message);

    const command = client.commands.get(ctx.name);

    if (command?.render) command.render(ctx);
  },
}));
