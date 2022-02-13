export interface IConfirmationCode {
  email: string;
  code: number;
  createdAt: string;
}

const makeConfirmationCode = () => {
  return class ConfirmationCode implements IConfirmationCode {
    private _email: string;
    private _code: number;
    private _createdAt: string;

    constructor(email: string) {
      this._email = email;
      this._code = this.generateCode();
      this._createdAt = new Date().toJSON();
    }

    public get email(): string {
      return this._email;
    }

    public get code(): number {
      return this._code;
    }

    public get createdAt(): string {
      return this._createdAt;
    }

    private generateCode(): number {
      let result: number = 0;

      do {
        result = Math.floor(Math.random() * 10 ** 4);
      } while (result < 1000 && result > 9999);

      return result;
    }
  };
};

export { makeConfirmationCode };
