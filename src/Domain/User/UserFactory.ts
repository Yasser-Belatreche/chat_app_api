import type { Dependencies, EmailAndPassword, IUser } from "./User.types";
import type { NonFunctionProperties } from "../_utils_/Type";

import {
  CreatedAtNotSetException,
  InvalidEmailException,
  InvalidPasswordException,
  NameNotSetException,
  UserIdNotSetException,
  NameNotValidException,
  IsConfirmedNotSetException,
  UserIdAlreadySetException,
  IsConfirmedAlreadySetException,
  CreatedAtAlreadySetException,
  InvalidDateException,
} from "./_utils_/Exceptions";

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

      if (!this.isValidEmail(email)) throw new InvalidEmailException();
      if (!this.isValidPassword(password)) throw new InvalidPasswordException();

      this._email = email;
      this._password = password;
    }

    get userId(): string {
      if (!this._userId) throw new UserIdNotSetException();
      return this._userId;
    }

    set userId(id: string) {
      if (this._userId) throw new UserIdAlreadySetException();
      this._userId = id;
    }

    get name(): string {
      if (!this._name) throw new NameNotSetException();
      return this._name;
    }

    set name(v: string) {
      if (v.length < 4) throw new NameNotValidException();
      this._name = this.trimAndLowerCase(v);
    }

    get email(): string {
      return this._email;
    }

    set email(e: string) {
      if (!this.isValidEmail(e)) throw new InvalidEmailException();
      this._email = e;
    }

    get password(): string {
      return this._password;
    }

    set password(v: string) {
      if (!this.isValidPassword(v)) throw new InvalidPasswordException();
      this._password = v;
    }

    get createdAt(): string {
      if (!this._createdAt) throw new CreatedAtNotSetException();
      return this._createdAt;
    }

    set createdAt(v: string) {
      if (this._createdAt) throw new CreatedAtAlreadySetException();
      if (!this.isValidDate(v)) throw new InvalidDateException();
      this._createdAt = v;
    }

    get isConfirmed(): boolean {
      if (this._isConfirmed === undefined)
        throw new IsConfirmedNotSetException();
      return this._isConfirmed;
    }

    set isConfirmed(v: boolean) {
      if (this._isConfirmed) throw new IsConfirmedAlreadySetException();
      this._isConfirmed = v;
    }

    userInfo(): NonFunctionProperties<IUser> {
      return {
        userId: this.userId,
        name: this.name,
        email: this.email,
        password: this.password,
        createdAt: this.createdAt,
        isConfirmed: this.isConfirmed,
      };
    }

    newRegistered(name: string) {
      this.name = name;
      this.userId = idGenerator.generate();
      this.createdAt = new Date().toJSON();
      this.isConfirmed = false;
    }

    confirm() {
      this._isConfirmed = true;
    }

    private isValidEmail(e: string): boolean {
      return EMAIL_PATTERN.test(e);
    }

    private isValidPassword(p: string): boolean {
      return p.length >= 8;
    }

    private isValidDate(date: string): boolean {
      return !isNaN(Date.parse(date));
    }

    private trimAndLowerCase(s: string): string {
      return s.trim().toLowerCase();
    }
  };
};

const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export { makeUser };
