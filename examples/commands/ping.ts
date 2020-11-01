import { command } from 'ecstar';

export default command(() => ({
  name: 'ping',
  render({ message }) {
    message.channel.send('Pong');
    // send('Pong');
  },
}));
