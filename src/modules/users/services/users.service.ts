import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/modules/roles/services/roles.service';
import { Repository } from 'typeorm/repository/Repository';
import { UserEntity } from '../models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(RolesService)
    private readonly rolesService: RolesService,
  ) {}

  public getUsers() {
    return this.rolesService.getRoles();
    // return this.userRepository.find();
  }
}
