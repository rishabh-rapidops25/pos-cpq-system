export interface IUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isActive?: boolean;
}
