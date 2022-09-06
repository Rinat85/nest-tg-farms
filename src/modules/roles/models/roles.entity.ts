import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Roles' })
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  role: string;
}
