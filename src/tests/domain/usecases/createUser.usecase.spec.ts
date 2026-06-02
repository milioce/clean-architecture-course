import { describe, test, expect } from 'vitest';
import { CreateUserUseCase } from '../../../domain/usecases/createUser.usecase';
import { repositoryCreateUser, repositoryExistingEmail, repositoryFailedUserCreation } from './usecase.helper';
import { User } from '../../../domain/entity/user';

export const user1 = User.create({ id: 0, name: 'John Doe', email: 'carlos@gmail.com', password: 'password123' });
export const user2 = User.create({ id: 0, name: 'Jane Smith', email: 'carlos@gmail.com', password: 'password456' });


describe('CreateUserUseCase', () => {
  test('should create a new user', async () => {
    const userRepository = repositoryCreateUser(1);
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const userCreated = await createUserUseCase.execute(user1);

    expect(userCreated.id).toEqual(1);
    expect(userCreated.name).toEqual(user1.name);
    expect(userCreated.email.value).toEqual(user1.email.value);
    expect(userCreated.password.value).toEqual(user1.password.value);
  });

  test('should throw an error if email already exists', async () => {
    const userRepository = repositoryExistingEmail(user1);

    const createUserUseCase = new CreateUserUseCase(userRepository);

    await expect(createUserUseCase.execute(user2)).rejects.toThrow("Email already exists");
  });

  test('should throw an error if create user fails', async () => {
    const userRepository = repositoryFailedUserCreation();

    const createUserUseCase = new CreateUserUseCase(userRepository);

    await expect(createUserUseCase.execute(user2)).rejects.toThrow("An error occurred creating a user");
  });

});
