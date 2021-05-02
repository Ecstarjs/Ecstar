import { CommandContext } from 'ecstar/context/command';

export type commandOptions = {
  name: string;
  aliases?: string[];
  render?(context: CommandContext): void;
};

// methods: (client) => commandOptions
export const command = (methods: () => commandOptions): commandOptions => {
  return methods();
};
