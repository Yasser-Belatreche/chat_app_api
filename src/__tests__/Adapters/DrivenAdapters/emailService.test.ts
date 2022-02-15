import { expect } from "chai";

import { getFakeData } from "../../__fakes__/data";
import { emailService as fakeEmailService } from "../../__fakes__/dependencies/emailService";

const handler = (emailService: typeof fakeEmailService) => () => {
  const HTMLTemplate = "<p>Hello world</p>";

  it("should send an email to the targetUser when everything is ok", async () => {
    const { email } = getFakeData().user;

    await expect(emailService.send({ to: email, HTMLTemplate })).to.eventually
      .fulfilled;
  });

  it("should throw when something wrong heppend", async () => {
    await expect(emailService.send({ to: "", HTMLTemplate })).to.be.rejected;
  });
};

describe("emailService", () => {
  describe("Fake", handler(fakeEmailService));
});
