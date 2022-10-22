import { Structures } from 'ecstar/structures';
import { StoreBase } from './StoreBase';
import path from 'path';

export class EventStore extends StoreBase<'event', Structures['event'][]> {
  constructor() {
    super('events');
    // Core
    this.update(path.resolve(__dirname, '../handler/', 'CommandHandler'));
  }
  async update(path: string) {
    const { default: file }: { default: Structures['event'] } = await import(
      path
    );
    const current = this.get(file.name);
    this.set(file.name, current ? [file, ...current] : [file]);
  }
}
