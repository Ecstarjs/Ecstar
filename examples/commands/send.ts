import { command } from 'ecstar';

export default command(() => ({
  name: 'send',
  render({ send, args }) {
    send(args.getValue('string'));
  },
}));
