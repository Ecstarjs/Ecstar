import { Client } from 'ecstar';
import {
  APIMessage,
  Message,
  Snowflake,
  StringResolvable,
  TextChannel,
  User,
} from 'discord.js';

import { ContextBase } from 'ecstar/context';
import { parser } from 'ecstar/parser';
import { getArgs, argsType, TypeList } from 'ecstar/getArgs';

export interface CommandContext extends ContextBase {
  type: 'command';
  message: Message;
  author: User;
  getArgs<T extends { [key: string]: keyof TypeList }>(types: T): argsType<T>;
  send(
    content: StringResolvable | APIMessage,
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
    send(content, id) {
      const channel = id
        ? (client.channels.cache.get(id) as TextChannel)
        : message.channel;

      return channel.send(content);
    },
  };
};
