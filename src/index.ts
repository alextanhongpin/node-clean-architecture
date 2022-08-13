import { AuthUsecase, CreateRequest } from "features/auth";
import type { Email } from "domain/value-objects/email";
import { EmailFactory } from "domain/value-objects/email";
import type { User } from "domain/models/user";
import {
  PlaintextPasswordFactory,
  EncryptedPasswordFactory,
} from "domain/value-objects/password";
import { AppError } from "types/error";

async function main() {
  try {
    const repo = {
      async create(req: CreateRequest): Promise<User> {
        return { id: "john", encryptedPassword: "hello" } as User;
      },
      async findByEmail(email: Email): Promise<User> {
        const encryptedPassword = await EncryptedPasswordFactory.create(
          PlaintextPasswordFactory.create("12345678")
        );
        return { id: "john", encryptedPassword } as User;
      },
    };

    const authUsecase = new AuthUsecase(repo);
    const email = EmailFactory.create("john.doe@mail.com");
    const password = PlaintextPasswordFactory.create("12345678");

    const user = await authUsecase.login({
      email,
      password,
    });
    console.log({ user });
  } catch (error: unknown) {
    if (error instanceof AppError) {
      console.log(error);
      console.log(error.message);
      console.log(JSON.stringify(error, null, 2));
    }
  }
}

main().catch(console.error);
