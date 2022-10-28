import { Client, commandOptions } from 'ecstar';
import { Message, Snowflake, TextChannel, User } from 'discord.js';

import { ContextBase } from 'ecstar/context/base';
import { Argument } from 'ecstar/utils/Argument';

export interface CommandContext extends ContextBase {
  name: string;
  type: 'command';
  message: Message;
  author: User;
  args: Argument;
  send(
    content: Parameters<TextChannel['send']>[0],
    channelID?: Snowflake
  ): Promise<Message>;
}

export const commandContext = (
  client: Client,
  message: Message,
  contents: string[],
  options: commandOptions
): CommandContext => {
  return {
    name: options.name,
    type: 'command',
    client,
    message,
    author: message.author,
    args: new Argument(client, contents),
    send(content, id) {
      const channel = id
        ? (client.channels.cache.get(id) as TextChannel)
        : message.channel;

      return channel.send(content);
    },
  };
};
