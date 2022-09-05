import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersUpdate } from './controllers/users.update';
import { UserEntity } from './models/user.entity';
import { RolesEntity } from './models/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RolesEntity])],
  providers: [UsersService, UsersUpdate]
})
export class UsersModule {}
