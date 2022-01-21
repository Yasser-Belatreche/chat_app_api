interface Dependencies {
  ID: {
    generateRandomId: () => string;
  };
}

const makeUser = ({ ID }: Dependencies) => {
  interface IUserWithoutId {
    userId?: string;
    name: string;
    phoneNumber: string;
    password: string;
  }

  interface IUser extends IUserWithoutId {
    userId: string;
  }

  return class User implements IUser {
    private _userId: string;
    private _name: string;
    private _phoneNumber: string;
    private _password: string;

    constructor(params: IUserWithoutId) {
      const { userId, name, phoneNumber, password } = this.formatValues(params);

      if (!this.isValidName(name))
        this.InvalidPropertyError("name should have more than 4 characters");

      if (!this.isValidPhoneNumber(phoneNumber))
        this.InvalidPropertyError("unvalid phone number");

      if (!this.isValidPassword(password))
        this.InvalidPropertyError(
          "password should have more than 8 characters"
        );

      this._userId = userId || ID.generateRandomId();
      this._name = name;
      this._phoneNumber = phoneNumber;
      this._password = password;
    }

    public get userId(): string {
      return this._userId;
    }

    public get name(): string {
      return this._name;
    }

    public get phoneNumber(): string {
      return this._phoneNumber;
    }

    public get password(): string {
      return this._password;
    }

    private formatValues(values: IUserWithoutId): IUserWithoutId {
      return {
        userId: values.userId,
        name: values.name.trim().toLowerCase(),
        phoneNumber: values.phoneNumber.trim(),
        password: values.password.trim(),
      };
    }

    private isValidName(name: string): boolean {
      return name.length >= 4;
    }

    private isValidPhoneNumber(number: string): boolean {
      return !!number.match(PHONE_NUM_PATTERN);
    }

    private isValidPassword(password: string): boolean {
      return password.length >= 8;
    }

    private InvalidPropertyError(message: string): never {
      throw new Error(message);
    }
  };
};

const PHONE_NUM_PATTERN =
  /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/g;

export { makeUser };
