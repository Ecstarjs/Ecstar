import { Client, commandOptions } from 'ecstar';
import { Message, Snowflake, TextChannel, User } from 'discord.js';

import { ContextBase } from 'ecstar/context/base';
import { parser } from 'ecstar/utils/argumentParser';

export interface CommandContext extends ContextBase {
  name: string;
  type: 'command';
  message: Message;
  author: User;
  args: string[];
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
  const args = parser(client, contents, options);

  return {
    name: options.name,
    type: 'command',
    client,
    message,
    author: message.author,
    args,
    send(content, id) {
      const channel = id
        ? (client.channels.cache.get(id) as TextChannel)
        : message.channel;

      return channel.send(content);
    },
  };
};
