import { EmailService } from "../../../Ports/DrivenPorts/EmailService/emailService.interface";

const emailService: EmailService = {
  send: async ({ to }) => {
    try {
      if (!to) throw "";
    } catch (error) {
      throw new Error(error as any);
    }
  },
};

export { emailService };
