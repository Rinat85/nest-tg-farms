import { BUTTONS } from 'src/app.constants';
import { ICoin } from 'src/interfaces/coin.interface';
import { Markup } from 'telegraf';
import {
  InlineKeyboardMarkup,
  ReplyKeyboardMarkup,
} from 'telegraf/typings/core/types/typegram';
import * as _ from 'lodash';
import { IContract } from 'src/interfaces/contract.interface';

export function homeButtons() {
  return Markup.keyboard([
    [BUTTONS.coin.common, BUTTONS.contract.common],
  ]).resize();
  // .placeholder(`/add <Name> <contract_address>`);
}

export function coinsButtons(
  action: string,
  coins: ICoin[],
): Markup.Markup<InlineKeyboardMarkup> {
  const row = coins.map((coin) =>
    Markup.button.callback(coin.name, `${action} ${coin.id.toString()}`),
  );
  return Markup.inlineKeyboard(row, { columns: 3 });
}

export function contractsButtons(
  action: string,
  contracts: IContract[],
): Markup.Markup<InlineKeyboardMarkup> {
  const row = contracts.map((contract) =>
    Markup.button.callback(
      contract.command,
      `${action} ${contract.id.toString()}`,
    ),
  );
  return Markup.inlineKeyboard(row, { columns: 3 });
}

export function renderKeyboard(
  keyboard: string[],
  columns: number,
): Markup.Markup<ReplyKeyboardMarkup> {
  const row = _.chunk(keyboard, columns);
  return Markup.keyboard(row).resize();
}
