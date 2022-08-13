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

export class AppError extends Error {
  public kind: ErrorKind = ErrorKind.Unknown;
  public code: string = "app.unknown";
  public params: Record<string, any> = {};

  constructor(...args: any[]) {
    super(...args);
    this.name = this.constructor.name;
  }
}
