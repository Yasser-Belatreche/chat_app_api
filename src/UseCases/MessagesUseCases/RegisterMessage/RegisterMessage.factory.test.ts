import { expect } from "chai";
import faker from "faker";
import Sinon from "sinon";
import { getMocks } from "../../__mocks__";

import { makeRegisterMessage } from "./RegisterMessage.factory";

describe("RegisterMessage use case", () => {
  const validMessage = {
    content: faker.datatype.string(20),
    senderToken: faker.datatype.string(20),
    receiverId: faker.datatype.uuid(),
  };
  const decodedSenderId = faker.datatype.uuid();

  const {
    DB: { usersRepository, messagesRepository },
    tokenManager,
    user,
  } = getMocks();

  const registerMessage = makeRegisterMessage({
    tokenManager,
    usersRepository,
    messagesRepository,
  });

  it("should not register a message with an unvalid senderToken", async () => {
    tokenManager.decode = () => {
      throw new Error("invalid auth token");
    };

    await expect(
      registerMessage({ ...validMessage, senderToken: "someUnvalidToken" })
    ).to.be.rejectedWith("invalid auth token");

    tokenManager.decode = Sinon.spy(() => decodedSenderId);
  });

  it("should not be able to register a message sent to a non existing user", async () => {
    usersRepository.getById = () => Promise.resolve(undefined);

    await expect(
      registerMessage({ ...validMessage, receiverId: "notExist" })
    ).to.be.rejectedWith("user does not exist");

    usersRepository.getById = () => Promise.resolve(user);
  });

  it("should not be able to register an empty message", async () => {
    await expect(
      registerMessage({ ...validMessage, content: "" })
    ).to.be.rejectedWith("message should have a content");
  });

  it("should register the message and return it when everything is OK", async () => {
    messagesRepository.registerNewMessage = Sinon.spy(() =>
      Promise.resolve({ ...validMessage, senderId: decodedSenderId })
    );

    await expect(registerMessage(validMessage)).to.eventually.include({
      content: validMessage.content,
      receiverId: validMessage.receiverId,
      senderId: decodedSenderId,
    });
  });
});
