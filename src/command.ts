import {
  //   APIMessage,
  Message,
  //   MessageAdditions,
  //   MessageOptions,
  //   Snowflake,
  //   StringResolvable,
} from 'discord.js';

export type Context = {
  message: Message;
  args: string[];
  //   send: (
  //     content: StringResolvable | APIMessage,
  //     options?: (MessageOptions | MessageAdditions) & { channelid?: Snowflake }
  //   ) => void;
};

export type commandOptions = {
  name: string;
  aliases?: string[];
  render?(context: Context): void;
};

// methods: (client) => commandOptions
export const command = (methods: () => commandOptions): commandOptions => {
  return methods();
};
