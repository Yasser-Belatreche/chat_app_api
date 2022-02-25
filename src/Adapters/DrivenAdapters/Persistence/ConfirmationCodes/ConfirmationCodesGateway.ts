import { ConfirmationCode } from "../../../../Domain/ConfirmationCode";
import type { IConfirmationCode } from "../../../../Domain/ConfirmationCode/ConfirmationCode.types";
import type { IConfirmationCodesGateway } from "../../../../Ports/DrivenPorts/Persistence/Persistence.interface";
import type {
  ConfirmationCodeInfo,
  IConfirmationCodesPersistenceFacade,
} from "./ConfirmationCodes.types";

class ConfirmationCodesGateway implements IConfirmationCodesGateway {
  constructor(
    private readonly confirmationCodesPersistence: IConfirmationCodesPersistenceFacade
  ) {}

  async add(code: IConfirmationCode): Promise<IConfirmationCode> {
    const codeInfo = await this.confirmationCodesPersistence.add(
      code.codeInfo()
    );
    return this.getCodeEntity(codeInfo);
  }

  async find(email: string): Promise<IConfirmationCode | undefined> {
    const codeInfo = await this.confirmationCodesPersistence.find(email);
    if (!codeInfo) return undefined;

    return this.getCodeEntity(codeInfo);
  }

  async update(code: IConfirmationCode): Promise<IConfirmationCode> {
    const codeInfo = await this.confirmationCodesPersistence.update(
      code.codeInfo()
    );
    return this.getCodeEntity(codeInfo);
  }

  async delete(email: string): Promise<IConfirmationCode> {
    const codeInfo = await this.confirmationCodesPersistence.delete(email);
    return this.getCodeEntity(codeInfo);
  }

  private getCodeEntity(codeInfo: ConfirmationCodeInfo) {
    const confirmationCode = new ConfirmationCode(codeInfo.email);
    confirmationCode.code = codeInfo.code;
    confirmationCode.createdAt = codeInfo.createdAt;

    return confirmationCode;
  }
}

export { ConfirmationCodesGateway };
