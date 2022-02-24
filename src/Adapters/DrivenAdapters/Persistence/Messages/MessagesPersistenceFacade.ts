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
      const { between: firstUserId, and: secondUserId } = args;
      const { numOfChunk = 1, numOfMessagesPerChunk = 20 } = args;

      const messages = await prisma.message.findMany({
        where: {
          OR: [
            {
              senderId: firstUserId,
              receiverId: secondUserId,
            },
            {
              senderId: secondUserId,
              receiverId: firstUserId,
            },
          ],
        },
      });
      return messages;
    } catch (error) {
      this.DBException(error);
    }
  }

  async getLastMessageWithEveryUser(userId: string): Promise<MessageInfo[]> {
    return [];
  }

  async deleteAll() {
    await prisma.message.deleteMany();
  }

  private DBException(error: unknown): never {
    throw new Error(`DB error : ${error}`);
  }
}

export { MessagesPresistencePostgresFacade };
