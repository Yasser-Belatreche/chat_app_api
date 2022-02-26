import { TokenManager } from "../../../Adapters/DrivenAdapters/TokenManager";
import { ITokenManager } from "./TokenManager.interface";

const tokenManager: ITokenManager = new TokenManager();

export { tokenManager };
