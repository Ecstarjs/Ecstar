import { event } from 'ecstar';
import { Events } from 'discord.js';
import { slashCommandContext } from 'ecstar/context/slashCommand';

export default event(() => ({
  name: Events.InteractionCreate,
  run({ client }, [interaction]) {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    const ctx = slashCommandContext(client, interaction);
    if (command?.run && ctx) command.run(ctx);
  },
}));
