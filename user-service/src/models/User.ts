import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { IsEmail, Length } from "class-validator";

@Entity()
@Index("IDX_USER_EMAIL", ["email"]) // Add index to the email column for faster lookups
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Length(1, 100) // Ensure first name has a reasonable length
  firstName!: string;

  @Column()
  @Length(1, 100) // Ensure last name has a reasonable length
  lastName!: string;

  @Column({ unique: true })
  @IsEmail() // Validate that email is in a correct format
  @Length(1, 255) // Ensure email has a reasonable length
  email!: string;

  @Column()
  @Length(6, 255) // Enforce minimum password length for security
  password!: string;

  @CreateDateColumn() // Automatically generated, timestamp for creation date
  createdAt!: Date;

  @UpdateDateColumn() // Automatically generated, timestamp for update date
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true }) // For soft deletes
  deletedAt?: Date;

  @Column({ default: true })
  isActive: boolean = true; // Set default value for the active status
}
