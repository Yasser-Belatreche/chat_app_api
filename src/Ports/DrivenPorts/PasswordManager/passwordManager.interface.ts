export interface PasswordManager {
  hash: (key: any) => string;
  isHashMatchLiteral: (args: { hash: string; literal: string }) => boolean;
}
