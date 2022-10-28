import { Client } from 'ecstar';
import { ContextBase } from 'ecstar/context/base';

export interface ArgumentContext extends ContextBase {
  type: 'argument';
  content: string;
}

export const argumentContext = (
  client: Client,
  name: string,
  content: string
): ArgumentContext => {
  return {
    client,
    type: 'argument',
    name,
    content,
  };
};
