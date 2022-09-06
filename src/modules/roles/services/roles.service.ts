import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { RolesEntity } from '../models/roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
  ) {}

  public getRoles(): Promise<RolesEntity[]> {
    return this.rolesRepository.find();
  }
}
