import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';
import { UserRole } from '../models/user-roles.type';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true, unique: true })
  userName: string;
  @Column({ nullable: true })
  surname: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
  @Column({ nullable: true })
  phone: string;
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}
