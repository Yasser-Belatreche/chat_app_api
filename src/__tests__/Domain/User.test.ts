import { expect } from "chai";

import { makeUser } from "../../Domain/User/UserFactory";
import { getFakeDependencies } from "../__fakes__/dependencies";
import { getFakeData } from "../__fakes__/data";

describe("User Entitiy", () => {
  const { idGenerator } = getFakeDependencies();
  const { userFakeInfo } = getFakeData();

  const User = makeUser({ idGenerator });
  const validEmailAndPassword = {
    email: userFakeInfo.email,
    password: userFakeInfo.password,
  };

  it("should not have a user with unvalid email", () => {
    const INVALID_EMAILS = ["UNVALID", "hallo@s", "gmail.com"];
    INVALID_EMAILS.forEach((email) => {
      expect(() => new User({ ...validEmailAndPassword, email })).to.throw();
    });
  });

  it("should not have a user with a short password (< 8)", () => {
    const INVALID_PASSWORDS = ["inv", "lskjf", "lsqdflk"];
    INVALID_PASSWORDS.forEach((password) => {
      expect(() => new User({ ...validEmailAndPassword, password })).to.throw();
    });
  });

  it("should trim the email and password when initialized, and make the email lowercased", () => {
    const user = new User({
      email: `${validEmailAndPassword.email}  `,
      password: `${validEmailAndPassword.password} `,
    });

    expect(user.email).to.equal(
      validEmailAndPassword.email.trim().toLowerCase()
    );
    expect(user.password).to.equal(validEmailAndPassword.password.trim());
  });

  it("should throws when attemps to access properties not set yet", () => {
    const user = new User(validEmailAndPassword);

    expect(user.email).to.not.be.null;
    expect(user.password).to.not.be.null;

    expect(() => user.name).to.throw();
    expect(() => user.createdAt).to.throw();
    expect(() => user.userId).to.throw();
  });

  it("should be able to set the name, after trim it and lowercase it", () => {
    const user = new User(validEmailAndPassword);

    const name = "John Doe  ";
    user.name = name;

    expect(user.name).to.not.equal(name);
    expect(user.name).to.equal(name.trim().toLowerCase());
  });

  it("should not be able have a user with a short name (< 4)", () => {
    const user = new User(validEmailAndPassword);
    expect(() => (user.name = "nam")).to.throws();
  });

  it("if the user is newly created, we generate a random id, set the createdAt to the current time, the name to the string argument and isConfirmed to false by calling newRegistered(name)", async () => {
    const firstUser = new User(validEmailAndPassword);
    const secondUser = new User(validEmailAndPassword);
    const thirdUser = new User(validEmailAndPassword);

    firstUser.newRegistered("john");
    secondUser.newRegistered("smith");

    expect(firstUser.name).to.equal("john");
    expect(secondUser.name).to.equal("smith");

    expect(() => new Date(firstUser.createdAt)).to.not.throw();
    expect(firstUser.userId).to.be.a("string").to.not.equal(secondUser.userId);

    expect(() => thirdUser.newRegistered("hjs")).to.throw();

    expect(firstUser.isConfirmed).to.be.false.to.equal(secondUser.isConfirmed);
  });

  it("can't regenerate the user basic informations (id, createdAt) after setting them", async () => {
    const user = new User(validEmailAndPassword);

    user.newRegistered("johnSmith");

    expect(() => user.newRegistered("mark")).to.throw();
  });

  it("should be able to change the password with a valid one", () => {
    const user = new User(validEmailAndPassword);
    expect(user.password).to.not.equal("someValidpassword");

    user.password = "someValidpassword";
    expect(user.password).to.equal("someValidpassword");

    expect(() => (user.password = "som")).to.throw();
  });

  it("should be able to change the status of the user into confirmed", () => {
    const user = new User(validEmailAndPassword);
    user.confirm();

    expect(user.isConfirmed).to.be.true;
  });

  it("should not be able to get isCofirmed when it's not set", () => {
    const user = new User(validEmailAndPassword);

    expect(() => user.isConfirmed).to.throw();
  });

  it("should be able to retrieve all the user information", () => {
    const user = new User(validEmailAndPassword);
    user.newRegistered("John Smith");

    const userInfo = user.userInfo();

    expect(userInfo.userId).to.equal(user.userId);
    expect(userInfo.name).to.equal(user.name);
    expect(userInfo.email).to.equal(user.email);
    expect(userInfo.createdAt).to.equal(user.createdAt);
    expect(userInfo.isConfirmed).to.equal(user.isConfirmed);
    expect(userInfo.password).to.equal(user.password);
  });

  it("should not be able to change the userId and createdAt after we set it", () => {
    const user = new User(validEmailAndPassword);
    user.userId = "someId";
    user.createdAt = new Date().toJSON();

    expect(() => (user.userId = "anotherId")).to.throw();
    expect(() => (user.createdAt = new Date().toJSON())).to.throw();
  });

  it("should not be able to set createdAt to an invalid Date", () => {
    const user = new User(validEmailAndPassword);
    expect(() => (user.createdAt = "not a date")).to.throw();
  });
});
