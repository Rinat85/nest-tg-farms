import { Scene, SceneEnter, SceneLeave, Ctx, Hears } from 'nestjs-telegraf';
import {
  BUTTONS,
  CONTRACT_SCENE_ID,
  DELETE_CONTRACT_SCENE_ID,
  ADD_CONTRACT_ADDRESS_SCENE_ID,
} from 'src/app.constants';
import { renderKeyboard } from 'src/buttons/app.buttons';
import { Context } from 'src/interfaces/context.interface';

@Scene(CONTRACT_SCENE_ID)
export class ContractScene {
  @SceneEnter()
  async onSceneEnter(ctx: Context): Promise<void> {
    //   ctx.scene.session.state = {};
    await ctx.reply(
      'Выберите действие:',
      renderKeyboard(
        [
          BUTTONS.contract.add,
          BUTTONS.contract.delete,
          BUTTONS.common.returnToMainMenu,
        ],
        2,
      ),
    );
  }

  @SceneLeave()
  async onSceneLeave(@Ctx() ctx: Context) {
    console.log(`Leave from ${ctx.scene.session.current} scene`);
    // return ctx.copyMessage(ctx.message.chat.id, homeButtons());
  }

  @Hears(BUTTONS.contract.add)
  async onContractAdd(@Ctx() ctx: Context) {
    await ctx.scene.enter(ADD_CONTRACT_ADDRESS_SCENE_ID);
  }

  @Hears(BUTTONS.contract.delete)
  async onContractDelete(@Ctx() ctx: Context) {
    await ctx.scene.enter(DELETE_CONTRACT_SCENE_ID);
  }
}
