import { Scene, SceneEnter, SceneLeave, Ctx, Hears } from 'nestjs-telegraf';
import { ADD_COIN_SCENE_ID, BUTTONS, COIN_SCENE_ID, DELETE_COIN_SCENE_ID } from 'src/app.constants';
import { renderKeyboard } from 'src/buttons/app.buttons';
import { Context } from 'src/interfaces/context.interface';


@Scene(COIN_SCENE_ID)
export class CoinScene {
  @SceneEnter()
  async onSceneEnter(ctx: Context): Promise<void> {
    //   ctx.scene.session.state = {};
    await ctx.reply('Выберите действие:', renderKeyboard([BUTTONS.coin.add, BUTTONS.coin.delete, BUTTONS.common.returnToMainMenu], 2));
  }

  @SceneLeave()
  async onSceneLeave(@Ctx() ctx: Context) {
    console.log(`Leave from ${ctx.scene.session.current} scene`);
    // return ctx.copyMessage(ctx.message.chat.id, homeButtons());
  }

  @Hears(BUTTONS.coin.add)
  async onCoinAdd(@Ctx() ctx: Context) {
    await ctx.scene.enter(ADD_COIN_SCENE_ID);
  }

  @Hears(BUTTONS.coin.delete)
  async onCoinDelete(@Ctx() ctx: Context) {
    await ctx.scene.enter(DELETE_COIN_SCENE_ID);
  }
}