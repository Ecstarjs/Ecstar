import { event } from 'ecstar';
import { Events } from 'discord.js';
import { getCommandName } from 'ecstar/utils/getCommandName';
import { commandContext } from 'ecstar/context/command';

export default event(() => ({
  name: Events.MessageCreate,
  run({ client }, [message]) {
    if (message.author.bot) return;
    if (
      !message.content.startsWith(client.options.prefix) &&
      !message.content.startsWith(`<@!${client.user?.id}>`)
    )
      return;

    const name = getCommandName(client, message.content);

    const command = client.commands.get(name);

    const ctx = commandContext(client, message);

    if (command?.guildOnly && !message.guild) {
      return message.channel.send('Can only be used with guild');
    }

    if (command?.permissions) {
      if (
        command.permissions.bot &&
        !message.guild?.members.me?.permissions.has(command.permissions.bot)
      ) {
        return message.channel.send('Bot does not have permissions.');
      } else if (
        command.permissions.user &&
        !message.member?.permissions.has(command.permissions.user)
      ) {
        return message.channel.send('User does not have permissions.');
      }
    }

    if (command?.render) command.render(ctx); // remove v6 majer
    else if (command?.run) command.run(ctx);
  },
}));
