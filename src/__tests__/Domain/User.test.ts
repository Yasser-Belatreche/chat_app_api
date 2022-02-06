import { expect } from "chai";
import faker from "faker";

import { makeUser } from "../../Domain/User/User.Factory";
import { getFakeDependencies } from "../__fakes__/dependencies";
import { getFakeData } from "../__fakes__/data";

const { idGenerator } = getFakeDependencies();
const User = makeUser({ idGenerator });

describe("User Entitiy", () => {
  const { user } = getFakeData();
  const validEmailAndPassword = {
    email: user.email,
    password: user.password,
  };

  it("should not have a user with unvalid email", () => {
    const INVALID_EMAILS = ["UNVALID", "hallo@s", "gmail.com"];
    INVALID_EMAILS.forEach((email) => {
      expect(() => new User({ ...validEmailAndPassword, email }))
        .to.throw()
        .instanceOf(Error);
    });
  });

  it("should not have a user with a short password (< 8)", () => {
    const INVALID_PASSWORDS = ["inv", "lskjf", "lsqdflk"];
    INVALID_PASSWORDS.forEach((password) => {
      expect(() => new User({ ...validEmailAndPassword, password }))
        .to.throw()
        .instanceOf(Error);
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

    expect(() => user.name)
      .to.throw()
      .instanceOf(Error);
    expect(() => user.createdAt)
      .to.throw()
      .instanceOf(Error);
    expect(() => user.userId)
      .to.throw()
      .instanceOf(Error);
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
    expect(() => (user.name = "nam"))
      .to.throws()
      .instanceOf(Error);
  });

  it("if the user is newly created, we generate a random id, set the createdAt to the current time, the name to the string argument and isConfirmed to false by calling isANewRegistred(name)", async () => {
    const firstUser = new User(validEmailAndPassword);
    const secondUser = new User(validEmailAndPassword);
    const thirdUser = new User(validEmailAndPassword);

    firstUser.isANewRegistred("john");
    secondUser.isANewRegistred("smith");

    expect(firstUser.name).to.equal("john");
    expect(secondUser.name).to.equal("smith");

    expect(new Date(firstUser.createdAt)).to.be.instanceOf(Date);
    expect(firstUser.userId).to.be.a("string").to.not.equal(secondUser.userId);

    expect(() => thirdUser.isANewRegistred("hjs"))
      .to.throw()
      .instanceOf(Error);

    expect(firstUser.isConfirmed).to.be.false.to.equal(secondUser.isConfirmed);
  });

  it("attemp to call isANewRegistred(name) throw an error when the userId, name or createdAt are already set in the instance", async () => {
    const user = new User(validEmailAndPassword);
    user.userId = "someId";
    user.createdAt = new Date().toJSON();
    user.name = "johnSmith";

    expect(() => user.isANewRegistred("mark"))
      .to.throw()
      .instanceOf(Error);
  });

  it("should be able to change the password with a valid one", () => {
    const user = new User(validEmailAndPassword);
    expect(user.password).to.not.equal("someValidpassword");

    user.password = "someValidpassword";
    expect(user.password).to.equal("someValidpassword");

    expect(() => (user.password = "som"))
      .to.throw()
      .instanceOf(Error);
  });

  it("should not be able to get isCofirmed when it's not set", () => {
    const firstUser = new User(validEmailAndPassword);
    const secondUser = new User(validEmailAndPassword);

    firstUser.isConfirmed = true;

    expect(firstUser.isConfirmed).to.be.true;
    expect(() => secondUser.isConfirmed)
      .to.throw()
      .instanceOf(Error);
  });
});
