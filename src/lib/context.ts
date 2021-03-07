import { Client } from 'ecstar';
import { APIMessage, Message, StringResolvable } from 'discord.js';
import { parser } from 'ecstar/parser';

export type ContextType = 'command' | 'event' | 'unknown';
export type Context<T extends ContextType> = T extends 'command'
  ? CommandContext
  : T extends 'event'
  ? EventContext
  : never;

export interface ContextBase {
  name: string;
  type: ContextType;
  client: Client;
}

export interface CommandContext extends ContextBase {
  type: 'command';
  message: Message;
  args: string[];
  send(content: StringResolvable | APIMessage): Promise<Message>;
}

export interface EventContext extends ContextBase {
  type: 'event';
  callback: unknown[];
}

export type contextFunc = {
  (client: Client, message: Message): CommandContext;
  (client: Client, name: string, callback: unknown[]): EventContext;
};

export const context: contextFunc = (
  client: Client,
  arg1: Message | string,
  arg2?: unknown[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  if (arg1 instanceof Message) {
    const message = arg1;
    const { commandName, args } = parser(client, message.cleanContent);

    const ctx: CommandContext = {
      name: commandName,
      type: 'command',
      client,
      message,
      args,
      send(content) {
        return message.channel.send(content);
      },
    };
    return ctx;
  } else {
    const ctx: EventContext = {
      name: arg1,
      type: 'event',
      client,
      callback: arg2 || [],
    };
    return ctx;
  }
};
