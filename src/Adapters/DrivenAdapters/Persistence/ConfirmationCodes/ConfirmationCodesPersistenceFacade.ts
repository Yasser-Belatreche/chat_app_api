import type {
  ConfirmationCodeInfo,
  IConfirmationCodesPersistenceFacade,
} from "./ConfirmationCodes.types";

import { prisma } from "../_SETUP_/Prisma/PrismaClient";

class ConfirmationCodesPersistencePostgresFacade
  implements IConfirmationCodesPersistenceFacade
{
  async add(codeInfo: ConfirmationCodeInfo): Promise<ConfirmationCodeInfo> {
    try {
      await prisma.confirmationCode.create({ data: codeInfo });
      return codeInfo;
    } catch (error) {
      this.DBException(error);
    }
  }

  async find(email: string): Promise<ConfirmationCodeInfo | undefined> {
    try {
      const codeInfo = await prisma.confirmationCode.findUnique({
        where: { email },
      });
      if (!codeInfo) return undefined;

      return codeInfo;
    } catch (error) {
      this.DBException(error);
    }
  }

  async update(codeInfo: ConfirmationCodeInfo): Promise<ConfirmationCodeInfo> {
    try {
      await prisma.confirmationCode.update({
        where: { email: codeInfo.email },
        data: codeInfo,
      });
      return codeInfo;
    } catch (error) {
      this.DBException(error);
    }
  }

  async delete(email: string): Promise<ConfirmationCodeInfo> {
    try {
      const codeInfo = await prisma.confirmationCode.delete({
        where: { email },
      });
      return codeInfo;
    } catch (error) {
      this.DBException(error);
    }
  }

  async deleteAll() {
    await prisma.confirmationCode.deleteMany();
  }

  private DBException(error: unknown): never {
    throw new Error(`DB error: ${error}`);
  }
}
export { ConfirmationCodesPersistencePostgresFacade };
