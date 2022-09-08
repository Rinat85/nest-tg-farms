import { Update } from 'nestjs-telegraf';
import { ContractsService } from '../services/contracts.service';

@Update()
export class ContractsUpdate {
  constructor(private readonly contractsService: ContractsService) {}
}
