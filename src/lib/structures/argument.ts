import { Context } from '../context';

export interface argumentOptions {
  name: string;
  run(context: Context<'argument'>): void;
}

export const argument = (methods: () => argumentOptions): argumentOptions => {
  return methods();
};
