import { Interaction, Message, Snowflake, TextChannel } from 'discord.js';
import { Client } from 'ecstar';
import { ContextBase } from 'ecstar/context/base';

export interface SlashCommandContext extends ContextBase {
  type: 'slashCommand';
  send(content: string): void;
}

export const slashCommandContext = (
  client: Client,
  interaction: Interaction
): SlashCommandContext | undefined => {
  if (!interaction.isChatInputCommand()) return;
  return {
    name: interaction.commandName,
    type: 'slashCommand',
    client,
    send(content) {
      interaction.reply(content);
    },
  };
};
