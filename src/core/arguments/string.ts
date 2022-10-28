import { argument } from 'ecstar';

export default argument(() => ({
  name: 'string',
  run({ content }) {
    return String(content);
  },
}));
