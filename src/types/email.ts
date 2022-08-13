import type { Brand } from "types/brand";
import { ErrorKind, AppError } from "types/error";

export type Email = Brand<string, "EMAIL">;

export class EmailValidationError extends AppError {
  constructor(email: Email, ...args: any[]) {
    super(`email '${email}' is invalid`, ...args);
    this.kind = ErrorKind.BadInput;
    this.code = "email.badInput";
    this.params = {
      email,
    };
  }
}

export class EmailFactory {
  static create(email: string): Email {
    const value = email as Email;
    EmailFactory.validate(value);

    return value;
  }

  static validate(email: Email) {
    if (!email.includes("@")) {
      throw new EmailValidationError(email);
    }
  }
}
