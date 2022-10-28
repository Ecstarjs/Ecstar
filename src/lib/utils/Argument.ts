type list = {
  string: string;
  number: number;
};

type values<T extends (keyof list)[]> = T extends [infer value, ...infer rest]
  ? value extends keyof list
    ? rest extends (keyof list)[]
      ? [list[value], ...values<rest>]
      : list[value]
    : []
  : [];

export class Argument {
  contents: string[];
  count: number;
  constructor(contents: string[]) {
    this.contents = contents;
    this.count = 0;
  }
  getValue<T extends keyof list>(type: T): list[T] {
    const value = this.contents[this.count];
    this.count++;
    switch (type) {
      case 'string':
        return String(value) as list[T];
      case 'number':
        return Number(value) as list[T];
    }
    return value as list[T];
  }
  getValues<T extends (keyof list)[]>(...types: T) {
    return types.map((type) => this.getValue(type)) as values<T>;
  }
}
