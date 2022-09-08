import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'src/interfaces/user.interface';
import { Repository } from 'typeorm/repository/Repository';
import { UserEntity } from '../models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public getUsers(params?): Promise<IUser[]> {
    // const options = params ? {where: {...params}} : null;
    return this.userRepository.find({
      where: { ...params },
    });
  }

  public getUser(params): Promise<IUser> {
    return this.userRepository.findOneBy({ ...params });
  }

  public createUser(user: IUser): Promise<IUser> {
    const newUser = this.userRepository.create({ ...user });
    return this.userRepository.save(newUser);
  }
}
