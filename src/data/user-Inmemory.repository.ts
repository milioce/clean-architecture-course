import type { User } from "../domain/entity/user";
import type { UserRepository } from "../domain/repository/user.repository";

export class UserInMemoryRepository implements UserRepository {
  private users: User[] = [];
  private lastId: number = 0;

  getAllUsers(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  createUser(user: User): Promise<number> {
    user.id = ++this.lastId;
    this.users.push(user);

    return Promise.resolve(user.id);
  }

  getUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email.value === email);
    return Promise.resolve(user || null);
  }
}
