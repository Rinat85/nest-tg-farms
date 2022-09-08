import { Ctx, Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { actionButtons } from 'src/buttons/app.buttons';
import { Context } from 'src/interfaces/context.interface';
import { IUser } from 'src/interfaces/user.interface';
import { Markup, Telegraf } from 'telegraf';
import { UsersService } from '../services/users.service';

@Update()
export class UsersUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly usersService: UsersService,
  ) {}

  @Start()
  async startCommand(@Ctx() ctx: Context) {
    // ctx.session.type = 'add';
    const user: IUser = {
      login: ctx.from.id,
      username: ctx.from.username,
      firstName: ctx.from.first_name,
      lastName: ctx.from.last_name,
    };

    const isUserExist = await this.usersService.getUser(user);

    if (!isUserExist) {
      const newUser = await this.usersService.createUser(user);
      await ctx.reply(`Welcome, ${newUser.username}!`);
      await ctx.reply('Choose the action:', actionButtons());
    } else {
      const oldUser = await this.usersService.getUser(user.login);
      // const test = await this.usersService.getUsers();
      // console.log(test);
      await ctx.reply(`Welcome back, ${oldUser.username}!`);
      // await ctx.reply('Пользователь существует');
      await ctx.reply('Choose the action:', actionButtons());
    }
  }

  @Hears('❌ Удалить COIN')
  async deleteKeyboard(@Ctx() ctx: Context) {
    console.log('CLICKED');
    await ctx.reply('DEleted', Markup.removeKeyboard());
  }
}
