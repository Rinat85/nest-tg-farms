import { Scene, SceneEnter, SceneLeave, Ctx, Hears } from 'nestjs-telegraf';
import { BUTTONS, COIN_SCENE_ID, START_SCENE_ID } from 'src/app.constants';
import { renderKeyboard } from 'src/buttons/app.buttons';
import { Context } from 'src/interfaces/context.interface';
import { IUser } from 'src/interfaces/user.interface';
// import { Scenes } from 'telegraf';
import { UsersService } from '../../services/users.service';

// const { enter, leave } = Scenes.Stage;

@Scene(START_SCENE_ID)
export class StartScene {
    constructor(private readonly usersService: UsersService) {}

  @SceneEnter()
  async onSceneEnter(ctx: Context): Promise<void> {
      ctx.scene.session.state = {};
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
      ctx.scene.session.state = {user};
      await ctx.reply('Выберите действие:', renderKeyboard([BUTTONS.coin.common, BUTTONS.contract.common], 2));
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

}