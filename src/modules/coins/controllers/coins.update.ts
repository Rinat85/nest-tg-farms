import { Ctx, Hears, InjectBot, Message, On, Update } from 'nestjs-telegraf';
import { Context } from 'src/interfaces/context.interface';
import { Markup, Telegraf } from 'telegraf';
import { CoinsService } from '../services/coins.service';

@Update()
export class CoinsUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly coinsService: CoinsService,
  ) {}

  //   @Start()
  //   async startCommand(@Ctx() ctx: Context) {
  //     // ctx.session.type = 'add';
  //     const user: IUser = {
  //       login: ctx.from.id,
  //       username: ctx.from.username,
  //       firstName: ctx.from.first_name,
  //       lastName: ctx.from.last_name,
  //     };

  //     const isUserExist = await this.usersService.getUser(user);

  //     if (!isUserExist) {
  //       const newUser = await this.usersService.createUser(user);
  //       await ctx.reply(`Welcome, ${newUser.username}!`);
  //       await ctx.reply('Choose the action:', actionButtons());
  //     } else {
  //       const oldUser = await this.usersService.getUser(user.login);
  //       await ctx.reply(`Welcome back, ${oldUser.username}!`);
  //       // await ctx.reply('Пользователь существует');
  //       await ctx.reply('Choose the action:', actionButtons());
  //     }
  //   }

  @Hears('💰 Добавить COIN')
  async createCoin(@Ctx() ctx: Context) {
    ctx.session.type = 'addCoin';
    // console.log('CLICKED');
    await ctx.replyWithHTML(
      'Введите данные в формате: \n <i>&#60;название&#62; &#60;адрес_монеты&#62;</i>',
    );
  }

  //   @Hears('❌ Удалить COIN')
  //   async deleteKeyboard(@Ctx() ctx: Context) {
  //     console.log('CLICKED');
  //     await ctx.reply('DEleted', Markup.removeKeyboard());
  //   }

  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    if (!ctx.session.type) return;

    if (ctx.session.type === 'addCoin') {
      const msgRegEx = /\s+/;
      const [coinName, coinAddress] = message.split(msgRegEx);
      const addrRegEx = /^0x[a-fA-F0-9]{40}$/g;
      const isAddress = addrRegEx.test(coinAddress);
      if (coinName.length > 10 && isAddress) {
        console.log(coinName, coinAddress);
      }
    }
  }
}
