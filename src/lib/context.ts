import { Client } from 'ecstar';
import { APIMessage, Message, StringResolvable } from 'discord.js';
import { parser } from 'ecstar/parser';

export type ContextType = 'command' | 'event' | 'argument' | 'unknown';
export type Context<T extends ContextType> = T extends 'command'
  ? CommandContext
  : T extends 'event'
  ? EventContext
  : T extends 'argument'
  ? ArgumentContext
  : never;

interface ContextBase {
  name: string;
  type: ContextType;
  client: Client;
}

interface CommandContext extends ContextBase {
  type: 'command';
  message: Message;
  args: string[];
  send(content: StringResolvable | APIMessage): Promise<Message>;
}

interface EventContext extends ContextBase {
  type: 'event';
  callback: unknown[];
}

interface ArgumentContext extends ContextBase {
  type: 'argument';
}

export type contextFunc = {
  (client: Client, message: Message): Context<'command'>;
  (client: Client, name: string, callback: unknown[]): Context<'event'>;
  (client: Client, name: string): Context<'argument'>;
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

    const ctx: Context<'command'> = {
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
  } else if (arg2) {
    const ctx: Context<'event'> = {
      name: arg1,
      type: 'event',
      client,
      callback: arg2 || [],
    };
    return ctx;
  } else {
    const ctx: Context<'argument'> = {
      name: arg1,
      type: 'argument',
      client,
    };
    return ctx;
  }
};
