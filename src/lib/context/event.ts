import { Message, Snowflake, TextChannel } from 'discord.js';
import { Client } from 'ecstar';
import { ContextBase } from 'ecstar/context/base';

export interface EventContext extends ContextBase {
  type: 'event';
  send(
    content: Parameters<TextChannel['send']>[0],
    channelID: Snowflake
  ): Promise<Message>;
}

export const eventContext = (client: Client, name: string): EventContext => {
  return {
    name,
    type: 'event',
    client,
    send(content, id) {
      const channel = client.channels.cache.get(id) as TextChannel;

      return channel.send(content);
    },
  };
};
