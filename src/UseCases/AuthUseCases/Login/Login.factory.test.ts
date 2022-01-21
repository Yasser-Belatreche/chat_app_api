import { expect } from "chai";

import { makeLogin } from "./Login.factory";

/**
 * 2 - not able to login when the password doesn't match the phone number
 * 3 - return a token when everything is OK
 */

describe("Login use case", () => {
  const login = makeLogin({});

  it("should not be able to login with wrong inputs", () => {
    const userInfoWithUnvalidName = {
      name: "Doe",
      phoneNumber: "+213798989098",
      password: "12345678",
    };

    const userInfoWithUnvalidPhone = {
      name: "John Doe",
      phoneNumber: "s89098",
      password: "12345678",
    };

    const userInfoWithUnvalidPassword = {
      name: "John Doe",
      phoneNumber: "+213798989098",
      password: "12378",
    };

    expect(() => login(userInfoWithUnvalidName)).to.throw(
      "name should have more than 4 characters"
    );
    expect(() => login(userInfoWithUnvalidPhone)).to.throw(
      "unvalid phone number"
    );
    expect(() => login(userInfoWithUnvalidPassword)).to.throw(
      "password should have more than 8 characters"
    );
  });

  it("should not be able to login when the password does not match the phone number", () => {});
});
