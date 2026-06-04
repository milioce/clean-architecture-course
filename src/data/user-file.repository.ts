

import * as fs from 'fs/promises';
import * as path from 'path';
import type { User, UserProps } from '../domain/entity/user';
import type { UserRepository } from '../domain/repository/user.repository';
import { UserAdapter } from './user.adapter';

export class UserFileRepository implements UserRepository {
  private users: User[] = [];
  private lastId: number = 0;
  private readonly filePath = path.join(process.cwd(), 'users.json');

  constructor() {
    this.init();
  }

  async getAllUsers(): Promise<User[]> {
    this.users = await this.loadUsers();
    return this.users;
  }

  async createUser(user: User): Promise<number> {
    user.id = ++this.lastId;
    this.users.push(user);
    await this.writeFile(this.users);
    return user.id;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email.value === email);
    return user || null;
  }

  private async init(): Promise<void> {
    this.users = await this.loadUsers();
    this.lastId = this.users.reduce((max, user) => (user.id > max ? user.id : max), 0);
  }

  private async loadUsers(): Promise<User[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const userProps = JSON.parse(data) as UserProps[];
      return userProps.map(UserAdapter.toDomain);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  private async writeFile(users: User[]): Promise<void> {
    const userDTOs = users.map(UserAdapter.toDTO);
    await fs.writeFile(this.filePath, JSON.stringify(userDTOs, null, 2), 'utf-8');
  }
}
