import { plugin } from 'ecstar/plugin';
import consola from 'consola';

declare module 'ecstar' {
  interface Client {
    log: typeof consola;
  }
}

export default {
  name: 'Log',
  run: (client) => {
    client.log = consola;
  },
} as plugin;
