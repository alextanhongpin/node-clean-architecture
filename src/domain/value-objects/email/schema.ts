import z from "zod";

import { EmailValidationError } from "./errors";
import { EmailFactory } from "./factory";
import type { Email } from "./types";

export const EmailSchema = z.custom<Email>((val) =>
  z
    .string()
    .refine(
      (val) => EmailFactory.valid(val as Email),
      (val) => {
        const error = new EmailValidationError(val as Email);
        return {
          message: error.message,
          path: ["email"],
          params: error.toJSON(),
        };
      }
    )
    .parse(val)
);
