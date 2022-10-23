import { watch } from 'chokidar';
import { Client } from 'ecstar';
import { Structures } from 'ecstar/structures';
import path from 'node:path';

const getDirectoryPath = (directoryName: string) => {
  const rootPath = require.main?.filename;
  if (!rootPath) throw new Error("Can't find root directory");
  const rootDir = path.dirname(rootPath);
  return path.resolve(rootDir, directoryName);
};

export class StoreBase<
  T extends keyof Structures,
  X extends Structures[T] | Structures[T][] = Structures[T]
> extends Map<string, X> {
  constructor(private storeDirectryName: string) {
    super();

    const directorypath = getDirectoryPath(storeDirectryName);
    if (!directorypath) return;
    watch(directorypath).on('add', (path) => this.update(path));
  }
  add(name: string, file: X): this {
    Client.log.info('[Store]', `/${this.storeDirectryName} - ${name}`);
    return this.set(name, file);
  }
  async update(path: string) {
    const { default: file }: { default: X } = await import(path);
    if ('name' in file) {
      this.add(file.name, file);
    }
  }
}
