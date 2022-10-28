import { StoreBase } from './StoreBase';

export class ArgumentStore extends StoreBase<'argument'> {
  constructor() {
    super('arguments');
  }
}
