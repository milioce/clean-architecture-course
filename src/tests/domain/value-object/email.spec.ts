import { describe, test, expect } from 'vitest';
import { Email } from '../../../domain/value-object/email';

describe('Email', () => {
  test('should create an email with valid value', () => {
    const email = Email.create('emilio@gmail.com');
    expect(email.value).toBe('emilio@gmail.com');
  });

  test('should throw an error if email is not valid', () => {
    expect(() => Email.create('invalid-email')).toThrow('The email is not valid.');
  });

  test('should consider two emails with the same value as equal', () => {
    const email1 = Email.create('emilio@gmail.com');
    const email2 = Email.create('emilio@gmail.com');
    expect(email1.equals(email2)).toBe(true);
  });
});

