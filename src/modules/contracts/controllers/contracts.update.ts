import { Ctx, Hears, Update } from 'nestjs-telegraf';
import { Context } from 'src/interfaces/context.interface';
import { ContractsService } from '../services/contracts.service';

@Update()
export class ContractsUpdate {
  constructor(private readonly contractsService: ContractsService) {}

  @Hears('📰 Добавить CONTRACT')
  async createContract(@Ctx() ctx: Context) {
    ctx.session.type = 'addContract';
    await ctx.replyWithHTML(
      'Введите данные в формате: \n <i>&#60;название&#62; &#60;адрес_монеты&#62;</i>',
    );
  }
  
}
