import { StoreBase } from './StoreBase';

export class CommandStore extends StoreBase<'command'> {
  constructor() {
    super('commands');
  }
}
