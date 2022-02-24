import type { IUserPersistenceFacade, UserInfo } from "./Users.types";

import { prisma } from "../_SETUP_/Prisma/PrismaClient";

class UsersPersistencePostgresFacade implements IUserPersistenceFacade {
  async add(user: UserInfo): Promise<UserInfo> {
    try {
      await prisma.user.create({ data: user });
      return user;
    } catch (error) {
      this.DBException(error);
    }
  }

  async getById(userId: string): Promise<UserInfo | undefined> {
    try {
      const userInfo = await prisma.user.findUnique({ where: { userId } });
      if (!userInfo) return undefined;

      return userInfo;
    } catch (error) {
      this.DBException(error);
    }
  }

  async getByEmail(email: string): Promise<UserInfo | undefined> {
    try {
      const userInfo = await prisma.user.findUnique({ where: { email } });
      if (!userInfo) return undefined;

      return userInfo;
    } catch (error) {
      this.DBException(error);
    }
  }

  async update(user: UserInfo): Promise<UserInfo> {
    try {
      const { userId, ...rest } = user;
      await prisma.user.update({ where: { userId }, data: rest });

      return user;
    } catch (error) {
      this.DBException(error);
    }
  }

  async searchFor(keyword: string): Promise<UserInfo[]> {
    try {
      const result = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          OR: [
            { name: { contains: keyword } },
            { email: { contains: keyword } },
          ],
        },
      });
      return result;
    } catch (error) {
      this.DBException(error);
    }
  }

  async deleteAll() {
    try {
      await prisma.user.deleteMany();
    } catch (error) {
      this.DBException(error);
    }
  }

  private DBException(err: unknown): never {
    throw new Error(`DB Error: ${err}`);
  }
}

export { UsersPersistencePostgresFacade };
