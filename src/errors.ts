export type ErrorKind = "USER_NOT_FOUND" | "USER_ALREADY_EXISTS" | "WALLET_NOT_FOUND" | "UNKNOWN_ERROR";

export interface BaseError {
  kind: ErrorKind;
  message: string;
  isOfKind: (otherKind: ErrorKind) => boolean;
}

export class ApiError implements BaseError {
  kind: ErrorKind;
  message: string;

  constructor(data: { kind: ErrorKind; message: string }) {
    this.kind = data.kind;
    this.message = data.message;
  }

  isOfKind(otherKind: ErrorKind) {
    return this.kind.toString() == otherKind.toString();
  }
}
