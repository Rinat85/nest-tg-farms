import { Scene, SceneEnter, SceneLeave, Ctx, Hears, On, Message, Action } from 'nestjs-telegraf';
import { DELETE_COIN_SCENE_ID } from 'src/app.constants';
import { coinsButtons } from 'src/buttons/app.buttons';
import { Context } from 'src/interfaces/context.interface';
import { CoinsService } from '../../services/coins.service';

const deleteCoinRegExp = /^(?:delete)\s\d+/;

@Scene(DELETE_COIN_SCENE_ID)
export class DeleteCoinScene {
    constructor(
        private readonly coinsService: CoinsService,
    ) {}

  @SceneEnter()
  async onSceneEnter(ctx: Context): Promise<void> {
    //   ctx.scene.session.state = {};
    const coins = await this.coinsService.getCoins();
    if (!coins) {
      await ctx.reply('❗ Нет монет для удаления.');
    } else {
      await ctx.reply('Выберите монету для удаления:', coinsButtons(coins));
    }
  }

  @SceneLeave()
  async onSceneLeave(@Ctx() ctx: Context) {
    console.log(`Leave from ${ctx.scene.session.current} scene`);
    // return ctx.copyMessage(ctx.message.chat.id, homeButtons());
  }

    @Action(deleteCoinRegExp)
    async deleteCoinCallbackHandler(@Ctx() ctx: Context) {
        const actionData = await ctx.callbackQuery.data;
        const [_, coinId] = actionData.split(' ');
        const isDeleted = await this.coinsService.deleteCoin(Number(coinId));
        if (isDeleted) {
            await ctx.reply('✅Монета успешно удалена!');
            this.onSceneEnter(ctx);
        } else {
            await ctx.reply('Нет такой монеты!');
        }
    }
}