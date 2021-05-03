import { command } from 'ecstar';

export default command(() => ({
  name: 'ping',
  render({ send, author }) {
    send('Pong');
  },
}));
