import type { IDManager } from "../../Ports/DrivenPorts/IDManager";

import { errorMessages } from "../../utils/ErrorMessages";

interface Dependencies {
  idManager: IDManager;
}

interface UserInfo {
  name: string;
  email: string;
  password: string;
}

export interface IUser extends UserInfo {
  userId: string;
  createdAt: string;
  isConfirmed: boolean;
}

const makeUser = ({ idManager }: Dependencies) => {
  return class User implements IUser {
    private _userId: string;
    private _name: string;
    private _email: string;
    private _password: string;
    private _createdAt: string;
    private _isConfirmed: boolean;

    constructor(params: UserInfo) {
      const { name, email, password } = this.formatValues(params);

      if (!this.isValidName(name))
        throw new Error(errorMessages.SHORT_USER_NAME);

      if (!this.isValidEmail(email))
        throw new Error(errorMessages.INVALID_EMAIL);

      if (!this.isValidPassword(password))
        throw new Error(errorMessages.INVALID_PASSWORD);

      this._name = name;
      this._email = email;
      this._password = password;
      this._userId = idManager.generateRandomId();
      this._createdAt = new Date().toJSON();
      this._isConfirmed = false;
    }

    public get userId(): string {
      return this._userId;
    }

    public get name(): string {
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
        throw new Error(errorMessages.INVALID_PASSWORD);

      this._password = v;
    }

    public get isConfirmed(): boolean {
      return this._isConfirmed;
    }

    public get createdAt(): string {
      return this._createdAt;
    }

    private formatValues(values: UserInfo) {
      return {
        name: values.name.trim().toLowerCase(),
        email: values.email.trim().toLowerCase(),
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
  };
};

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export { makeUser };
