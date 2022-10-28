import { command } from 'ecstar';
import { ChannelType } from 'discord.js';

export default command(() => ({
  name: 'editchannel',
  guildOnly: true,
  permissions: {
    bot: ['ManageChannels'],
  },
  render({ message, args: [text] }) {
    if (message.channel.type === ChannelType.GuildText) {
      message.channel.edit({
        name: text,
        reason: 'Ecstar editChannel test',
      });
    }
  },
}));
