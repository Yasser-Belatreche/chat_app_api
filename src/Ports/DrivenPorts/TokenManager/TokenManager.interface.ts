export interface ITokenManager {
  generateToken(key: string): string;
  decode(token: string): string;
}
