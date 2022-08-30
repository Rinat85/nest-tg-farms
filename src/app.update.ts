import { InjectBot } from 'nestjs-telegraf';
import { Hears, Start, Update } from 'nestjs-telegraf/dist/decorators';
import { Telegraf } from 'telegraf';
import { AppService } from './app.service';
import { actionButtons } from './buttons/app.buttons';
import { Context } from './interfaces/context.interface';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Hi Friend!');
    await ctx.reply('Choose the action:', actionButtons());
  }

  @Hears(['Добавить'])
  async addToDb(ctx: Context) {
    await ctx.reply('Hello!');
  }
}
