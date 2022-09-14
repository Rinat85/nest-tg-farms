import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { CoinEntity } from 'src/modules/coins/models/coin.entity';
import { UserEntity } from 'src/modules/users/models/user.entity';

@Entity({ name: 'Contracts' })
export class ContractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  address: string;

  @Column({ type: 'varchar', unique: true })
  command: string;

  @ManyToOne(() => CoinEntity, {
    createForeignKeyConstraints: false,
    lazy: true,
    nullable: true,
  })
  @JoinColumn({ name: 'coinId', referencedColumnName: 'id' })
  coin: CoinEntity;

  @ManyToOne(() => UserEntity, {
    createForeignKeyConstraints: false,
    lazy: true,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
