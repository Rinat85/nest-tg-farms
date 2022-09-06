import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { RolesEntity } from 'src/modules/roles/models/roles.entity';

@Entity({ name: 'Users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  login: string;

  @Column({ type: 'varchar', nullable: true })
  username: string;

  @ManyToOne(() => RolesEntity, {
    createForeignKeyConstraints: false,
    lazy: true,
  })
  @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
  role: RolesEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
