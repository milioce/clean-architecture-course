import { User } from "../domain/entity/user";
import type { UserView } from "./UserView";
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export class UserTerminal implements UserView {
  rl: any;
  constructor() {
    this.rl = readline.createInterface({ input, output });
  }

  showWelcome(): void {
    console.log("Welcome to the Kata Users!");
  }

  showAllUsers(users: User[]): void {
    users.forEach(user => {
      console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email.value}`);
    });
  }

  async showCreateUser(): Promise<User> {
    /*
    const name = await this.rl.question('Nombre: ');

    const email = await this.rl.question('Email: ');

    const password = await this.rl.question('Password: ');

    const user = User.create({ id: 0, name, email, password });

    return user;
    */
  }
}
