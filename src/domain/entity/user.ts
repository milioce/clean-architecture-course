import { Email } from "../value-object/email";
import { Entity, type EntityData } from "../core/entity";
import { ValidationError } from "../core/validation-error";
import { Password } from "../value-object/password";

type Username = string;

export interface UserData extends EntityData {
  id: number;
  name: Username;
  email: Email;
  password: Password;
}

export interface UserProps {
  id: number;
  name: string;
  email: string;
  password: string;
}

export class User extends Entity implements UserData {
  name: Username;
  email: Email;
  password: Password;

  constructor(props: UserData) {
    super(props.id);

    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }

  static create(props: UserProps): User {
    User.validateProps(props);

    const password = Password.create(props.password);
    const email = Email.create(props.email);
    return new User({ ...props, password, email });
  }

  static validateProps(props: UserProps): void {
    if (!props.name) {
      throw new ValidationError("The username is required");
    }

    if (!props.email) {
      throw new ValidationError("The user's email is required");
    }
  }

}
