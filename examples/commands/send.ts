import { command } from 'ecstar';

export default command(() => ({
  name: 'send',
  render({ send, args: [text] }) {
    send(text);
  },
}));
