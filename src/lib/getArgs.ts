import { N } from 'ts-toolbelt';

export type TypeList = {
  string: string;
  number: number;
  boolean: boolean;
};

export type argsType<
  types extends (keyof TypeList)[],
  count extends number = 0
> = count extends types['length']
  ? [TypeList[types[count]]]
  : [TypeList[types[count]], ...argsType<types, N.Add<count, 1>>];

export const getArgs = (args: string[]): typeof func => {
  const func = <T extends (keyof TypeList)[]>(types: T) => {
    return args.map((value, index) => {
      const type = types[index];
      switch (type) {
        case 'string':
          return value;
        case 'number':
          return Number(value);
        case 'boolean':
          return Boolean(value);
        default:
          return value;
      }
    }) as argsType<T>;
  };
  return func;
};
