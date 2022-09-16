import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
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

  @ManyToOne(() => CoinEntity, coin => coin.id, {
    // createForeignKeyConstraints: false,
    // lazy: true,
    nullable: true,
    cascade: true,
    eager: true,
    onDelete: 'SET NULL'
  })
  @JoinColumn({
    name: 'coin',
  })
  coin: CoinEntity;

  @ManyToOne(() => UserEntity, user => user.id, {
    // createForeignKeyConstraints: false,
    // lazy: true,
    cascade: true,
    // eager: true,
    onDelete: 'SET NULL'
  })
  @JoinColumn({ 
    name: 'user'
  })
  user: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
