import { Client } from 'ecstar';
import { APIMessage, Message, StringResolvable } from 'discord.js';
import { parser } from 'ecstar/parser';

export interface Context {
  name: string;
  message: Message;
  args: string[];
  send(content: StringResolvable | APIMessage): Promise<Message>;
}

export const context = (client: Client, message: Message): Context => {
  const { commandName, args } = parser(client, message.cleanContent);

  return {
    name: commandName,
    message,
    args,
    send(content) {
      return message.channel.send(content);
    },
  };
};
