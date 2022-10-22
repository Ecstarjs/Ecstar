import { watch } from 'chokidar';
import path from 'path';

import { Structures } from 'ecstar/structures';

import { commandOptions } from 'ecstar/command';
import { eventOptions } from 'ecstar/event';
import { argumentOptions } from 'ecstar/argument';

export type StoreImported<T extends keyof Structures> = T extends 'command'
  ? commandOptions
  : T extends 'event'
  ? eventOptions[]
  : T extends 'argument'
  ? argumentOptions
  : never;

export class Store<T extends keyof Structures> extends Map<
  string,
  StoreImported<T>
> {
  constructor(protected type: T) {
    super();

    const directoryName = type + 's';

    const directorypath = this.getDirectoryPath(directoryName);
    if (!directorypath) return;
    watch(directorypath).on('add', (path: string) => this.import(path));

    // src/default/*
    watch(path.resolve(__dirname, '../default', directoryName)).on(
      'add',
      (path: string) => this.import(path)
    );
  }
  getDirectoryPath(dir: string): string | undefined {
    const rootPath = require.main?.filename;
    if (!rootPath) return undefined;
    const rootDir = path.dirname(rootPath);
    return path.resolve(rootDir, dir);
  }

  async import(path: string): Promise<void> {
    const file = (await import(path)).default;

    if (this.type === 'event') {
      const current = this.get(file.name) as StoreImported<'event'>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.set(file.name, current ? [file, ...current] : ([file] as any));
    } else {
      this.set(file.name, file);
    }
  }
}
