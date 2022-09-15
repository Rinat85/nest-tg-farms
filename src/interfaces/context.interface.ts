import { Context as TelegrafContext, Scenes } from 'telegraf';
import { IContract } from './contract.interface';

interface MySession extends Scenes.SceneSession {
  // will be available under `ctx.session.type`
  contract?: IContract;
}

export interface Context extends TelegrafContext {
  session: MySession;

  scene: Scenes.SceneContextScene<Context>;
}
