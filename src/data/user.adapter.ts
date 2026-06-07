import  { User, type UserProps } from "../domain/entity/user";

export class UserAdapter {
  static toDomain(Dto: UserProps): User {
    return User.create(Dto);
  }

  static toDTO(user: User): UserProps {
    return {
      id: user.id,
      name: user.name,
      email: user.email.value,
      password: user.password.value,
    };
  }
}
