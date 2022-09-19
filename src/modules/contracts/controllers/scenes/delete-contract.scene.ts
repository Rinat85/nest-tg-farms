import {
  Scene,
  SceneEnter,
  SceneLeave,
  Command,
  Ctx,
  Action,
  Hears,
} from 'nestjs-telegraf';
import {
  BUTTONS,
  CONTRACT_SCENE_ID,
  DELETE_CONTRACT_SCENE_ID,
} from 'src/app.constants';
import { contractsButtons, renderKeyboard } from 'src/buttons/app.buttons';
import { Context } from 'src/interfaces/context.interface';
import { ContractsService } from '../../services/contracts.service';

const deleteContractRegExp = /^(?:delete)\s\d+/;
@Scene(DELETE_CONTRACT_SCENE_ID)
export class DeleteContractScene {
  constructor(private readonly contractsService: ContractsService) {}

  @SceneEnter()
  async onSceneEnter(ctx: Context): Promise<void> {
    await ctx.reply(
      '🚧 Выберите контракт для удаления 🚧',
      renderKeyboard([BUTTONS.common.prev, BUTTONS.common.returnToMainMenu], 1),
    );
    const contracts = await this.contractsService.getContracts();
    if (!contracts) {
      await ctx.reply('❗ Нет монет для удаления.');
    } else {
      await ctx.reply(
        '💰 Список добавленных комманд: 👇',
        contractsButtons('delete', contracts),
      );
    }
  }

  @SceneLeave()
  async onSceneLeave(@Ctx() ctx: Context) {
    console.log(`Leave from ${ctx.scene.session.current} scene`);
  }

  @Action(deleteContractRegExp)
  async deleteContractCallbackHandler(@Ctx() ctx: Context) {
    const actionData = await ctx.callbackQuery.data;
    const contractId = actionData.split(' ')[1];
    const isDeleted = await this.contractsService.deleteContract(
      Number(contractId),
    );
    if (isDeleted) {
      await ctx.reply('✅ Контракт успешно удален!');
      this.onSceneEnter(ctx);
    } else {
      await ctx.reply('Нет такого контракта!');
    }
  }

  @Hears(BUTTONS.common.prev)
  async onCoinPrev(@Ctx() ctx: Context) {
    await ctx.scene.enter(CONTRACT_SCENE_ID);
  }
}
