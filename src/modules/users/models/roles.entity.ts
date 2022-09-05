import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({name: 'Roles',})
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', unique: true})
  role: string;

  @OneToMany(() => UserEntity, users => users.role)
  users: UserEntity[];
}