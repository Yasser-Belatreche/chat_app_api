import { IEmailService } from "../../../Ports/DrivenPorts/EmailService/EmailService.interface";

class EmailServiceFake implements IEmailService {
  async send(): Promise<void> {}
}

export { EmailServiceFake };
