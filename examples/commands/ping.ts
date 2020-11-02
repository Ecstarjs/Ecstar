import { command } from 'ecstar';

export default command(() => ({
  name: 'ping',
  render({ send }) {
    send('Pong');
  },
}));
