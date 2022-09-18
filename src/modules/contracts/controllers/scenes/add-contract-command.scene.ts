import {
  Scene,
  SceneEnter,
  SceneLeave,
  Ctx,
  Hears,
  On,
  Message,
} from 'nestjs-telegraf';
import {
  ADD_CONTRACT_ADDRESS_SCENE_ID,
  ADD_CONTRACT_COIN_SCENE_ID,
  ADD_CONTRACT_COMMAND_SCENE_ID,
  BUTTONS,
} from 'src/app.constants';
import { renderKeyboard } from 'src/buttons/app.buttons';
import { Context } from 'src/interfaces/context.interface';
import { isCommandSet } from 'src/utils/validation.util';
import { ContractsService } from '../../services/contracts.service';

@Scene(ADD_CONTRACT_COMMAND_SCENE_ID)
export class AddContractCommandScene {
  constructor(private readonly contractsService: ContractsService) {}

  @SceneEnter()
  async onSceneEnter(ctx: Context): Promise<void> {
    if (ctx.session.contract.coin) {
      ctx.session.contract.coin = null;
    }
    await ctx.reply(
      'Придумайте название команды для контракта.\nКоманда должна быть написана только буквами латинского алфавита и не иметь знак "/".',
      renderKeyboard([BUTTONS.common.prev, BUTTONS.common.returnToMainMenu], 1),
    );
  }

  @SceneLeave()
  async onSceneLeave(@Ctx() ctx: Context) {
    console.log(`Leave from ${ctx.scene.session.current} scene`);
  }

  @Hears(BUTTONS.common.prev)
  async onAddContractCommandPrev(@Ctx() ctx: Context) {
    await ctx.scene.enter(ADD_CONTRACT_ADDRESS_SCENE_ID);
  }

  @Hears(BUTTONS.common.next)
  async onAddContractCommandNext(@Ctx() ctx: Context) {
    await ctx.scene.enter(ADD_CONTRACT_COIN_SCENE_ID);
  }

  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    const isValidCommand = isCommandSet(message);
    if (isValidCommand) {
      const isExist = await this.contractsService.getContract({
        command: message,
      });
      if (!isExist) {
        ctx.session.contract = { ...ctx.session.contract, command: message };
        await ctx.reply(
          `Команда сохранена ✅. Нажмите кнопку "${BUTTONS.common.next}"`,
          renderKeyboard(
            [
              BUTTONS.common.prev,
              BUTTONS.common.next,
              BUTTONS.common.returnToMainMenu,
            ],
            2,
          ),
        );
      } else {
        await ctx.reply('⛔Контракт с такой командой уже существует!');
      }
    } else {
      await ctx.reply('⛔Введите валидную команду!');
    }
  }
}
