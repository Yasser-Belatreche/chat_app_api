import type { IPasswordManager } from "./PasswordManager.interface";
import { PasswordManager } from "../../../Adapters/DrivenAdapters/PasswordManger";

const passwordManager: IPasswordManager = new PasswordManager();

export { passwordManager };
