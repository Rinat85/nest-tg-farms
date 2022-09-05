import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { actionButtons } from 'src/buttons/app.buttons';
import { Context, Telegraf } from 'telegraf';
import { UsersService } from '../services/users.service';

@Update()
export class UsersUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>, private readonly usersService: UsersService) {}

  @Start()
  async startCommand(ctx: Context) {
    console.log('ctx >>', ctx.from);
    await ctx.reply(`id: ${ctx.from.id}`);
    await ctx.reply(`username: ${ctx.from.username}`);
    await ctx.reply('Choose the action:', actionButtons());
  }
}
