import { ClientEvents } from 'discord.js';
import { EventContext } from 'ecstar/context/event';

export interface EcstarEvents extends ClientEvents {
  unknown: unknown[];
}

export type eventOptions<T extends keyof EcstarEvents = 'unknown'> = {
  name: T;
  run(context: EventContext, callback: EcstarEvents[T]): void;
};

export const event = <T extends keyof EcstarEvents>(
  methods: () => eventOptions<T>
): eventOptions<T> => {
  return methods();
};
