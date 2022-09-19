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
    await ctx.reply(
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
    await ctx.scene.enter(COIN_SCENE_ID);
  }

  @Hears(BUTTONS.contract.common)
  async onContractScene(@Ctx() ctx: Context) {
    await ctx.scene.enter(CONTRACT_SCENE_ID);
  }

  @Hears(commandRegExp)
  async onUseContractCommand(
    @Ctx() ctx: Context,
    @Message('text') message: string,
  ) {
    // const command = await this.
    console.log('test >>', message);
    const [slash, command] = message.split('/');
    if (command) {
      const contract = await this.contractsService.getContract({ command });
      if (contract) {
        // console.log('contract >>', contract);
        const contractAddress = contract.address;
        const coinAddress = contract.coin.address;

        console.log('contractAddress >>', contractAddress);
        console.log('coinAddress >>', coinAddress);
        const test = await this.tvlService.getTvl(contractAddress, coinAddress);
        // console.log('TVL >>', test);
      } else {
        await ctx.reply('🚨 Такая команда не задана!');
      }
    }
    // console.log('1 >>', slash);
    // console.log('2 >>', command);
  }
}
