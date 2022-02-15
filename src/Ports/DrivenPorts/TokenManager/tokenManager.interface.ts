export interface TokenManager {
  generateToken: (key: string) => string;
  decode: (token: string) => string;
}
