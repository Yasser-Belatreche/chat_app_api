export interface TokenManager {
  generateToken: (key: string) => string;
}
