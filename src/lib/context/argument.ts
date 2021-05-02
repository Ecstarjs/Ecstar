import { Client } from 'ecstar';
import { ContextBase } from 'ecstar/context';

export interface ArgumentContext extends ContextBase {
  type: 'argument';
}

export const argumentContext = (
  client: Client,
  name: string
): ArgumentContext => {
  return {
    name,
    type: 'argument',
    client,
  };
};
