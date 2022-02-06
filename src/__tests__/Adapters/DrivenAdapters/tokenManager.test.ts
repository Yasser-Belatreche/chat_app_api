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
};

describe("tokenMananger", () => {
  describe("Fake", handler(fakeTokenManager));
});
