import { argument } from 'ecstar';

export default argument(() => ({
  name: 'number',
  run({ content }) {
    return Number(content);
  },
}));
