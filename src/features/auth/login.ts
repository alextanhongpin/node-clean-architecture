import type { Email } from "types/email";
export type { Email };

export function login(email: Email, password: string) {
  console.log("login with", { email, password });
}
