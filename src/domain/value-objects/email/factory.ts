import { EmailValidationError } from "./errors";
import type { Email } from "./types";

export class EmailFactory {
  static create(email: string): Email {
    const value = email as Email;
    EmailFactory.validate(value);

    return value;
  }

  static valid(email: Email): boolean {
    return email.includes("@");
  }

  static validate(email: Email) {
    if (!EmailFactory.valid(email)) {
      throw new EmailValidationError(email);
    }
  }
}
