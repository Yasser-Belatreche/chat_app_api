import type {
  IConfirmationCodesGateway,
  IUsersGateway,
} from "../../../Ports/DrivenPorts/Persistence/Persistence.interface";
import type { IEmailService } from "../../../Ports/DrivenPorts/EmailService/EmailService.interface";

import { ConfirmationCode } from "../../../Domain/ConfirmationCode";
import type { IConfirmationCode } from "../../../Domain/ConfirmationCode/ConfirmationCode.types";

class SendConfirmationCodeFactory {
  constructor(
    private readonly usersGateway: IUsersGateway,
    private readonly confirmationCodesGateway: IConfirmationCodesGateway,
    private readonly emailServie: IEmailService
  ) {}

  async sendCode(email: string): Promise<number> {
    const user = await this.getUserByEmail(email.toLowerCase().trim());
    if (!user) this.UserNotExist();

    const confirmationCode = new ConfirmationCode(user.email);
    confirmationCode.newCode();

    const existingCode = await this.getCode(user.email);

    if (existingCode) await this.updateCode(confirmationCode);
    else await this.saveCode(confirmationCode);

    await this.sendConfirmationMail(user.email, confirmationCode.code);

    return confirmationCode.code;
  }

  private async getUserByEmail(email: string) {
    return await this.usersGateway.getByEmail(email);
  }

  private async getCode(email: string) {
    return await this.confirmationCodesGateway.find(email);
  }

  private async updateCode(confirmationCode: IConfirmationCode) {
    return await this.confirmationCodesGateway.update(confirmationCode);
  }

  private async saveCode(confirmationCode: IConfirmationCode) {
    return await this.confirmationCodesGateway.add(confirmationCode);
  }

  private async sendConfirmationMail(receiverEmail: string, code: number) {
    await this.emailServie.send({
      to: receiverEmail,
      title: "Your Confirmation Code",
      HTMLTemplate: this.getConfirmationTemplate(code),
    });
  }

  private getConfirmationTemplate(code: number): string {
    return `
      <p>Your code is: ${code}</p>
    `;
  }

  private UserNotExist(): never {
    throw new Error("No user associated with this email");
  }
}

export { SendConfirmationCodeFactory };
