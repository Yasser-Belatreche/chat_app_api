export interface PasswordManager {
  compareHashWithLiteral: (arg: { hash: string; literal: string }) => boolean;
  generateHash: (passwordLiteral: string) => string;
}
