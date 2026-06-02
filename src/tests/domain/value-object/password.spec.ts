import { describe, test, expect } from 'vitest';
import { Password } from '../../../domain/value-object/password';

describe('Password', () => {
  test('should create a password with valid value', () => {
    const password = Password.create('validPassword1');
    expect(password.value).toBe('validPassword1');
  });

  test('should throw an error if password is less than 8 characters', () => {
    expect(() => Password.create('short')).toThrow('The password must have a minimum length of 8, and at least one letter and one number.');
  });

  test('should throw an error if password does not contain a letter', () => {
    expect(() => Password.create('12345678')).toThrow('The password must have a minimum length of 8, and at least one letter and one number.');
  });

  test('should throw an error if password does not contain a number', () => {
    expect(() => Password.create('password')).toThrow('The password must have a minimum length of 8, and at least one letter and one number.');
  });

  test('should consider two passwords with the same value as equal', () => {
    const password1 = Password.create('validPassword1');
    const password2 = Password.create('validPassword1');
    expect(password1.equals(password2)).toBe(true);
  });
});
