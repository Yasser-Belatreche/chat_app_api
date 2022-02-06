import { expect } from "chai";

import { passwordManager as fakePasswordManager } from "../../__fakes__/dependencies/passwordManager";

const handler = (passwordManager: typeof fakePasswordManager) => () => {
  it("should hash every unique password with a unique hash", () => {
    expect(passwordManager.hash("someKey"))
      .and.to.not.equal(passwordManager.hash("someOtherKey"))
      .and.to.not.equal(passwordManager.hash("anotherKey"));
  });

  it("should check if the password match the hashed", () => {
    [...Array(10)].forEach(() => {
      const password = `${Math.floor(Math.random()) * 10 ** 7}`;
      const hash = passwordManager.hash(password);

      expect(passwordManager.isHashMatchLiteral({ literal: password, hash })).to
        .be.true;

      expect(
        passwordManager.isHashMatchLiteral({
          literal: `wrong${password}`,
          hash,
        })
      ).to.be.false;
    });
  });
};

describe("passwordManager", () => {
  describe("Fake", handler(fakePasswordManager));
});
