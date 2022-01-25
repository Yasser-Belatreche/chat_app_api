import type { EmailService } from "../../../Ports/DrivenPorts/EmailService";

interface Dependencies {
  emailService: EmailService;
}

interface Args {
  email: string;
  verificationCode: number;
}

const makeSendVerificationEmail = ({ emailService }: Dependencies) => {
  return async ({ email, verificationCode }: Args) => {
    const HTMLTemplate = `
      <p>Here is Your Verification code:</p>
      <h3>${verificationCode}</h3>
    `;

    await emailService.send({ email, HTMLTemplate });
  };
};

export { makeSendVerificationEmail };
