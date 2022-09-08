import { UserRole } from 'src/interfaces/database.interface';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { RolesEntity } from 'src/modules/roles/models/roles.entity';

@Entity({ name: 'Users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int8', unique: true })
  login: number;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  // @ManyToOne(() => RolesEntity, {
  //   createForeignKeyConstraints: false,
  //   lazy: true,
  // })
  // @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
  // role: RolesEntity;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
