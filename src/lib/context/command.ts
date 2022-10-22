import { Client } from 'ecstar';
import { Message, Snowflake, TextChannel, User } from 'discord.js';

import { ContextBase } from 'ecstar/context';
import { parser, parsed } from 'ecstar/utils/parser';
import { getArgs, argsType, TypeList } from 'ecstar/utils/getArgs';

export interface CommandContext extends ContextBase {
  type: 'command';
  message: Message;
  author: User;
  /** @deprecated Use 'args' directly instead */
  getArgs<T extends { [key: string]: keyof TypeList }>(types: T): argsType<T>;
  args: parsed['args'];
  send(
    content: Parameters<TextChannel['send']>[0],
    channelID?: Snowflake
  ): Promise<Message>;
}

export const commandContext = (
  client: Client,
  message: Message
): CommandContext => {
  const { commandName, args } = parser(client, message.content);

  return {
    name: commandName,
    type: 'command',
    client,
    message,
    author: message.author,
    getArgs: getArgs(args),
    args,
    send(content, id) {
      const channel = id
        ? (client.channels.cache.get(id) as TextChannel)
        : message.channel;

      return channel.send(content);
    },
  };
};
