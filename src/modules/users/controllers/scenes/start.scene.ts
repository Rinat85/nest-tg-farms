import {
  Scene,
  SceneEnter,
  SceneLeave,
  Ctx,
  Hears,
  Message,
} from 'nestjs-telegraf';

import {
  BUTTONS,
  COIN_SCENE_ID,
  CONTRACT_SCENE_ID,
  START_SCENE_ID,
} from 'src/app.constants';
import { renderKeyboard } from 'src/buttons/app.buttons';
import { Context } from 'src/interfaces/context.interface';
import { IUser } from 'src/interfaces/user.interface';
import { ContractsService } from 'src/modules/contracts/services/contracts.service';
import { commandRegExp } from 'src/utils/validation.util';
import { Markup } from 'telegraf';
import { TvlService } from '../../services/tvl.service';
// import { Message as MessageTelegraf } from 'telegraf/typings/core/types/typegram';
// import { Scenes } from 'telegraf';
import { UsersService } from '../../services/users.service';

// const { enter, leave } = Scenes.Stage;

@Scene(START_SCENE_ID)
export class StartScene {
  constructor(
    private readonly usersService: UsersService,
    private readonly contractsService: ContractsService,
    private readonly tvlService: TvlService,
  ) {}

  @SceneEnter()
  async onSceneEnter(ctx: Context): Promise<void> {
    let user: IUser = {
      login: ctx.from.id,
      username: ctx.from.username,
      firstName: ctx.from.first_name,
      lastName: ctx.from.last_name,
    };

    const isUserExist = await this.usersService.getUser(user);
    console.log('CHAT ID >>', ctx.chat.id);
    if (!isUserExist) {
      user = await this.usersService.createUser(user);
      await ctx.reply(`Welcome, ${user.username}!`);
    } else {
      user = await this.usersService.getUser(user.login);
      // const test = await this.usersService.getUsers();
      await ctx.reply(`Welcome back, ${user.username}!`);
      // await ctx.reply('Пользователь существует');
    }
    ctx.scene.session.state = { ...ctx.scene.session.state, user };
    await ctx.telegram.sendMessage(
      ctx.chat.id,
      'Выберите действие:',
      renderKeyboard([BUTTONS.coin.common, BUTTONS.contract.common], 2),
    );
  }

  @SceneLeave()
  async onSceneLeave(@Ctx() ctx: Context) {
    console.log(`Leave from ${ctx.scene.session.current} scene`);
    // return ctx.copyMessage(ctx.message.chat.id, actionButtons());
  }

  @Hears(BUTTONS.coin.common)
  async onCoinScene(@Ctx() ctx: Context) {
    await Markup.removeKeyboard();
    await ctx.scene.enter(COIN_SCENE_ID);
  }

  @Hears(BUTTONS.contract.common)
  async onContractScene(@Ctx() ctx: Context) {
    await Markup.removeKeyboard();
    await ctx.scene.enter(CONTRACT_SCENE_ID);
  }

  @Hears(commandRegExp)
  async onUseContractCommand(
    @Ctx() ctx: Context,
    @Message('text') message: string,
  ) {
    // const command = await this.
    // console.log('test >>', message);
    const [slash, command] = message.split('/');
    if (command === 'start') {
      await ctx.scene.enter(START_SCENE_ID);
    } else if (command === 'stop') {
      await ctx.telegram.sendMessage(
        ctx.chat.id,
        'Клавиатура удалена.',
        Markup.removeKeyboard(),
      );
    } else {
      const contract = await this.contractsService.getContract({ command });
      if (contract) {
        // console.log('contract >>', contract);
        const contractAddress = contract.address;
        const coinAddress = contract.coin?.address;

        // console.log('contractAddress >>', contractAddress);
        // console.log('coinAddress >>', coinAddress);
        if (coinAddress) {
          try {
            const response = await this.tvlService.getTvl(
              contractAddress,
              coinAddress,
            );
            const res = response.data.result;
            const allRes = res.slice(0, -16);
            const unit = allRes.slice(0, -2);
            const part = allRes.substr(-2, 2);
            // console.log(typeof res);
            const formatedData = `<b>${contract.coin.name.toLocaleUpperCase()}</b>: 🎯${unit},${part}`;
            await ctx.replyWithHTML(formatedData);
          } catch (error) {
            await ctx.reply('🚨 Ошибка сервера bscscan!');
          }
        } else {
          try {
            const response = await this.tvlService.getTvlWhereBnb(
              contractAddress,
            );
            const res = response.data.result;
            const allRes = res.slice(0, -16);
            const unit = allRes.slice(0, -2);
            const part = allRes.substr(-2, 2);
            // console.log(typeof res);
            const formatedData = `<b>BNB</b>: 🎯${unit},${part}`;
            await ctx.replyWithHTML(formatedData);
          } catch (error) {
            await ctx.reply('🚨 Ошибка сервера bscscan!');
          }
        }
      } else {
        await ctx.reply('🚨 Такая команда не задана!');
      }
    }
  }
}
