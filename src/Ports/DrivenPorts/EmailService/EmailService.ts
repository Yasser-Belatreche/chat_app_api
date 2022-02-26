import type { IEmailService } from "./EmailService.interface";
import { EmailService } from "../../../Adapters/DrivenAdapters/EmailService";

const emailService: IEmailService = new EmailService();

export { emailService };
