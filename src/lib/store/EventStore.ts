import { Structures } from 'ecstar/structures';
import { StoreBase } from './StoreBase';

export class EventStore extends StoreBase<'event', Structures['event'][]> {
  constructor() {
    super('events');
  }
  async update(path: string) {
    const { default: file }: { default: Structures['event'] } = await import(
      path
    );
    const current = this.get(file.name);
    this.set(file.name, current ? [file, ...current] : [file]);
  }
}
