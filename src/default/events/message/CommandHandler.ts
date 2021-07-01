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

    if (command?.guildOnly && !message.guild) {
      return message.channel.send('Can only be used with guild');
    }

    if (command?.permissions) {
      if (
        command.permissions.bot &&
        !message.guild?.me?.hasPermission(command.permissions.bot)
      ) {
        return message.channel.send('Bot does not have permissions.');
      } else if (
        command.permissions.user &&
        !message.member?.hasPermission(command.permissions.user)
      ) {
        return message.channel.send('User does not have permissions.');
      }
    }

    if (command?.render) command.render(ctx);
    else if (command?.run) command.run(ctx);
  },
}));
