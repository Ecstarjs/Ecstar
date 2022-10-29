import { argument } from 'ecstar';

export default argument(() => ({
  name: 'boolean',
  run({ content }): boolean {
    console.log(content === 'true');
    switch (content) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return false;
    }
  },
}));
