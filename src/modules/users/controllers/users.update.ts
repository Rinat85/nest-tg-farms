import { Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { actionButtons } from 'src/buttons/app.buttons';
import { Context } from 'src/interfaces/context.interface';
import { Telegraf } from 'telegraf';
import { UsersService } from '../services/users.service';

@Update()
export class UsersUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly usersService: UsersService,
  ) {}

  @Start()
  async startCommand(@Ctx() ctx: Context) {
    ctx.session.type = 'add';
    const roles = await this.usersService.getUsers();
    console.log('ctx >>', ctx.from);
    await ctx.reply(`id: ${ctx.from.id}`);
    await ctx.reply(`username: ${ctx.from.username}`);
    await ctx.reply('Choose the action:', actionButtons());
  }
}
