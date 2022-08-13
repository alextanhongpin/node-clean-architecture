import type { Email } from "domain/value-objects/email";
import type { PlaintextPassword } from "domain/value-objects/password";

export interface User {
  id: string;
  encryptedPassword: EncryptedPassword;
}
