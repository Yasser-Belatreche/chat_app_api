import { TokenManager } from "../../../Ports/DrivenPorts/TokenManager/tokenManager.interface";

const tokenManager: TokenManager = {
  generateToken: (key) => `Bearer ${key}123`,
  decode: (token) => {
    if (!token.includes("Bearer")) throw new Error();

    return token.split("Bearer ")[1].split("123")[0];
  },
};

export { tokenManager };
