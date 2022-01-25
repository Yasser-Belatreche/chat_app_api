export interface TokenManager {
  generateToken: (id: string) => string;
  decode: (token: string) => string;
}
