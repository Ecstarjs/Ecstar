import { ArgumentContext } from 'ecstar/context/argument';

export interface argumentOptions {
  name: string;
  run(context: ArgumentContext): unknown;
}

export const argument = (methods: () => argumentOptions): argumentOptions => {
  return methods();
};
