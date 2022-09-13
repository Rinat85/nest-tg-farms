import { Scene, SceneEnter, SceneLeave, Command, Ctx } from 'nestjs-telegraf';
import { CREATE_CONTRACT_SCENE_ID } from 'src/app.constants';
import { homeButtons } from 'src/buttons/app.buttons';
import { Context } from 'src/interfaces/context.interface';
import { Scenes } from 'telegraf';

const { enter, leave } = Scenes.Stage;

@Scene(CREATE_CONTRACT_SCENE_ID)
export class CreateContractScene {
  @SceneEnter()
  async onSceneEnter(ctx: Context): Promise<void> {
      ctx.scene.session.state = {};
    await ctx.replyWithHTML('Введите название для своей команды:\n(<i>только буквы и цифры латинского алфавита</i>)');
    
  }

  @SceneLeave()
  async onSceneLeave(@Ctx() ctx: Context) {
    console.log('Leave from scene');
    return ctx.copyMessage(ctx.message.chat.id, homeButtons());
  }

  

  @Command('back')
  async onLeaveCommand(@Ctx() ctx: Context): Promise<void> {
    await leave();
  }
}