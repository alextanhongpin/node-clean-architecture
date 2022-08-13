import type { Email } from "domain/value-objects/email";
import type {
  PlaintextPassword,
  EncryptedPassword,
} from "domain/value-objects/password";

export interface RegisterRequest {
  name: string;
  email: Email;
  password: PlaintextPassword;
}

export interface LoginRequest {
  email: Email;
  password: PlaintextPassword;
}
