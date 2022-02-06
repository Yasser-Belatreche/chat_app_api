import { expect } from "chai";

import { getFakeData } from "../../__fakes__/data";
import { emailService as fakeEmailService } from "../../__fakes__/dependencies/emailService";

const handler = (emailService: typeof fakeEmailService) => () => {
  it("should send an email to the targetUser when everything is ok", async () => {
    await expect(
      emailService.send({
        to: getFakeData().user.email,
        HTMLTemplate: "<p>Hello world</p>",
      })
    ).to.eventually.have.property("success", true);
  });

  it("should throw when something wrong heppend", async () => {
    await expect(
      emailService.send({
        to: "",
        HTMLTemplate: "<p>Hello</p>",
      })
    ).to.eventually.have.property("success", false);
  });
};

describe("emailService", () => {
  describe("Fake", handler(fakeEmailService));
});
