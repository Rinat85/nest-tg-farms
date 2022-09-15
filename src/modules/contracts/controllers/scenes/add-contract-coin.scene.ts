import {
    Scene,
    SceneEnter,
    SceneLeave,
    Ctx,
    Hears,
    Action,
  } from 'nestjs-telegraf';
import {
    ADD_CONTRACT_COIN_SCENE_ID,
    ADD_CONTRACT_COMMAND_SCENE_ID,
    BUTTONS,
} from 'src/app.constants';
import { coinsButtons, renderKeyboard } from 'src/buttons/app.buttons';
import { Context } from 'src/interfaces/context.interface';
import { CoinsService } from 'src/modules/coins/services/coins.service';
import { UsersService } from 'src/modules/users/services/users.service';
import { ContractsService } from '../../services/contracts.service';
  
const addCoinRegExp = /^(?:add)\s\d+/;

@Scene(ADD_CONTRACT_COIN_SCENE_ID)
export class AddContractCoinScene {
    constructor(
        private readonly contractsService: ContractsService,
        private readonly coinsService: CoinsService,
        private readonly usersService: UsersService
    ) {}
  
    @SceneEnter()
    async onSceneEnter(ctx: Context): Promise<void> {
        await ctx.reply(
            'Выберите монету, которую необходимо отслеживать на контракте.',
            renderKeyboard(
                [
                    BUTTONS.common.prev,
                    BUTTONS.common.end,
                    BUTTONS.common.returnToMainMenu,
                ],
                2,
            ),
        );
        const coins = await this.coinsService.getCoins();
        if (!coins) {
            await ctx.reply('❗ Нет монет для добавления в контракт.');
        } else {
            await ctx.reply('💰 Список добавленных монет: 👇', coinsButtons('add', coins));
        }
    }
  
    @SceneLeave()
    async onSceneLeave(@Ctx() ctx: Context) {
      console.log(`Leave from ${ctx.scene.session.current} scene`);
    }
  
    @Hears(BUTTONS.common.prev)
    async onAddContractCommandPrev(@Ctx() ctx: Context) {
      await ctx.scene.enter(ADD_CONTRACT_COMMAND_SCENE_ID);
    }

    @Hears(BUTTONS.common.end)
    async onEndContractCreation(@Ctx() ctx: Context) {
        const user = await this.usersService.getUser({login: ctx.from.id});
        console.log(user);
        const contract = {...ctx.session.contract, userId: user};
        try {
            console.log('check this', contract);
            await this.contractsService.createContract(contract);
        } catch (error) {
            await ctx.reply(error);
        }
    }

    @Action(addCoinRegExp)
    async addCoinToContractCallbackHandler(@Ctx() ctx: Context) {
        const actionData = await ctx.callbackQuery.data;
        const coinId = actionData.split(' ')[1];
        const coin = await this.coinsService.getCoin({id: coinId});
        ctx.session.contract = { ...ctx.session.contract, coinId: coin };
        await ctx.reply('Монета сохранена! ✅');
        console.log(ctx.session.contract);
    }
  }
  