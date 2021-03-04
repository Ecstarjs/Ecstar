import { ClientEvents } from 'discord.js';

export type eventOptions = {
  name: keyof ClientEvents;
  run(...callback: unknown[]): void;
};

export const event = (methods: () => eventOptions): eventOptions => {
  return methods();
};
