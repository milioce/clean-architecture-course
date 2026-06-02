import { describe, test, expect } from 'vitest';
import { User } from '../../../domain/entity/user';

const validUser = { id: 1, name: 'Emilio Calejero', email: 'emilio@gmail.com', password: 'password123' };
const otherUser = { id: 2, name: 'Another User', email: 'another@gmail.com', password: 'anotherpassword123' };

describe('User', () => {
  test('should create a user with valid properties', () => {
    const user = User.create(validUser);

    expect(user.id).toBe(1);
    expect(user.name).toBe('Emilio Calejero');
    expect(user.email.value).toBe('emilio@gmail.com');
    expect(user.password.value).toBe('password123');
  });

  test('should throw an error if name is missing', () => {
    expect(() => User.create({ ...validUser, name: '' })).toThrow("The username is required");
  });

  test('should throw an error if email is missing', () => {
    expect(() => User.create({ ...validUser, email: '' })).toThrow("The user's email is required");
  });

  test('should throw an error if email is invalid', () => {
    expect(() => User.create({ ...validUser, email: 'invalid-email' })).toThrow("The email is not valid");
  });

  test('should throw an error if password is invalid', () => {
    expect(() => User.create({ ...validUser, password: 'short' })).toThrow("The password must have a minimum length of 8, and at least one letter and one number.");
  });

  test('should consider two users with the same id as equal', () => {
    const user1 = User.create({ ...validUser, id: 1 });
    const user2 = User.create({ ...otherUser, id: 1 });

    expect(user1.equals(user2)).toBe(true);
  });

});
