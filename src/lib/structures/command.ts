import { CommandContext } from 'ecstar/context/command';
import { PermissionResolvable } from 'discord.js';
import { SlashCommandContext } from 'ecstar/context/slashCommand';

export type commandOptions = {
  name: string;
  aliases?: string[];
  guildOnly?: boolean;
  permissions?: { bot?: PermissionResolvable[]; user?: PermissionResolvable[] };
  run?(context: CommandContext | SlashCommandContext): void;
  /** @deprecated Replaced by run */
  render?(context: CommandContext): void;
};

// methods: (client) => commandOptions
export const command = (methods: () => commandOptions): commandOptions => {
  return methods();
};
