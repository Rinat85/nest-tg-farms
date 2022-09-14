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
  ADD_CONTRACT_COMMAND_SCENE_ID,
  BUTTONS,
  CONTRACT_SCENE_ID,
} from 'src/app.constants';
import { renderKeyboard } from 'src/buttons/app.buttons';
import { Context } from 'src/interfaces/context.interface';
import { isValidEthAddress } from 'src/utils/validation.util';
import { ContractsService } from '../../services/contracts.service';

@Scene(ADD_CONTRACT_ADDRESS_SCENE_ID)
export class AddContractAddressScene {
  constructor(private readonly contractsService: ContractsService) {}

  @SceneEnter()
  async onSceneEnter(ctx: Context): Promise<void> {
    ctx.scene.session.state = {};
    await ctx.reply(
      'Введите адрес контракта',
      renderKeyboard([BUTTONS.common.prev, BUTTONS.common.returnToMainMenu], 1),
    );
  }

  @SceneLeave()
  async onSceneLeave(@Ctx() ctx: Context) {
    console.log(`Leave from ${ctx.scene.session.current} scene`);
  }

  @Hears(BUTTONS.common.prev)
  async onAddContractAddressPrev(@Ctx() ctx: Context) {
    await ctx.scene.enter(CONTRACT_SCENE_ID);
  }

  @Hears(BUTTONS.common.next)
  async onAddContractAddressNext(@Ctx() ctx: Context) {
    await ctx.scene.enter(ADD_CONTRACT_COMMAND_SCENE_ID);
  }

  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    const isAddress = isValidEthAddress(message);
    if (isAddress) {
      const isExist = await this.contractsService.getContract({
        address: message,
      });
      if (!isExist) {
        ctx.scene.session.state = { address: message };
        // ctx.session.state.contract = { ...ctx.session.state.contract, address: message };
        await ctx.reply(
          'Адрес сохранен ✅',
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
        await ctx.reply('⛔Контракт с таким адресом уже добавлен!');
      }
    } else {
      await ctx.reply('⛔Введите валидный адрес!');
    }
  }
}
