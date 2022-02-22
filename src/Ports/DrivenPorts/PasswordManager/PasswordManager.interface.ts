export interface IPasswordManager {
  hash(password: string) :Promise<string>;
  isHashMatchLiteral(args: { hash: string; literal: string }): Promise<boolean>;
}
