import { event } from 'ecstar';

export default event(() => ({
  name: 'message',
  run({ send}, [message]) {
    if (message.author.bot) return;

    send(
      `${message.cleanContent} | ${message.author.tag}`,
      '836949563704082482'
    );
  },
}));
