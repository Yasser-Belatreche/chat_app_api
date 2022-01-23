interface Dependencies {
  ID: {
    generateRandomId: () => string;
  };
}

interface IUserWithoutId {
  userId?: string;
  name?: string;
  email: string;
  password: string;
  isConfirmed?: boolean;
}

export interface IUser extends IUserWithoutId {
  userId: string;
}

const makeUser = ({ ID }: Dependencies) => {
  return class User implements IUser {
    private _userId: string;
    private _name?: string;
    private _email: string;
    private _password: string;
    private _isConfirmed: boolean;

    constructor(params: IUserWithoutId) {
      const { userId, name, email, password, isConfirmed } =
        this.formatValues(params);

      if (name && !this.isValidName(name))
        this.InvalidPropertyError("name should have more than 4 characters");

      if (!this.isValidEmail(email)) this.InvalidPropertyError("unvalid email");

      if (!this.isValidPassword(password))
        this.InvalidPropertyError(
          "password should have more than 8 characters"
        );

      this._userId = userId || ID.generateRandomId();
      this._name = name;
      this._email = email;
      this._password = password;
      this._isConfirmed = Boolean(isConfirmed);
    }

    public get userId(): string {
      return this._userId;
    }

    public get name(): string | undefined {
      return this._name;
    }

    public get email(): string {
      return this._email;
    }

    public get password(): string {
      return this._password;
    }

    public set password(v: string) {
      if (!this.isValidPassword(v))
        this.InvalidPropertyError(
          "password should have more than 8 characters"
        );

      this._password = v;
    }

    public get isConfirmed(): boolean {
      return this._isConfirmed;
    }

    public set isConfirmed(confirmed: boolean) {
      this._isConfirmed = confirmed;
    }

    private formatValues(values: IUserWithoutId): IUserWithoutId {
      return {
        ...values,
        name: values.name?.trim().toLowerCase(),
        email: values.email.trim().toLocaleLowerCase(),
        password: values.password.trim(),
      };
    }

    private isValidName(name: string): boolean {
      return name.length >= 4;
    }

    private isValidEmail(e: string): boolean {
      return !!e.match(EMAIL_PATTERN);
    }

    private isValidPassword(pass: string): boolean {
      return pass.length >= 8;
    }

    private InvalidPropertyError(message: string): never {
      throw new Error(message);
    }
  };
};

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export { makeUser };
