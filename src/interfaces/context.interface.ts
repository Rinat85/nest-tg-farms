import { Context as TelegrafContext, Scenes } from 'telegraf';

interface MySession extends Scenes.SceneSession {
  // will be available under `ctx.session.type`
  type?: 'add' | 'remove' | 'addCoin' | 'deleteCoin' | 'addContract' | 'done';
  state: {
    contract?: {
      address?: string;
      command?: string;
      coinId?: number;
      userId?: number;
    };
  };
}

export interface Context extends TelegrafContext {
  session: MySession;

  scene: Scenes.SceneContextScene<Context>;
}
