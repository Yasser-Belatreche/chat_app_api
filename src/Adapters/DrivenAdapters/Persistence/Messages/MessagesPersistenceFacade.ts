import {
  GetMessagesArgs,
  IMessagesPersistenceFacade,
  MessageInfo,
} from "./Message.types";

import { prisma } from "../_SETUP_/Prisma/PrismaClient";

class MessagesPresistencePostgresFacade implements IMessagesPersistenceFacade {
  async add(message: MessageInfo): Promise<MessageInfo> {
    try {
      await prisma.message.create({ data: message });
      return message;
    } catch (error) {
      this.DBException(error);
    }
  }

  async getMessages(args: GetMessagesArgs): Promise<MessageInfo[]> {
    try {
      const { between: firstId, and: secondId } = args;
      const { numOfChunk = 1, numOfMessagesPerChunk = 20 } = args;

      const skip = (numOfChunk - 1) * numOfMessagesPerChunk;

      return await prisma.message.findMany({
        orderBy: { createdAt: "desc" },
        take: numOfMessagesPerChunk,
        skip,
        where: {
          OR: [
            { senderId: firstId, receiverId: secondId },
            { senderId: secondId, receiverId: firstId },
          ],
        },
      });
    } catch (error) {
      this.DBException(error);
    }
  }

  async getLastMessageWithEveryUser(userId: string): Promise<MessageInfo[]> {
    try {
      return await prisma.$queryRaw<MessageInfo[]>`
        SELECT * FROM (
          SELECT *, row_number() OVER (
            PARTITION BY LEAST("senderId", "receiverId"), GREATEST("senderId", "receiverId")
            ORDER BY "createdAt" DESC
          ) AS rn
          FROM "Message"
          WHERE ${userId} IN ("senderId", "receiverId")
        ) AS t
        WHERE rn = 1 ORDER BY "createdAt" DESC
      `;
    } catch (error) {
      this.DBException(error);
    }
  }

  async deleteAll() {
    await prisma.message.deleteMany();
  }

  private DBException(error: unknown): never {
    throw new Error(`DB error : ${error}`);
  }
}

export { MessagesPresistencePostgresFacade };
