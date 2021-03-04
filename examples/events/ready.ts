import { event } from 'ecstar';

export default event(() => ({
  name: 'ready',
  run() {
    process.stdout.write('ready');
  },
}));
