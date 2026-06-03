import { User } from "../domain/entity/user";
import type { UserView } from "./UserView";
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import * as compositionRoot from "../composition-root";
import type { UserPresenter } from "./UserPresenter";

export class UserTerminal implements UserView {
  private rl: readline.Interface;
  private presenter!: UserPresenter;

  constructor() {
    this.rl = readline.createInterface({ input, output });
    this.presenter = compositionRoot.createPresenter(this);
  }

  init() {
    this.presenter.onInit();

  }

  showMessage(message: string): void {
    console.log(`\n${message}`);
  }

  showError(message: string): void {
    console.error(`\nError: ${message}`);
  }

  async showMenu(): Promise<void> {
    console.log('\n=== MAIN MENU ===');
    console.log("1. Show all users");
    console.log("2. Create a new user");
    console.log("3. Exit");
    console.log('-----------------');

    const option = await this.rl.question('\nChoose an option (1-3): ');

    if (+option === 1) {
      await this.presenter.onSelectShowUser();
      return;
    }

    if (+option === 2) {
      await this.presenter.onSelectCreateUser();
      return;
    }

    if (+option === 3) {
      await this.presenter.onSelectExit();
      this.close();
      return;
    }

    console.clear();
    this.showMessage('Invalid option, try again.');
    return this.showMenu();

  }

  showAllUsers(users: User[]): void {
    console.clear();
    console.log('\n=== USER LIST ===');
    users.forEach(user => {
      console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email.value}`);
    });
  }

  async showFormCreateUser(): Promise<void> {
    const name = await this.rl.question('Nombre: ');
    const email = await this.rl.question('Email: ');
    const password = await this.rl.question('Password: ');

    await this.presenter.onSubmitUserForm(name, email, password);
  }

  close() {
    this.rl.close();
  }
}
