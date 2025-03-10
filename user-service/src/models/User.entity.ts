import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';
// import { Token } from './Token';

@Entity()
@Index('IDX_USER_EMAIL', ['email']) // Add index to the email column for faster lookups
export class User {
  // @PrimaryGeneratedColumn("uuid")
  // id!: string;
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Length(1, 100)
  firstName!: string;

  @Column()
  @Length(1, 100)
  lastName!: string;

  @Column({ unique: true })
  @IsEmail()
  @Length(1, 255)
  email!: string;

  @Column()
  @Length(6, 255)
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @Column({ type: 'boolean', default: true }) // Explicitly specify type
  isActive: boolean = true;
  // @OneToMany(() => Token, (token) => token.user)
  // tokens!: Token[];
}
