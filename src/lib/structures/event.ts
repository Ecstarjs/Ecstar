import { Context } from '../context';
import { ClientEvents } from 'discord.js';

export type eventOptions = {
  name: keyof ClientEvents;
  run(context: Context<'event'>): void;
};

export const event = (methods: () => eventOptions): eventOptions => {
  return methods();
};
