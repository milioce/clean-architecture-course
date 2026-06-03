import type { User } from "../domain/entity/user";

export interface UserView {
  showWelcome(): void;
  showAllUsers(User: User[]): void;
  showCreateUser(): void;
}
