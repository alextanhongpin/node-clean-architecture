import type { Email } from "domain/value-objects/email";
import type { PlaintextPassword } from "domain/value-objects/password";

export interface RegisterRequest {
  name: string;
  email: Email;
  password: PlaintextPassword;
}

export interface LoginRequest {
  email: Email;
  password: PlaintextPassword;
}
