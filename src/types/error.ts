export const enum ErrorKind {
  AlreadyExists = "already_exists",
  BadInput = "bad_input",
  Conflict = "conflict",
  Forbidden = "forbidden",
  Internal = "internal",
  NotFound = "not_found",
  Unauthorized = "unauthorized",
  Unknown = "unknown",
  Unprocessable = "unprocessable",
}

type ErrorCode = string;

export abstract class AppError<T> extends Error {
  protected kind: ErrorKind = ErrorKind.Unknown;
  protected code: ErrorCode = "unknown";
  protected params: T = {} as T;

  // Only works if using target ES2022?: ErrorOptions is a built-in type.
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      code: this.code,
      kind: this.kind,
      message: this.message,
      params: this.params,
    };
  }
}
