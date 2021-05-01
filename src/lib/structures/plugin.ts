import { Client } from 'ecstar';

export interface plugin {
  name: string;
  run(client: Client): void;
}
