import { Scene, SceneEnter, SceneLeave, Command, Ctx } from 'nestjs-telegraf';
import { DELETE_CONTRACT_SCENE_ID } from 'src/app.constants';
import { Context } from 'src/interfaces/context.interface';
import { ContractsService } from '../../services/contracts.service';

@Scene(DELETE_CONTRACT_SCENE_ID)
export class DeleteContractScene {
  constructor(private readonly contractsService: ContractsService) {}

  @SceneEnter()
  async onSceneEnter(ctx: Context): Promise<void> {
    await ctx.replyWithHTML(
      'Введите название для своей команды:\n(<i>только буквы и цифры латинского алфавита</i>)',
    );
  }

  @SceneLeave()
  async onSceneLeave(@Ctx() ctx: Context) {
    console.log(`Leave from ${ctx.scene.session.current} scene`);
  }
}
