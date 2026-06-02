import { describe, test, expect } from 'vitest';
import { User } from '../../domain/entity/user';
import { UserInMemoryRepository } from '../../data/user-Inmemory.repository';

const user1 = User.create({ id: 0, name: 'John Doe', email: 'john.doe@gmail.com', password: 'password123' });
const user2 = User.create({ id: 0, name: 'Jane Smith', email: 'jane.smith@gmail.com', password: 'password456' });

describe('GetAllUsersUseCase', () => {

  test('getAllUsers should return an empty array if no users have been created', async () => {
    const userRepository = new UserInMemoryRepository();

    const result = await userRepository.getAllUsers();

    expect(result).toEqual([]);
  });


  test('getAllUsers should return all created users', async () => {
    const userRepository = new UserInMemoryRepository();
    await userRepository.createUser(user1);
    await userRepository.createUser(user2);

    const result = await userRepository.getAllUsers();
    expect(result).toEqual([user1, user2]);
  });

  test('getUserByEmail should return the user with the given email', async () => {
    const userRepository = new UserInMemoryRepository();
    await userRepository.createUser(user1);

    const result = await userRepository.getUserByEmail(user1.email.value);

    expect(result).toEqual(user1);
  });

  test('getUserByEmail should return null if no user with the given email exists', async () => {
    const userRepository = new UserInMemoryRepository();
    const result = await userRepository.getUserByEmail('non.existent@gmail.com');
    expect(result).toBeNull();
  });

  test('createUser should assign a unique id to each created user', async () => {
    const userRepository = new UserInMemoryRepository();

    const id1 = await userRepository.createUser(user1);
    const id2 = await userRepository.createUser(user2);

    expect(id1).toBe(1);
    expect(id2).toBe(2);
  });


});
