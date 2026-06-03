import type { UserView } from "./presentation/UserView";
import { UserPresenter } from "./presentation/UserPresenter";
import { GetAllUsersUseCase } from "./domain/usecases/GetAllUsers.usecase";
import { CreateUserUseCase } from "./domain/usecases/createUser.usecase";
import { UserInMemoryRepository } from "./data/user-Inmemory.repository";


export function createPresenter(view: UserView) {
  const repository = new UserInMemoryRepository();
  const getAllUsersUseCase = new GetAllUsersUseCase(repository);
  const createUserUseCase = new CreateUserUseCase(repository);

  return new UserPresenter(view, getAllUsersUseCase, createUserUseCase);
}


