import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UserEntity } from './models/user.entity';
import { StartScene } from './controllers/scenes/start.scene';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, StartScene],
  exports: [UsersService]
})
export class UsersModule {}
