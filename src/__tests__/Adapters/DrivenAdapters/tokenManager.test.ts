import { expect } from "chai";
import { tokenManager as fakeTokenManager } from "../../__fakes__/dependencies/tokenMananger";

const handler = (tokenManager: typeof fakeTokenManager) => () => {
  it("should generate a unique token for each key", () => {
    expect(tokenManager.generateToken("hello"))
      .to.not.equal(tokenManager.generateToken("hiiiooo"))
      .to.not.equal(tokenManager.generateToken("fooo"))
      .to.not.equal(tokenManager.generateToken("baar"))
      .to.not.equal(tokenManager.generateToken("world happy"))
      .to.not.equal(tokenManager.generateToken("so sad"));
  });

  it("should not decode an invalid token", () => {
    expect(() => tokenManager.decode("someInvalidToken"))
      .to.throw()
      .instanceOf(Error);
  });

  it("should decode the token and return his value", () => {
    [...Array(10)].forEach(() => {
      const value = Math.floor(Math.random() * 10 ** 10).toString();
      const token = tokenManager.generateToken(value);

      expect(tokenManager.decode(token)).to.equal(value);
    });
  });
};

describe("tokenMananger", () => {
  describe("Fake", handler(fakeTokenManager));
});
