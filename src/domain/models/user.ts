import type { EncryptedPassword } from "domain/value-objects/password";

export interface User {
  id: string;
  encryptedPassword: EncryptedPassword;
}
