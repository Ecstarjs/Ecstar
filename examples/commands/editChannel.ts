import { command } from 'ecstar';
import { ChannelType } from 'discord.js';

export default command(() => ({
  name: 'editchannel',
  guildOnly: true,
  permissions: {
    bot: ['ManageChannels'],
  },
  render({ message, args }) {
    if (message.channel.type === ChannelType.GuildText) {
      message.channel.edit({
        name: args.getValue('string'),
        reason: 'Ecstar editChannel test',
      });
    }
  },
}));
