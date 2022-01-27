import { expect, use } from "chai";
import { getMocks } from "../__mocks__";

import { makeUser } from "./User.factory";

describe("User Entity", () => {
  const { idManager } = getMocks();
  const User = makeUser({ idManager });

  const newUser = {
    name: "Yasser",
    email: "email@example.com",
    password: "secretPasswrod",
  };

  it("if the user has a name, it should not be less then 4 characters", () => {
    expect(() => new User({ ...newUser, name: "Yay" })).to.throw(
      "name should have more than 4 characters"
    );
  });

  it("should not have a user with an unvalid email", () => {
    expect(() => new User({ ...newUser, email: "email.com" })).to.throw(
      "unvalid email"
    );
  });

  it("should not have a user with a password less than 8 characters", () => {
    expect(() => new User({ ...newUser, password: "holla" })).to.throw(
      "password should have more than 8 characters"
    );
  });

  it("should generate a random userId and pass it to the instance", () => {
    const user1 = new User(newUser);
    const user2 = new User({ ...newUser, email: "user2@gmail.com" });

    expect(user1.userId).to.be.a("string").to.not.equal(user2.userId);
  });

  it("should assign false to isConfimed property", () => {
    const user = new User(newUser);
    expect(user.isConfirmed).to.be.false;
  });

  it("should be able to change the password with a valid one", () => {
    const user = new User(newUser);
    expect(user.password).to.equal(newUser.password);

    const newPassword = "newPassword";
    user.password = newPassword;

    expect(user.password).to.equal(newPassword);

    expect(() => (user.password = "unvalid")).to.throw(
      "password should have more than 8 characters"
    );
  });

  it("should be able to access the user properties in the instance without the trim and have them in lowercase (except the password)", () => {
    const users = [
      {
        name: "Imad Bele",
        email: "example@email.com",
        password: " secretPassword",
      },
      {
        name: "Yasser Hamadi  ",
        email: "exmaple@yahoo.io  ",
        password: " mySecretPass  ",
      },
      {
        name: "   Haroun kal ",
        email: "email@gmail.fr",
        password: "12345678 ",
      },
    ];

    users.forEach(({ name, email, password }) => {
      const user = new User({ name, email, password });

      expect(user.userId).to.be.a("string");
      expect(user.name).to.equal(name.trim().toLowerCase());
      expect(user.email).to.equal(email.trim().toLowerCase());
      expect(user.password).to.equal(password.trim());
      expect(user.isConfirmed).to.equal(false);
    });
  });
});
