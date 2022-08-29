import { InjectBot } from 'nestjs-telegraf';
import { Start, Update } from 'nestjs-telegraf/dist/decorators';
import { Context, Telegraf } from 'telegraf';
import { AppService } from './app.service';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Hello my friend!!! 💵');
  }
}
