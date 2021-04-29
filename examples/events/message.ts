import { TextChannel } from 'discord.js';
import { event } from 'ecstar';

export default event(() => ({
  name: 'message',
  run({ client }, [message]) {
    if (message.author.bot) return;
    const channel = client.channels.cache.get(
      '836949563704082482'
    ) as TextChannel;

    channel.send(`${message.cleanContent} | ${message.author.tag}`);
  },
}));
