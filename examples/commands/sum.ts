import { command } from 'ecstar';

export default command(() => ({
  name: 'sum',
  render({ send, args: [a, b] }) {
    send(String(a + b)); // 今は計算できない
  },
}));
