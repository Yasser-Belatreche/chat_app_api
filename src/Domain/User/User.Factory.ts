import { IdGenerator } from "../../Ports/DrivenPorts/IdGenerator/IdGenerator.interface";
import {
  CreatedAtNotSet,
  InvalidEmail,
  InvalidPassword,
  NameNotSet,
  UserIdNotSet,
  UserIdOrCreatedAtAlreadySet,
} from "../../utils/Exceptions";

type Dependencies = {
  idGenerator: IdGenerator;
};

interface IUser {
  email: string;
  password: string;
  userId: string;
  name: string;
  createdAt: string;
  generateIdAndCreationTime: Function;
}

interface EmailAndPassword {
  email: string;
  password: string;
}

const makeUser = ({ idGenerator }: Dependencies) => {
  return class implements IUser {
    private _email: string;
    private _password: string;
    private _userId?: string;
    private _name?: string;
    private _createdAt?: string;

    constructor({ email, password }: EmailAndPassword) {
      email = this.trimAndLowerCase(email);
      password = password.trim();

      if (!this.isValidEmail(email)) throw new InvalidEmail();
      if (!this.isValidPassword(password)) throw new InvalidPassword();

      this._email = email;
      this._password = password;
    }

    public get email(): string {
      return this._email;
    }

    public get password(): string {
      return this._password;
    }

    public get name(): string {
      if (!this._name) throw new NameNotSet();
      return this._name;
    }

    public set name(v: string) {
      this._name = this.trimAndLowerCase(v);
    }

    public get userId(): string {
      if (!this._userId) throw new UserIdNotSet();
      return this._userId;
    }

    public set userId(v: string) {
      this._userId = v;
    }

    public get createdAt(): string {
      if (!this._createdAt) throw new CreatedAtNotSet();
      return this._createdAt;
    }

    public set createdAt(v: string) {
      this._createdAt = v;
    }

    public generateIdAndCreationTime() {
      if (this._userId || this._createdAt)
        throw new UserIdOrCreatedAtAlreadySet();

      this._userId = idGenerator.generate();
      this._createdAt = new Date().toJSON();
    }

    private isValidEmail(e: string): boolean {
      return EMAIL_PATTERN.test(e);
    }

    private isValidPassword(p: string): boolean {
      return p.length >= 8;
    }

    private trimAndLowerCase(s: string): string {
      return s.trim().toLowerCase();
    }
  };
};

const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export { makeUser };
