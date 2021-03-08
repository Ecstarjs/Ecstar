import { ClientEvents } from 'discord.js';
import { EventContext } from "ecstar/context/event"

export type eventOptions = {
  name: keyof ClientEvents;
  run(context: EventContext): void;
};

export const event = (methods: () => eventOptions): eventOptions => {
  return methods();
};
