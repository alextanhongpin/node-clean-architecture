import { EmailValidationError } from "./errors";
import type { Email } from "./types";

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
