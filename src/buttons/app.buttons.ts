import { Markup } from 'telegraf';

export function actionButtons() {
  return Markup.keyboard([
    ['💰 Добавить COIN', '❌ Удалить COIN'],
    ['📰 Добавить CONTRACT', '❌ Удалить CONTRACT'],
  ])
    .resize()
    .placeholder(`/add <Name> <contract_address>`);
}
