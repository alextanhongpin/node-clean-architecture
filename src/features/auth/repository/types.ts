import type { User } from "domain/models";
import type { Email, EncryptedPassword } from "domain/value-objects";

export interface IAuthRepository {
  findByEmail(email: Email): Promise<User>;
  create(req: CreateRequest): Promise<User>;
}

export interface CreateRequest {
  name: string;
  email: Email;
  encryptedPassword: EncryptedPassword;
}
