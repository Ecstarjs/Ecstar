import { command } from 'ecstar';
import { ChannelType } from 'discord.js';

export default command(() => ({
  name: 'editchannel',
  guildOnly: true,
  permissions: {
    bot: ['ManageChannels'],
  },
  render({ message, args: [text] }) {
    if (
      message.channel.type === ChannelType.GuildText &&
      text.name === 'string'
    ) {
      message.channel.edit({
        name: text.value,
        reason: 'Ecstar editChannel test',
      });
    }
  },
}));
