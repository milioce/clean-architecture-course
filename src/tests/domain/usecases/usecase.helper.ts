import type { User } from "../../../domain/entity/user";

export const repositoryCreateUser = (id: number) => ({
  getAllUsers: () => Promise.resolve([]),
  createUser: () => Promise.resolve(id),
  getUserByEmail: () => Promise.resolve(null),
});

export const repositoryExistingEmail = (user: User) => ({
  getAllUsers: () => Promise.resolve([user]),
  createUser: () => Promise.resolve(0),
  getUserByEmail: () => Promise.resolve(user),
});

export const repositoryFailedUserCreation = () => ({
  getAllUsers: () => Promise.resolve([]),
  createUser: () => Promise.reject(new Error("Failed to create user")),
  getUserByEmail: () => Promise.resolve(null),
});


