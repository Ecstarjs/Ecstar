import { command } from 'ecstar';

export default command(() => ({
  name: 'editChannel',
  guildOnly: true,
  permissions: {
    bot: ['MANAGE_CHANNELS'],
  },
  render({ message, getArgs }) {
    const { text } = getArgs({ text: 'string' });
    if (message.channel.type === 'text') {
      message.channel.edit({ name: text }, 'Ecstar editChannel test');
    }
  },
}));
