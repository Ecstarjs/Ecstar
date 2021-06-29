import { parsed } from "ecstar/parser"

export type TypeList = {
  string: string;
  number: number;
  boolean: boolean;
};

export type argsType<types extends { [key: string]: keyof TypeList }> = {
  [K in keyof types]: TypeList[types[K]];
};

export const getArgs = (args: parsed["args"]): typeof func => {
  const func = <T extends { [key: string]: keyof TypeList }>(types: T) => {
    return Object.fromEntries(
      Object.entries(types).map(([key, type], index) => {
        const value = args[index].value;
        const func = () => {
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
        };
        return [key, func()];
      })
    ) as argsType<T>;
  };
  return func;
};
