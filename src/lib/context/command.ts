import { Client } from 'ecstar';
import { APIMessage, Message, StringResolvable } from 'discord.js';

import { ContextBase } from 'ecstar/context';
import { parser } from 'ecstar/parser';
import { getArgs, argsType, TypeList } from 'ecstar/getArgs';

export interface CommandContext extends ContextBase {
  type: 'command';
  message: Message;
  getArgs<T extends (keyof TypeList)[]>(types: T): argsType<T>;
  send(content: StringResolvable | APIMessage): Promise<Message>;
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
    send(content) {
      return message.channel.send(content);
    },
  };
};
