import { Context } from '../context';

export type commandOptions = {
  name: string;
  aliases?: string[];
  render?(context: Context<'command'>): void;
};

// methods: (client) => commandOptions
export const command = (methods: () => commandOptions): commandOptions => {
  return methods();
};
