import { describe, test, expect } from 'vitest';
import { User } from '../../../domain/entity/user';
import { GetAllUsersUseCase } from '../../../domain/usecases/GetAllUsers.usecase';

const user1 = User.create({ id: 0, name: 'John Doe', email: 'john.doe@gmail.com', password: 'password123' });
const user2 = User.create({ id: 0, name: 'Jane Smith', email: 'jane.smith@gmail.com', password: 'password456' });

describe('GetAllUsersUseCase', () => {
  test('should Get all users', async () => {
    const userRepository = {
      getAllUsers: () => Promise.resolve([user1, user2]),
      createUser: () => Promise.resolve(0),
      getUserByEmail: () => Promise.resolve(null),
    };
    const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);

    const result = await getAllUsersUseCase.execute();

    expect(result).toEqual([user1, user2]);
  });

});
