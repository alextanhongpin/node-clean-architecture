import { AppError,ErrorKind } from "types/error";

import { MIN_PASSWORD_LENGTH } from "./rules";
import type { PlaintextPassword } from "./types";

export class PasswordError<T> extends AppError<T> {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.kind = ErrorKind.Unknown;
    this.code = "password.unknown";
  }
}

export class PasswordTooShortError extends PasswordError<void> {
  constructor(password: PlaintextPassword, options?: ErrorOptions) {
    super(
      `Password needs to be at least ${MIN_PASSWORD_LENGTH} characters long. Your password is only ${password.length} characters long.`,
      options
    );
    this.kind = ErrorKind.BadInput;
    this.code = "password.too_short";
  }
}

export class PasswordEncryptionError extends PasswordError<void> {
  constructor(options?: ErrorOptions) {
    super("Password encryption failed", options);
    this.kind = ErrorKind.Internal;
    this.code = "password.encryption_failed";
  }
}

export class PasswordVerifyError extends PasswordError<void> {
  constructor(options?: ErrorOptions) {
    super("The email or password you entered is incorrect", options);
    this.kind = ErrorKind.Internal;
    this.code = "password.verify_failed";
  }
}
