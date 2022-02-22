import type { ITokenManager } from "../../Ports/DrivenPorts/TokenManager/TokenManager.interface";

import jwt from "jsonwebtoken";

class TokenManager implements ITokenManager {
  private readonly SECRET_KEY: string;

  constructor() {
    if (!process.env.JWT_SECRET_KEY) throw this.NoSecretKeyException();

    this.SECRET_KEY = process.env.JWT_SECRET_KEY;
  }

  generateToken(key: string): string {
    const token = jwt.sign(key, this.SECRET_KEY);
    return `Bearer ${token}`;
  }

  decode(bearerToken: string): string {
    const [_, token] = bearerToken.split("Bearer ");

    const value = jwt.verify(token, this.SECRET_KEY) as string;
    return value;
  }

  private NoSecretKeyException() {
    return new Error("no secret key in the envirenment variables");
  }
}

export { TokenManager };
