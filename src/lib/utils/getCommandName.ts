import { Client } from 'ecstar';

export const getCommandName = (client: Client, content: string) => {
  const mention = `<@!${client.user?.id}>`;
  const prefix = client.options.prefix;
  if (content.startsWith(mention)) {
    return content.slice(mention.length).split(' ')[0];
  } else if (content.startsWith(prefix)) {
    return content.slice(prefix.length).split(' ')[0];
  }
  return content;
};
