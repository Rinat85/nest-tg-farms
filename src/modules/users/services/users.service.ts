import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { UserEntity } from '../models/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>) {

    }

    async getUsers() {
        return this.userRepository.find();
    }
}
