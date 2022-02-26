import type { IMessagesGateway } from "../../../Ports/DrivenPorts/Persistence/Persistence.interface";
import type { ITokenManager } from "../../../Ports/DrivenPorts/TokenManager/TokenManager.interface";

import type { GetMessagesArgs } from "./GetMessagesFactory.types";

class GetMessagesFactory {
  constructor(
    private readonly messageGateway: IMessagesGateway,
    private readonly tokenManager: ITokenManager
  ) {}

  async getMessage(args: GetMessagesArgs) {
    const authUserId = this.decodeToken(args.authToken);

    const messagesList = await this.getMessages({ ...args, authUserId });

    return messagesList.map((message) => message.messageInfo());
  }

  private decodeToken(token: string) {
    return this.tokenManager.decode(token);
  }

  private async getMessages(
    args: Omit<GetMessagesArgs, "authToken"> & { authUserId: string }
  ) {
    const { authUserId: between, chatParticipantId: and } = args;
    const { numOfChunk, numOfMessagesPerChunk } = args;

    return await this.messageGateway.getMessages({
      between,
      and,
      numOfChunk,
      numOfMessagesPerChunk,
    });
  }
}

export { GetMessagesFactory };
