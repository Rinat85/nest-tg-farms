import { Ctx, Hears, Update } from 'nestjs-telegraf';
import { BUTTONS, CREATE_CONTRACT_SCENE_ID } from 'src/app.constants';
import { Context } from 'src/interfaces/context.interface';
import { ContractsService } from '../services/contracts.service';

@Update()
export class ContractsUpdate {
  constructor(private readonly contractsService: ContractsService) {}

  @Hears(BUTTONS.contract.add)
  async createContract(@Ctx() ctx: Context) {
    await ctx.scene.enter(CREATE_CONTRACT_SCENE_ID);
  }
  
}
