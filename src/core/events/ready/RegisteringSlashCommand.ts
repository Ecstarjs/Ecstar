import { event } from 'ecstar';
import { Events, REST, Routes, SlashCommandBuilder } from 'discord.js';

export default event(() => ({
  name: Events.ClientReady,
  run({ client }) {
    const commands: SlashCommandBuilder[] = [];

    for (const key of client.commands.keys()) {
      commands.push(
        new SlashCommandBuilder()
          .setName(key)
          .setDescription('ecstar slash command')
      );
    }

    const rest = new REST({ version: '10' }).setToken(client?.token || '');

    (async () => {
      try {
        await rest.put(Routes.applicationCommands(client.user?.id || ''), {
          body: commands,
        });
        client.log.success('slash commands');
      } catch (error) {
        client.log.error(error);
      }
    })();
  },
}));
