import { event } from 'ecstar';

export default event(() => ({
  name: 'ready',
  run({ client }) {
    client.log.ready(client.user?.tag);
  },
}));
