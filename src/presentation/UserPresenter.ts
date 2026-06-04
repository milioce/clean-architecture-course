import { ValidationError } from "../domain/core/validation-error";
import { User } from "../domain/entity/user";
import type { CreateUserUseCase } from "../domain/usecases/createUser.usecase";
import type { GetAllUsersUseCase } from "../domain/usecases/GetAllUsers.usecase";
import type { UserView } from "./UserView";

export class UserPresenter {
  constructor(
    private view: UserView,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private createUserUseCase: CreateUserUseCase
  ) { }

  public async onInit() {
    this.view.showMessage('Welcome to the Kata Users!');
    await this.showMenu();
  }

  public async onSelectShowUser() {
    await this.showAllUsers();
    await this.showMenu();
  }

  public async onSelectCreateUser() {
    await this.showFormUser();
  }

  public async onSubmitUserForm(name: string, email: string, password: string) {
    await this.saveUser(name, email, password);
    await this.showMenu();
  }

  public async onSelectExit() {
    this.view.showMessage('The session is closed, see you soon!');
  }


  private async showMenu() {
    await this.view.showMenu();
  }


  private async showAllUsers(): Promise<void> {
    const users = await this.getAllUsersUseCase.execute();
    if (users.length === 0) {
      this.view.showMessage('There is no user');
      return;
    }

    await this.view.showAllUsers(users);
  }

  private async showFormUser(): Promise<void> {
    await this.view.showFormCreateUser();
  }

  private async saveUser(name: string, email: string, password: string) {
    try {
      const user = User.create({ id: 0, name, email, password });
      await this.createUserUseCase.execute(user);
      this.view.showMessage(`The user has been created`);

    } catch (err) {
      if (err instanceof ValidationError) {
        this.view.showError(err.message);
      } else {
        this.view.showError(`Unknown error`);
      }
    }
  }

}
