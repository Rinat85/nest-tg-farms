import { ICoin } from 'src/interfaces/coin.interface';
import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export function actionButtons() {
  return Markup.keyboard([
    ['💰 Добавить COIN', '❌ Удалить COIN'],
    ['📰 Добавить CONTRACT', '❌ Удалить CONTRACT'],
  ]).resize();
  // .placeholder(`/add <Name> <contract_address>`);
}

export function coinsButtons(
  coins: ICoin[],
): Markup.Markup<InlineKeyboardMarkup> {
  const row = coins.map((coin) =>
    Markup.button.callback(coin.name, `delete ${coin.id.toString()}`),
  );
  return Markup.inlineKeyboard(row, { columns: 3 });
}
