import { command } from 'ecstar';

export default command(() => ({
  name: 'send',
  render({ send, getArgs }) {
    const args = getArgs({ text: 'string' });
    send(args.text);
  },
}));
