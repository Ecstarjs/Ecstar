import { command } from 'ecstar';

export default command(() => ({
  name: 'sum',
  render({ send, args }) {
    const [a, b] = args.getValues('number', 'number');
    send(String(a + b));
  },
}));
