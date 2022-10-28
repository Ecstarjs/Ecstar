import { Client } from 'ecstar';
import { argumentContext } from 'ecstar/context/argument';

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
  constructor(private client: Client, contents: string[]) {
    this.contents = contents;
    this.count = 0;
  }
  getValue<T extends keyof list>(type: T): list[T] {
    const value = this.contents[this.count];
    this.count++;

    const args = this.client.arguments.get(type);
    const ctx = argumentContext(this.client, type, value);

    return args?.run(ctx) as list[T];
  }
  getValues<T extends (keyof list)[]>(...types: T) {
    return types.map((type) => this.getValue(type)) as values<T>;
  }
}
