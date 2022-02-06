import { EmailService } from "../../../Ports/DrivenPorts/EmailService/emailService.interface";

const emailService: EmailService = {
  send: async ({ to }) => {
    try {
      if (!to) throw "";

      return { success: true };
    } catch (error) {
      return { success: false };
    }
  },
};

export { emailService };
