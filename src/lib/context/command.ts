import { Client } from 'ecstar';
import {
  APIMessage,
  Message,
  Snowflake,
  StringResolvable,
  TextChannel,
} from 'discord.js';

import { ContextBase } from 'ecstar/context';
import { parser } from 'ecstar/parser';
import { getArgs, argsType, TypeList } from 'ecstar/getArgs';

export interface CommandContext extends ContextBase {
  type: 'command';
  message: Message;
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
  const { commandName, args } = parser(client, message.cleanContent);

  return {
    name: commandName,
    type: 'command',
    client,
    message,
    getArgs: getArgs(args),
    send(content, id) {
      const channel = id
        ? (client.channels.cache.get(id) as TextChannel)
        : message.channel;

      return channel.send(content);
    },
  };
};