import { TextChannel } from 'discord.js';
import { command } from 'ecstar';

export default command(() => ({
  name: 'editChannel',
  guildOnly: true,
  permissions: {
    bot: ['MANAGE_CHANNELS'],
  },
  render({ message, getArgs }) {
    const { text } = getArgs({ text: 'string' });
    (message.channel as TextChannel).edit(
      { name: text },
      'Ecstar editChannel test'
    );
  },
}));
