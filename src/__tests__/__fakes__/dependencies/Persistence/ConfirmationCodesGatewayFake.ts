import type { IConfirmationCode } from "../../../../Domain/ConfirmationCode/ConfirmationCode.types";
import type { IConfirmationCodesGateway } from "../../../../Ports/DrivenPorts/Persistence/Persistence.interface";

class ConfirmationCodesGatewayFake implements IConfirmationCodesGateway {
  private readonly store = new Map<string, IConfirmationCode>();

  add(confirmationCode: IConfirmationCode): Promise<IConfirmationCode> {
    this.store.set(confirmationCode.email, confirmationCode);
    return Promise.resolve(confirmationCode);
  }

  update(confirmationCode: IConfirmationCode): Promise<IConfirmationCode> {
    this.store.set(confirmationCode.email, confirmationCode);
    return Promise.resolve(confirmationCode);
  }

  find(email: string): Promise<IConfirmationCode | undefined> {
    return Promise.resolve(this.store.get(email));
  }

  delete(email: string): Promise<IConfirmationCode> {
    const codeToDelete = this.store.get(email);
    this.store.delete(email);

    return Promise.resolve(codeToDelete as any);
  }

  deleteAll() {
    this.store.clear();
  }
}

export { ConfirmationCodesGatewayFake };
