import { command } from 'ecstar';

export default command(() => ({
  name: 'editChannel',
  guildOnly: true,
  permissions: {
    bot: ['MANAGE_CHANNELS'],
  },
  render({ message, args: [text] }) {
    if (message.channel.type === 'GUILD_TEXT' && text.name === 'string') {
      message.channel.edit({ name: text.value }, 'Ecstar editChannel test');
    }
  },
}));