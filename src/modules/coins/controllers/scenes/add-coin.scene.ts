import {
  Scene,
  SceneEnter,
  SceneLeave,
  Ctx,
  Hears,
  On,
  Message,
} from 'nestjs-telegraf';
import { ADD_COIN_SCENE_ID, BUTTONS, COIN_SCENE_ID } from 'src/app.constants';
import { renderKeyboard } from 'src/buttons/app.buttons';
import { Context } from 'src/interfaces/context.interface';
import { isValidEthAddress } from 'src/utils/validation.util';
import { CoinsService } from '../../services/coins.service';

const msgRegEx = /\s+/;
@Scene(ADD_COIN_SCENE_ID)
export class AddCoinScene {
  constructor(private readonly coinsService: CoinsService) {}

  @SceneEnter()
  async onSceneEnter(ctx: Context): Promise<void> {
    //   ctx.scene.session.state = {};
    await ctx.replyWithHTML(
      'Для добавления монеты введите данные в формате: \n <i>&#60;название&#62;&#60;пробел&#62;&#60;адрес_монеты&#62;</i>',
      renderKeyboard([BUTTONS.common.prev, BUTTONS.common.returnToMainMenu], 1),
    );
  }

  @SceneLeave()
  async onSceneLeave(@Ctx() ctx: Context) {
    console.log(`Leave from ${ctx.scene.session.current} scene`);
    // return ctx.copyMessage(ctx.message.chat.id, homeButtons());
  }

  @Hears(BUTTONS.common.prev)
  async onCoinPrev(@Ctx() ctx: Context) {
    await ctx.scene.enter(COIN_SCENE_ID);
  }

  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    const [coinName, coinAddress] = message.split(msgRegEx);
    const isAddress = isValidEthAddress(coinAddress);
    if (coinName.length > 1 && coinName.length < 10 && isAddress) {
      const isExist = await this.coinsService.getCoin({ address: coinAddress });
      if (!isExist) {
        await this.coinsService.createCoin({
          name: coinName,
          address: coinAddress,
        });
        await ctx.reply('✅Монета успешно добавлена!');
      } else {
        await ctx.reply('⛔Монета с таким адресом уже добавлена!');
      }
    } else {
      await ctx.reply('⛔Введите валидный адрес или название монеты!');
    }
  }
}
