import { watch } from 'chokidar';
import path from 'path';

export class Store<T> extends Map<string, T> {
  constructor(type: string) {
    super();

    const directorypath = this.getDirectoryPath(type);
    if (!directorypath) return;
    watch(directorypath).on('add', (path: string) => this.import(path));
  }
  getDirectoryPath(dir: string): string | undefined {
    const rootPath = require.main?.filename;
    if (!rootPath) return undefined;
    const rootDir = path.dirname(rootPath);
    return path.resolve(rootDir, dir);
  }
  async import(path: string): Promise<void> {
    const file = (await import(path)).default;
    this.set(file.name, file);
  }
}
