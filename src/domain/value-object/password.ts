import { ValidationError } from "../core/validation-error";
import { ValueObject } from "../core/value-object";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export interface PasswordProps {
  readonly value: string;
}

export class Password extends ValueObject<PasswordProps> {
  private constructor(value: string) {
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }

  public static create(value: string): Password {
    if (!passwordRegex.test(value)) {
      throw new ValidationError("The password must have a minimum length of 8, and at least one letter and one number.");
    }

    return new Password(value);
  }
}
