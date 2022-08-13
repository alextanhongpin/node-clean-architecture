import type { PlaintextPassword, EncryptedPassword } from "./types";
import { MIN_PASSWORD_LENGTH } from "./rules";
import {
  PasswordTooShortError,
  PasswordEncryptionError,
  PasswordVerifyError,
} from "./errors";
import argon2 from "argon2";

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
  static async create(password: PlaintextPassword): Promise<EncryptedPassword> {
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
  ): Promise<boolean> {
    try {
      await argon2.verify(encryptedPassword, password);

      return true;
    } catch (error) {
      throw new PasswordVerifyError({ cause: error as Error });
    }
  }
}
