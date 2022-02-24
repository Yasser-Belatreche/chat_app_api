import { expect } from "chai";
import Sinon from "sinon";

import nodemailer from "nodemailer";

import { EmailService } from "../../../Adapters/DrivenAdapters/EmailService";

describe("EmailService", () => {
  describe("Real", () => {
    it("should not be able to create an instance, without having the ADMIN_EMAIL_ADRESS, and ADMIN_EMAIL_PASSWORD in the env variables", () => {
      delete process.env.ADMIN_EMAIL_ADRESS;
      delete process.env.ADMIN_EMAIL_PASSWORD;

      expect(() => new EmailService()).to.throw();
    });

    it("should be able to create an instance when there is the email and password in the env variables", () => {
      process.env.ADMIN_EMAIL_ADRESS = "test@email.com";
      process.env.ADMIN_EMAIL_PASSWORD = "test123";

      expect(() => new EmailService()).to.not.throw();
    });

    it("should be able to send an email", () => {
      const sendMailSpy = Sinon.spy();
      Sinon.stub(nodemailer, "createTransport").returns({
        sendMail: sendMailSpy,
      } as any);

      const emailService = new EmailService();

      emailService.send({
        HTMLTemplate: "<p>hello</p>",
        title: "hi",
        to: "me@test.com",
      });
      expect(sendMailSpy.calledOnce).to.be.true;
    });
  });
});
