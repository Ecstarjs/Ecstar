import { Client } from 'ecstar';
import { ContextBase } from 'ecstar/context';

export interface EventContext extends ContextBase {
  type: 'event';
  callback: unknown[];
}

export const eventContext = (
  client: Client,
  name: string,
  callback: unknown[]
): EventContext => {
  return {
    name,
    type: 'event',
    client,
    callback,
  };
};
