import type { User } from "../domain/entity/user";

export interface UserView {
  showMenu(): Promise<void>;
  showMessage(message: string): void;
  showError(message: string): void;
  showAllUsers(User: User[]): void;
  showFormCreateUser(): Promise<void>;
}
