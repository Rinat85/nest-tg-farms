import { Context as TelegrafContext } from 'telegraf';

export interface Context extends TelegrafContext {
  session: {
    type?: 'add' | 'remove';
  };
}
