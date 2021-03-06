import { Client } from 'ecstar';
import split from 'split-string';

export type parsed = { commandName: string; args: string[] };

export const parser = (client: Client, content: string): parsed => {
  const [prefixAndCommandName, ...args] = split(content, {
    separator: ' ',
    quotes: ['"', "'", '`'],
    // brackets: { '<@': '>' },
  });

  const commandName = prefixAndCommandName.slice(client.options.prefix.length);

  return { commandName, args };
};
