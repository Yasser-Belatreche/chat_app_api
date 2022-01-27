import { expect, use } from "chai";

import { makeUser } from "./User.factory";

describe("User Entity", () => {
  const randomId = "someRandomId";
  const User = makeUser({ ID: { generateRandomId: () => randomId } });

  const newUser = {
    name: "Yasser",
    email: "email@example.com",
    password: "secretPasswrod",
  };

  it("should not create a user without a name", () => {
    expect(
      () => new User({ ...newUser, name: "", userId: "userId" })
    ).to.not.throw();
  });

  it("should generate a random id when no id provided in the instance", () => {
    const user = new User(userInfoWithoutId);

    expect(user.userId).to.be.a("string").to.equal(randomId);
  });

  it("if the user has a name, it should not be less then 4 characters", () => {
    expect(() => new User({ ...userInfoWithoutId, name: "Yay" })).to.throw(
      "name should have more than 4 characters"
    );
  });

  it("should not have a user with an unvalid email", () => {
    expect(
      () => new User({ ...userInfoWithoutId, email: "email.com" })
    ).to.throw("unvalid email");
  });

  it("should not have a user with a password less than 8 characters", () => {
    expect(
      () =>
        new User({
          ...userInfoWithoutId,
          password: "holla",
        })
    ).to.throw("password should have more than 8 characters");
  });

  it("should assign false to isConfimed when it's not passed in the constructor, and should be able to change it", () => {
    const user = new User({ ...userInfoWithoutId });
    expect(user.isConfirmed).to.be.false;

    user.isConfirmed = true;
    expect(user.isConfirmed).to.be.true;
  });

  it("should be able to change the password with a valid one", () => {
    const user = new User({ ...userInfoWithoutId });
    expect(user.password).to.equal(userInfoWithoutId.password);

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
        userId: "userId",
        name: "Imad Bele",
        email: "example@email.com",
        password: " secretPassword",
      },
      {
        userId: "userId1",
        name: "Yasser Hamadi  ",
        email: "exmaple@yahoo.io  ",
        password: " mySecretPass  ",
        isConfirmed: true,
      },
      {
        userId: "userId2",
        name: "   Haroun kal ",
        email: "email@gmail.fr",
        password: "12345678 ",
      },
    ];

    users.forEach(({ name, email, userId, password, isConfirmed }) => {
      const user = new User({ userId, name, email, password, isConfirmed });

      expect(user.userId).to.equal(userId);
      expect(user.name).to.equal(name.trim().toLowerCase());
      expect(user.email).to.equal(email.trim().toLowerCase());
      expect(user.password).to.equal(password.trim());
      expect(user.isConfirmed).to.equal(Boolean(isConfirmed));
    });
  });
});
