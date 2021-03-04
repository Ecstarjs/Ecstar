import { Client } from 'ecstar';
import { APIMessage, Message, StringResolvable } from 'discord.js';
import split from 'split-string';

export interface Context {
  name: string;
  message: Message;
  args: string[];
  send(content: StringResolvable | APIMessage): Promise<Message>;
}

export const context = (client: Client, message: Message): Context => {
  const [prefixAndCommandName, ...args] = split(message.content, {
    separator: ' ',
    quotes: ['"', "'", '`'],
    // brackets: { '<@': '>' },
  });

  const commandName = prefixAndCommandName.slice(client.options.prefix.length);

  return {
    name: commandName,
    message,
    args,
    send(content) {
      return message.channel.send(content);
    },
  };
};
