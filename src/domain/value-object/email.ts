import { ValidationError } from "../core/validation-error";
import { ValueObject } from "../core/value-object";


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface EmailProps {
  readonly value: string;
}

export class Email extends ValueObject<EmailProps> {
  private constructor(value: string) {
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }

  public static create(value: string): Email {
    if (!emailRegex.test(value)) {
      throw new ValidationError("The email is not valid.");
    }

    return new Email(value);
  }
}
