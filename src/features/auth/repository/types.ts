import type { User } from "domain/models/user";
import type { Email } from "domain/value-objects/email";
import type { EncryptedPassword } from "domain/value-objects/password";

export interface IAuthRepository {
  findByEmail(email: Email): Promise<User>;
  create(req: CreateRequest): Promise<User>;
}

export interface CreateRequest {
  name: string;
  email: Email;
  encryptedPassword: EncryptedPassword;
}
