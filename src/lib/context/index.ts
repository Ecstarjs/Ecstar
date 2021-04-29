import { Client } from 'ecstar';
import { Message } from 'discord.js';
import { Structures } from 'ecstar/structures';

import { commandContext } from 'ecstar/context/command';
import { eventContext } from 'ecstar/context/event';
import { argumentContext } from 'ecstar/context/argument';

type ContextType = Structures | 'unknown';

export interface ContextBase {
  name: string;
  type: ContextType;
  client: Client;
}

export type contextFunc = typeof commandContext &
  typeof eventContext &
  typeof argumentContext;

export const context: contextFunc = (
  client: Client,
  arg: Message | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  if (arg instanceof Message) {
    return commandContext(client, arg);
  } else if (typeof arg === 'string') {
    return eventContext(client, arg);
  } else {
    return argumentContext(client, arg);
  }
};
