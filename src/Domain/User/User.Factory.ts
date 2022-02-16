import type { WithIdGenerator } from "../_utils_/Dependencies.interfaces";

import {
  CreatedAtNotSet,
  InvalidEmail,
  InvalidPassword,
  NameNotSet,
  UserIdNotSet,
  UserIdOrCreatedAtAlreadySet,
  NameNotValid,
  isConfirmedNotSet,
} from "./_utils_/Exceptions";

type Dependencies = WithIdGenerator;

export interface IUser {
  email: string;
  password: string;
  userId: string;
  name: string;
  createdAt: string;
  isConfirmed: boolean;
  isANewRegistred: (name: string) => void;
  confirm: () => void;
}

interface EmailAndPassword {
  email: string;
  password: string;
}

const makeUser = ({ idGenerator }: Dependencies) => {
  return class User implements IUser {
    private _email: string;
    private _password: string;
    private _userId?: string;
    private _name?: string;
    private _createdAt?: string;
    private _isConfirmed?: boolean;

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

    public set password(v: string) {
      if (!this.isValidPassword(v)) throw new InvalidPassword();
      this._password = v;
    }

    public get name(): string {
      if (!this._name) throw new NameNotSet();
      return this._name;
    }

    public set name(v: string) {
      if (v.length < 4) throw new NameNotValid();
      this._name = this.trimAndLowerCase(v);
    }

    public get userId(): string {
      if (!this._userId) throw new UserIdNotSet();
      return this._userId;
    }

    public get createdAt(): string {
      if (!this._createdAt) throw new CreatedAtNotSet();
      return this._createdAt;
    }

    public get isConfirmed(): boolean {
      if (this._isConfirmed === undefined) throw new isConfirmedNotSet();
      return this._isConfirmed;
    }

    public isANewRegistred(name: string) {
      if (this._userId || this._createdAt || this._name)
        throw new UserIdOrCreatedAtAlreadySet();

      this.name = name;
      this._userId = idGenerator.generate();
      this._createdAt = new Date().toJSON();
      this._isConfirmed = false;
    }

    public confirm() {
      this._isConfirmed = true;
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
