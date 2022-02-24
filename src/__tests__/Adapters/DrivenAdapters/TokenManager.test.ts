import { expect } from "chai";
import type { ITokenManager } from "../../../Ports/DrivenPorts/TokenManager/TokenManager.interface";

import { TokenManagerFake } from "../../__fakes__/dependencies/TokenManagerFake";
import { TokenManager } from "../../../Adapters/DrivenAdapters/TokenManager";

process.env.JWT_SECRET_KEY = "someSecretKey";

const handler = (tokenManager: ITokenManager) => () => {
  it("should generate a unique Bearer token for each key", () => {
    expect(tokenManager.generateToken("hello"))
      .to.include("Bearer ")
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
    for (let i = 0; i < 3; i++) {
      const value = Math.floor(Math.random() * 10 ** 5).toString();
      const token = tokenManager.generateToken(value);

      expect(tokenManager.decode(token)).to.equal(value);
    }
  });
};

describe("TokenMananger", () => {
  describe("Fake", handler(new TokenManagerFake()));
  describe("Real", handler(new TokenManager()));
});
