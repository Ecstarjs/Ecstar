import { argumentOptions } from './argument';
import { commandOptions } from './command';
import { eventOptions } from './event';

export type Structures = {
  command: commandOptions;
  event: eventOptions;
  argument: argumentOptions;
};
