import { command } from 'ecstar';

export default command(() => ({
  name: 'sum',
  render({ send, getArgs }) {
    const { a, b } = getArgs({ a: "number", b: "number" })
    send(a + b);
  },
}));
