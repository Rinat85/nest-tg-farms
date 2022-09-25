import {
  Command,
  Ctx,
  Hears,
  Start,
  Update,
} from 'nestjs-telegraf/dist/decorators';
import { Markup } from 'telegraf';
import { BUTTONS, START_SCENE_ID } from './app.constants';
// import { AppService } from './app.service';
import { Context } from './interfaces/context.interface';

@Update()
export class AppUpdate {
  // constructor(
  //   private readonly appService: AppService,
  // ) {}

  @Start()
  async startCommand(@Ctx() ctx: Context) {
    // ctx.session.type = 'add';
    await ctx.scene.enter(START_SCENE_ID);
  }

  @Command('stop')
  async stopBot(@Ctx() ctx: Context) {
    await ctx.telegram.sendMessage(
      ctx.chat.id,
      'Клавиатура удалена.',
      Markup.removeKeyboard(),
    );
  }

  @Hears(BUTTONS.common.returnToMainMenu)
  async onReturnToMainMenu(@Ctx() ctx: Context) {
    await ctx.scene.enter(START_SCENE_ID);
  }
}
