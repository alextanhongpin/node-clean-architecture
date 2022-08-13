import type { Email } from "./types";
import { EmailValidationError } from "./errors";

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
