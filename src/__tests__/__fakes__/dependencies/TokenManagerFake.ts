import { ITokenManager } from "../../../Ports/DrivenPorts/TokenManager/TokenManager.interface";

class TokenManagerFake implements ITokenManager {
  constructor() {}

  generateToken(key: string): string {
    return `Bearer ${key}123`;
  }

  decode(bearerToken: string): string {
    if (!bearerToken.includes("Bearer ")) throw new Error();

    const [_, token] = bearerToken.split("Bearer ");
    return token.split("123")[0];
  }
}

export { TokenManagerFake };
