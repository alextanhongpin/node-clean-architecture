import type { User } from "domain/models";
import { EncryptedPasswordFactory } from "domain/value-objects";
import type { CreateRequest, IAuthRepository } from "features/auth/repository";

import type { LoginRequest, RegisterRequest } from "./types";

export interface IAuthUsecase {
  register(req: RegisterRequest): Promise<User>;
  login(req: LoginRequest): Promise<User>;
}

export class AuthUsecase implements IAuthUsecase {
  constructor(private repo: IAuthRepository) {}

  async register(req: RegisterRequest): Promise<User> {
    const encryptedPassword = await EncryptedPasswordFactory.encrypt(
      req.password
    );

    const user = await this.repo.create({
      name: req.name,
      email: req.email,
      encryptedPassword,
    } as CreateRequest);

    return user;
  }

  async login(req: LoginRequest): Promise<User> {
    const user = await this.repo.findByEmail(req.email);

    await EncryptedPasswordFactory.verify(user.encryptedPassword, req.password);

    return user;
  }
}
