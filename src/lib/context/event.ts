import { Client } from 'ecstar';
import { ContextBase } from 'ecstar/context';

export interface EventContext extends ContextBase {
  type: 'event';
}

export const eventContext = (client: Client, name: string): EventContext => {
  return {
    name,
    type: 'event',
    client,
  };
};
