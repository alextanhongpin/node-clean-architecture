import type { Email, PlaintextPassword } from "domain/value-objects";

export interface RegisterRequest {
  name: string;
  email: Email;
  password: PlaintextPassword;
}

export interface LoginRequest {
  email: Email;
  password: PlaintextPassword;
}
