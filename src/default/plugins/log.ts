import { plugin } from 'ecstar/plugin';
import consola from 'consola';

declare module 'ecstar' {
  interface Client {
    log: typeof consola;
  }
}

export const log = {
  name: 'log',
  run: (client) => {
    client.log = consola;
  },
} as plugin;
