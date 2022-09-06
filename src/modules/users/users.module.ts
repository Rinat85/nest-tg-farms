import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersUpdate } from './controllers/users.update';
import { UserEntity } from './models/user.entity';
import { RolesModule } from 'src/modules/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RolesModule],
  providers: [UsersService, UsersUpdate],
})
export class UsersModule {}
