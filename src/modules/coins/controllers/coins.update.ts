import {
  Action,
  Ctx,
  Hears,
  Message,
  On,
  Update,
} from 'nestjs-telegraf';
import { Context } from 'src/interfaces/context.interface';

import { isValidEthAddress } from 'src/utils/blockchainAddressValidation.util';
import { CoinsService } from '../services/coins.service';
import { coinsButtons } from 'src/buttons/app.buttons';
import { BUTTONS } from 'src/app.constants';

const deleteCoinRegExp = /^(?:delete)\s\d+/;
@Update()
export class CoinsUpdate {
  constructor(
    private readonly coinsService: CoinsService,
  ) {}

  // @Hears(BUTTONS.coin.add)
  // async createCoin(@Ctx() ctx: Context) {
  //   ctx.session.type = 'addCoin';
  //   await ctx.replyWithHTML(
  //     'Введите данные в формате: \n <i>&#60;название&#62; &#60;адрес_монеты&#62;</i>',
  //   );
  // }

  // @Hears(BUTTONS.coin.delete)
  // async deleteCoin(@Ctx() ctx: Context) {
  //   await ctx.deleteMessage();
  //   ctx.session.type = 'deleteCoin';
  //   const coins = await this.coinsService.getCoins();
  //   if (!coins) {
  //     await ctx.reply('Нет монет для удаления.');
  //   } else {
  //     await ctx.reply('Выберите монету для удаления:', coinsButtons(coins));
  //   }
  // }

  // @On('text')
  // async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
  //   if (!ctx.session.type) return;

  //   if (ctx.session.type === 'addCoin') {
  //     const msgRegEx = /\s+/;
  //     const [coinName, coinAddress] = message.split(msgRegEx);
  //     const isAddress = isValidEthAddress(coinAddress);
  //     if (coinName.length > 1 && coinName.length < 10 && isAddress) {
  //       await this.coinsService.createCoin({
  //         name: coinName,
  //         address: coinAddress,
  //       });
  //       ctx.reply('✅Монета успешно добавлена!');
  //       ctx.session.type = 'done';
  //     } else {
  //       ctx.reply('Введите верный адрес или название монеты!');
  //     }
  //   }
  // }

  // @Action(deleteCoinRegExp)
  // async deleteCoinCallbackHandler(@Ctx() ctx: Context) {
  //   if (ctx.session.type === 'deleteCoin') {
  //     await ctx.deleteMessage();
  //     const actionData = await ctx.callbackQuery.data;
  //     const [_, coinId] = actionData.split(' ');
  //     await this.coinsService.deleteCoin(Number(coinId));
  //     await ctx.reply('✅Монета успешно удалена!');
  //     ctx.session.type = 'done';
  //   }
  // }
}
