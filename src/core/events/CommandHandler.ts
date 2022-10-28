import { Client, event } from 'ecstar';
import { Events } from 'discord.js';
import { commandContext } from 'ecstar/context/command';

export const divideCommandNameContents = (client: Client, content: string) => {
  const mention = `<@!${client.user?.id}>`;
  const prefix = client.options.prefix;
  if (content.startsWith(mention)) {
    return content.slice(mention.length).split(' ');
  } else if (content.startsWith(prefix)) {
    return content.slice(prefix.length).split(' ');
  }
  return content;
};

export default event(() => ({
  name: Events.MessageCreate,
  run({ client }, [message]) {
    if (message.author.bot) return;
    if (
      !message.content.startsWith(client.options.prefix) &&
      !message.content.startsWith(`<@!${client.user?.id}>`)
    )
      return;

    const [name, ...contents] = divideCommandNameContents(
      client,
      message.content
    );

    const command = client.commands.get(name);

    if (!command) return; // command is not found

    const ctx = commandContext(client, message, contents, command);

    if (command.guildOnly && !message.guild) {
      return message.channel.send('Can only be used with guild');
    }

    if (command.permissions) {
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

    if (command.render) command.render(ctx); // remove v6 majer
    else if (command.run) command.run(ctx);
  },
}));
