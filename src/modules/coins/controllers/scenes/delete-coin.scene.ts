import {
  Scene,
  SceneEnter,
  SceneLeave,
  Ctx,
  Hears,
  Action,
} from 'nestjs-telegraf';
import {
  BUTTONS,
  COIN_SCENE_ID,
  DELETE_COIN_SCENE_ID,
} from 'src/app.constants';
import { coinsButtons, renderKeyboard } from 'src/buttons/app.buttons';
import { Context } from 'src/interfaces/context.interface';
import { CoinsService } from '../../services/coins.service';

const deleteCoinRegExp = /^(?:delete)\s\d+/;

@Scene(DELETE_COIN_SCENE_ID)
export class DeleteCoinScene {
  constructor(private readonly coinsService: CoinsService) {}

  @SceneEnter()
  async onSceneEnter(ctx: Context): Promise<void> {
    //   ctx.scene.session.state = {};

    await ctx.reply(
      '🚧 Выберите монету для удаления 🚧',
      renderKeyboard([BUTTONS.common.prev, BUTTONS.common.returnToMainMenu], 1),
    );
    const coins = await this.coinsService.getCoins();
    if (!coins) {
      await ctx.reply('❗ Нет монет для удаления.');
    } else {
      await ctx.reply(
        '💰 Список добавленных монет: 👇',
        coinsButtons('delete', coins),
      );
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
    const coinId = actionData.split(' ')[1];
    const isDeleted = await this.coinsService.deleteCoin(Number(coinId));
    if (isDeleted) {
      await ctx.reply('✅Монета успешно удалена!');
      this.onSceneEnter(ctx);
    } else {
      await ctx.reply('Нет такой монеты!');
    }
  }

  @Hears(BUTTONS.common.prev)
  async onCoinPrev(@Ctx() ctx: Context) {
    await ctx.scene.enter(COIN_SCENE_ID);
  }
}
