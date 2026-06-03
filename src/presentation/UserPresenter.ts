import { User } from "../domain/entity/user";
import type { CreateUserUseCase } from "../domain/usecases/createUser.usecase";
import type { GetAllUsersUseCase } from "../domain/usecases/GetAllUsers.usecase";
import type { UserView } from "./UserView";

export class UserPresenter {
  constructor(
    private view: UserView,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private createUserUseCase?: CreateUserUseCase
  ) { }

  init() {
    this.initData();

    this.view.showWelcome();
    this.showAllUsers();
  }

  async showAllUsers() {
    const users = await this.getAllUsersUseCase.execute();

    if (users.length === 0) {
      this.showFormUser();
    } else {
      this.view.showAllUsers(users);
    }
  }

  showFormUser() {
    const user = this.view.showCreateUser();
    this.showAllUsers();
  }

  private initData() {
    const user1 = User.create({ id: 1, name: 'Emilio', email: 'emilio@gmail.com', password: 'password123' });
    const user2 = User.create({ id: 2, name: 'Carlos', email: 'carlos@gmail.com', password: 'password456' });
    const user3 = User.create({ id: 3, name: 'Ana', email: 'santiagoa@gmail.com', password: 'password789' });
    this.createUserUseCase?.execute(user1);
    this.createUserUseCase?.execute(user2);
  }



}
