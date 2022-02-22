import { IEmailService } from "../../Ports/DrivenPorts/EmailService/EmailService.interface";

import nodemailer from "nodemailer";

type Email = {
  to: string;
  HTMLTemplate: string;
  title: string;
};

class EmailService implements IEmailService {
  private readonly EMAIL_ADRESS: string;
  private readonly EMAIL_PASSWORD: string;

  constructor() {
    const email = process.env.ADMIN_EMAIL_ADRESS;
    const password = process.env.ADMIN_EMAIL_PASSWORD;
    if (!email || !password) throw this.NoEmailOrPasswordException();

    this.EMAIL_ADRESS = email;
    this.EMAIL_PASSWORD = password;
  }

  async send(args: Email): Promise<void> {
    const transporter = this.getTransporter();

    await transporter.sendMail({
      from: this.EMAIL_ADRESS,
      subject: args.title,
      to: args.to,
      html: args.HTMLTemplate,
    });
  }

  private getTransporter() {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.EMAIL_ADRESS,
        pass: this.EMAIL_PASSWORD,
      },
    });
  }

  private NoEmailOrPasswordException() {
    return new Error(
      "should have the ADMIN_EMAIL_ADRESS, and ADMIN_EMAIL_PASSWORD is the env variables"
    );
  }
}

export { EmailService };
