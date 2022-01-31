import { expect } from "chai";
import faker from "faker";

import { makeUser } from "../../Domain/User/User.Factory";
import { getFakeDependencies } from "../__fakes__";

const { idGenerator } = getFakeDependencies();
const User = makeUser({ idGenerator });

describe("User Entitiy", () => {
  const validEmailAndPassword = {
    email: faker.internet.email(),
    password: faker.internet.password(8),
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

  it("if the user is newly created, we generate a random id and set the createdAt to time using the method calling generateIdAndCreationTime()", async () => {
    const delay = async (time: number) => {
      return new Promise((resolve) => {
        setTimeout(resolve, time);
      });
    };

    const firstUser = new User(validEmailAndPassword);
    const secondUser = new User(validEmailAndPassword);

    firstUser.generateIdAndCreationTime();
    await delay(1);
    secondUser.generateIdAndCreationTime();

    expect(firstUser.createdAt)
      .to.be.a("string")
      .to.not.equal(secondUser.createdAt);
    expect(firstUser.userId).to.be.a("string").to.not.equal(secondUser.userId);
  });

  it("attemp to call generateIdAndCreationTime() throw an error when the userId or createdAt are already set in the instance", async () => {
    const user = new User(validEmailAndPassword);
    user.userId = "someId";
    user.createdAt = new Date().toJSON();

    expect(() => user.generateIdAndCreationTime())
      .to.throw()
      .instanceOf(Error);
  });
});
