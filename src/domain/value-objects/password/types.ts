import type { Brand } from "types/brand";

export type PlaintextPassword = Brand<string, "PLAINTEXT_PASSWORD">;
export type EncryptedPassword = Brand<string, "ENCRYPTED_PASSWORD">;
