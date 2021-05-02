import { Client } from 'ecstar';
import split from 'split-string';

export type parsed = { commandName: string; args: string[] };

export const parser = (client: Client, content: string): parsed => {
  const mentionPrefix = `<@!${client.user?.id}>`;

  const [prefixAndCommandName, ...args] = split(content, {
    separator: ' ',
    quotes: ['"', "'", '`'],
  });
  let commandName;

  if (content.startsWith(mentionPrefix)) {
    // Allow @mention Command and @mentionCommand
    commandName = [prefixAndCommandName, args[0]]
      .join('')
      .slice(mentionPrefix.length);
  } else {
    commandName = prefixAndCommandName.slice(client.options.prefix.length);
  }

  return { commandName, args };
};
