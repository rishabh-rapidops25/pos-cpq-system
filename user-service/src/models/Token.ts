import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User'; // Adjust the path as necessary

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  token!: string;

  // @ManyToOne(() => User, (user) => user.tokens)
  // @JoinColumn({ name: 'userId' })
  // user!: User;
}
