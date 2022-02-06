import { TokenManager } from "../../../Ports/DrivenPorts/TokenManager/tokenManager.interface";

const tokenManager: TokenManager = {
  generateToken: (key) => `Bearer ${key}123`,
};

export { tokenManager };
