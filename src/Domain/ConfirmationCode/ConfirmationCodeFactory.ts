import type { NonFunctionProperties } from "../_utils_/Type";
import type { IConfirmationCode } from "./ConfirmationCode.types";

const makeConfirmationCode = () => {
  return class ConfirmationCode implements IConfirmationCode {
    private _email: string;
    private _code?: number;
    private _createdAt?: string;

    constructor(email: string) {
      this._email = email;
    }

    get email(): string {
      return this._email;
    }

    get code(): number {
      if (!this._code) this.NoCodeException();
      return this._code;
    }

    set code(code: number) {
      if (this._code) this.CodeAlreadySetException();
      this._code = code;
    }

    get createdAt(): string {
      if (!this._createdAt) this.NoCreatedAtException();
      return this._createdAt;
    }

    set createdAt(date: string) {
      if (this._createdAt) this.CreatedAtAlreadySetException();
      if (!this.isValidDate(date)) this.InvalidDateException();
      this._createdAt = date;
    }

    newCode() {
      this.code = this.generateCode();
      this.createdAt = new Date().toJSON();
    }

    codeInfo(): NonFunctionProperties<IConfirmationCode> {
      return {
        code: this.code,
        email: this.email,
        createdAt: this.createdAt,
      };
    }

    private generateCode(): number {
      let result: number = 0;

      do {
        result = Math.floor(Math.random() * 10 ** 4);
      } while (result < 1000 && result > 9999);

      return result;
    }

    private isValidDate(date: string): boolean {
      return !isNaN(Date.parse(date));
    }

    private NoCodeException(): never {
      throw new Error("the code didn't set yet for this instance");
    }

    private NoCreatedAtException(): never {
      throw new Error("created at didn't set yet for this instance");
    }

    private CreatedAtAlreadySetException(): never {
      throw new Error("created at already set for this instance");
    }

    private CodeAlreadySetException(): never {
      throw new Error("code already set for this instance");
    }

    private InvalidDateException(): never {
      throw new Error("date is unvalid");
    }
  };
};

export { makeConfirmationCode };
