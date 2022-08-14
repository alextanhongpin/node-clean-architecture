import type { User } from "domain/models";
import type { Email } from "domain/value-objects";
import {
  EmailFactory,
  EncryptedPasswordFactory,
  PlaintextPasswordFactory,
} from "domain/value-objects";
import { AuthUsecase, CreateRequest } from "features/auth";
import { AppError } from "types/error";

async function main() {
  try {
    const repo = {
      async create(req: CreateRequest): Promise<User> {
        console.log(req);
        return { id: "john", encryptedPassword: "hello" } as User;
      },
      async findByEmail(email: Email): Promise<User> {
        console.log(email);
        const encryptedPassword = await EncryptedPasswordFactory.encrypt(
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
