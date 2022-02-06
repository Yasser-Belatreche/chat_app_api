import { PasswordManager } from "../../../Ports/DrivenPorts/PasswordManager/passwordManager.interface";

const passwordManager: PasswordManager = {
  hash: (key) => `hashFoo${key}`,
  isHashMatchLiteral: ({ hash, literal }) => hash.slice(7) === literal,
};

export { passwordManager };
