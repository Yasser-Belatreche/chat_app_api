import { IEmailService } from "../../../Ports/DrivenPorts/EmailService/EmailService.interface";

class EmailServiceFake implements IEmailService {
  constructor() {}

  async send(): Promise<void> {}
}

export { EmailServiceFake };
