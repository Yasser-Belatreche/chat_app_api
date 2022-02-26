import { expect } from "chai";

import type { IPasswordManager } from "../../../Ports/DrivenPorts/PasswordManager/PasswordManager.interface";

import { PasswordManagerFake } from "../../__fakes__/dependencies/PasswordManagerFake";
import { PasswordManager } from "../../../Adapters/DrivenAdapters/PasswordManger";

const handler = (passwordManager: IPasswordManager) => () => {
  it("should hash every unique password with a unique hash", async () => {
    await expect(passwordManager.hash("someKey"))
      .to.eventually.not.equal(passwordManager.hash("someOtherKey"))
      .and.to.not.equal(passwordManager.hash("anotherKey"));
  });

  it("should check if the password match the hashed", async () => {
    const password = `${Math.floor(Math.random()) * 10 ** 7}`;
    const hash = await passwordManager.hash(password);

    await expect(
      passwordManager.isHashMatchLiteral({ literal: password, hash })
    ).to.eventually.be.true;

    await expect(
      passwordManager.isHashMatchLiteral({
        literal: `wrong${password}`,
        hash,
      })
    ).to.eventually.be.false;
  });
};

describe("PasswordManager", () => {
  describe("Fake", handler(new PasswordManagerFake()));
  describe("Real", handler(new PasswordManager()));
});
