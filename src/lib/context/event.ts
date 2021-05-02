import { Client } from 'ecstar';
import {
  APIMessage,
  Message,
  Snowflake,
  StringResolvable,
  TextChannel,
} from 'discord.js';
import { ContextBase } from 'ecstar/context';

export interface EventContext extends ContextBase {
  type: 'event';
  send(
    content: StringResolvable | APIMessage,
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
