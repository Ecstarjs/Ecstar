import { watch } from 'chokidar';
import { Structures } from 'ecstar/structures';
import path from 'node:path';

const getDirectoryPath = (directoryName: string) => {
  const rootPath = require.main?.filename;
  if (!rootPath) throw new Error("Can't find root directory");
  const rootDir = path.dirname(rootPath);
  return path.resolve(rootDir, directoryName);
};

export class Store<T extends keyof Structures> extends Map {
  constructor(storeDirectryName: string) {
    super();
    const directorypath = getDirectoryPath(storeDirectryName);
    if (!directorypath) return;

    watch(directorypath).on('add', (path) => this.update(path));
    this.loadDefault(storeDirectryName);
  }
  loadDefault(directoryName: string) {
    watch(path.resolve(__dirname, '../default', directoryName)).on(
      'add',
      (path: string) => this.update(path)
    );
  }
  async update(path: string) {
    const { default: file }: { default: Structures[T] } = await import(path);

    this.set(file.name, file);
  }
}
