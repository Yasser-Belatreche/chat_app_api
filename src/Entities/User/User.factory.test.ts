import { expect } from "chai";

import { makeUser } from "./User.factory";

describe("User Entity", () => {
  const randomId = "someRandomId";
  const User = makeUser({ ID: { generateRandomId: () => randomId } });

  it("should not have a user with a name less then 4 characters", () => {
    expect(
      () =>
        new User({ name: "Yas", phoneNumber: "+213795", password: "12345678" })
    ).to.throw("name should have more than 4 characters");
  });

  it("should not have a user with an unvalid phoneNumber", () => {
    expect(
      () =>
        new User({ name: "Yasser", phoneNumber: "0975", password: "12345678" })
    ).to.throw("unvalid phone number");
  });

  it("should not have a user with a password less than 8 characters", () => {
    const userInfo = {
      name: "Yasser",
      phoneNumber: "+213798980975",
      password: "1234",
    };

    expect(() => new User(userInfo)).to.throw(
      "password should have more than 8 characters"
    );
  });

  it("should be able to access the user properties in the instance without the trim and have them in lowercase", () => {
    const users = [
      {
        userId: "userId",
        name: "Imad Bele",
        phoneNumber: "+213798980975",
        password: "12345678",
      },
      {
        userId: "userId1",
        name: "Yasser Hamadi  ",
        phoneNumber: "+213710809752",
        password: "12345678",
      },
      {
        userId: "userId2",
        name: "Haroun kal",
        phoneNumber: "+213791980975",
        password: "12345678",
      },
    ];

    users.forEach(({ name, phoneNumber, userId, password }) => {
      const user = new User({ name, phoneNumber, userId, password });

      expect(user.userId).to.equal(userId);
      expect(user.name).to.equal(name.trim().toLowerCase());
      expect(user.phoneNumber).to.equal(phoneNumber.trim());
      expect(user.password).to.equal(password);
    });
  });

  it("should generate a random id when no id provided in the instance", () => {
    const userInfo = {
      name: "Imad Belatreche",
      phoneNumber: "+21379880975",
      password: "12345678",
    };
    const user = new User(userInfo);

    expect(user.userId).to.be.a("string").to.equal(randomId);
  });
});
