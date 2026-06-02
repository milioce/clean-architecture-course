import { User } from '../entity/user';

export interface UserRepository {
  getAllUsers(): Promise<User[]>;
  createUser(user: User): Promise<number>;
  getUserByEmail(email: string): Promise<User | null>;
}
