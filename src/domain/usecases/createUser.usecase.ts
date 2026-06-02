import type { UserRepository } from "../repository/user.repository";
import type { User } from "../entity/user";
import { ValidationError } from "../core/validation-error";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(user: User): Promise<User> {
    const userEmail = await this.userRepository.getUserByEmail(user.email.value);

    if (userEmail) {
      throw new ValidationError("Email already exists");
    }

    try {
      const id = await this.userRepository.createUser(user);
      user.id = id;
      return user;
    } catch (error) {

      throw new ValidationError("An error occurred creating a user");
    }

  }
}


