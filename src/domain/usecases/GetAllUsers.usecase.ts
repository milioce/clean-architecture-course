import type { UserRepository } from "../repository/user.repository";
import type { User } from "../entity/user";

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }
}
