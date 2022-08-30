import { Markup } from 'telegraf';

export function actionButtons() {
  return Markup.keyboard([['Добавить', 'Удалить']])
    .resize()
    .placeholder(`/add <Name> <contract_address>`);
}
