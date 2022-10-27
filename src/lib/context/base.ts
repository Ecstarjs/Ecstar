import { Client } from 'ecstar';
import { Structures } from 'ecstar/structures';

type ContextType = keyof Structures | string | 'unknown';

export interface ContextBase {
  name: string;
  type: ContextType;
  client: Client;
}
