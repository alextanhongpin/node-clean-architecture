import argon2 from "argon2";

import {
  PasswordEncryptionError,
  PasswordTooShortError,
  PasswordVerifyError,
} from "./errors";
import { MIN_PASSWORD_LENGTH } from "./rules";
import type { EncryptedPassword, PlaintextPassword } from "./types";

export class PlaintextPasswordFactory {
  static create(password: string): PlaintextPassword {
    const value = password as PlaintextPassword;
    PlaintextPasswordFactory.validate(value);

    return value;
  }

  static validate(password: PlaintextPassword) {
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new PasswordTooShortError(password);
    }
  }
}

export class EncryptedPasswordFactory {
  static async encrypt(
    password: PlaintextPassword
  ): Promise<EncryptedPassword> {
    PlaintextPasswordFactory.validate(password);

    try {
      const encryptedPassword = argon2.hash(password);
      return encryptedPassword as unknown as EncryptedPassword;
    } catch (error) {
      throw new PasswordEncryptionError({ cause: error as Error });
    }
  }

  static async verify(
    encryptedPassword: EncryptedPassword,
    password: PlaintextPassword
  ) {
    try {
      const match = await argon2.verify(encryptedPassword, password);
      if (!match) {
        throw new Error("password do not match");
      }
    } catch (error) {
      throw new PasswordVerifyError({ cause: error as Error });
    }
  }
}
