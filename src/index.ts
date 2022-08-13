import { login } from "features/auth";
import { EmailFactory } from "types/email";
import { AppError } from "types/error";

login(EmailFactory.create("john.doe@mail.com"), "12345678");
