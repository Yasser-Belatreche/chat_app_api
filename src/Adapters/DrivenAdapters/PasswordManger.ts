import bcrypt from "bcrypt";

import type { IPasswordManager } from "../../Ports/DrivenPorts/PasswordManager/PasswordManager.interface";

class PasswordManager implements IPasswordManager {
  async hash(password: any): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async isHashMatchLiteral(args: {
    hash: string;
    literal: string;
  }): Promise<boolean> {
    const isMatch = await bcrypt.compare(args.literal, args.hash);
    return isMatch;
  }
}

export { PasswordManager };
