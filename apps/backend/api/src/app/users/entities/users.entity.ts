import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  userName: string;
  @Column({ nullable: true })
  surname: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  phone: string;
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}
