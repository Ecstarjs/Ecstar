import { event } from 'ecstar';
import { Events } from 'discord.js';

export default event(() => ({
  name: Events.ClientReady,
  run({ client }) {
    client.log.ready(client.user?.tag);
  },
}));
