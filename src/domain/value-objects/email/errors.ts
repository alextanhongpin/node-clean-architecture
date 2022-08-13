import type { Email } from "./types";
import { ErrorKind, AppError } from "types/error";

export class EmailError<T> extends AppError<T> {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.kind = ErrorKind.Unknown;
    this.code = "email.unknown";
  }
}

export class EmailValidationError extends EmailError<{ email: string }> {
  constructor(email: Email, options?: ErrorOptions) {
    super(`Email format is invalid: '${email}'`, options);
    this.kind = ErrorKind.BadInput;
    this.code = "email.badInput";
    this.params = {
      email,
    };
  }
}
