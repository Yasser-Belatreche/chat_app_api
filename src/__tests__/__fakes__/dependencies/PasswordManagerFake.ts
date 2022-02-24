import { IPasswordManager } from "../../../Ports/DrivenPorts/PasswordManager/PasswordManager.interface";

class PasswordManagerFake implements IPasswordManager {
  constructor() {}

  hash(password: string): Promise<string> {
    return Promise.resolve(`hashFoo${password}`);
  }

  isHashMatchLiteral(args: {
    hash: string;
    literal: string;
  }): Promise<boolean> {
    const { hash, literal } = args;
    return Promise.resolve(hash.slice(7) === literal);
  }
}

export { PasswordManagerFake };
