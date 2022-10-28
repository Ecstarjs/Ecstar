import { Client } from 'ecstar';
import { commandOptions } from 'ecstar/structures/command';

export const parser = (
  client: Client,
  content: string[],
  options: commandOptions
) => {
  return content;
};
