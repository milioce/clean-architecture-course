import { UserTerminal } from "./presentation/UserTerminal";
import { UserPresenter } from "./presentation/UserPresenter";
import { GetAllUsersUseCase } from "./domain/usecases/GetAllUsers.usecase";
import { CreateUserUseCase } from "./domain/usecases/createUser.usecase";
import { UserInMemoryRepository } from "./data/user-Inmemory.repository";

export class CompositionRoot {
  static repository: UserInMemoryRepository;

  static createRepository() {
    if (!CompositionRoot.repository) {
      CompositionRoot.repository = new UserInMemoryRepository();
    }

    return CompositionRoot.repository;
  }

  static createUserTerminalView(): UserTerminal {
    return new UserTerminal();
  }

  static createGetAllUsersUseCase(): GetAllUsersUseCase {
    const repository = CompositionRoot.createRepository();
    return new GetAllUsersUseCase(repository);
  }

  static createCreateUserUseCase(): CreateUserUseCase {
    const repository = CompositionRoot.createRepository();
    return new CreateUserUseCase(repository);
  }

  static createUserPresenter(): UserPresenter {
    const view = CompositionRoot.createUserTerminalView();
    const getAllUsersUseCase = CompositionRoot.createGetAllUsersUseCase();
    const createUserUseCase = CompositionRoot.createCreateUserUseCase();
    return new UserPresenter(view, getAllUsersUseCase, createUserUseCase);
  }
}
