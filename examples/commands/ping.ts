import { command } from 'ecstar';

export default command(() => ({
  name: 'ping',
  run({ send }) {
    send('Pong');
  },
}));
