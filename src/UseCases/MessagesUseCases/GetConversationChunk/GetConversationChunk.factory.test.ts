import { expect } from "chai";
import faker from "faker";
import Sinon from "sinon";

import { getMocks } from "../../__mocks__";

import { makeGetConversationChunk } from "./GetConversationChunk.factory";

describe("GetConversationChunk use case", () => {
  const decodedAuthId = faker.datatype.uuid();
  const validArgs = {
    authToken: faker.datatype.string(10),
    with: faker.datatype.uuid(),
    chunkNumber: 1,
  };

  const {
    tokenManager,
    DB: { usersRepository, messagesRepository },
    user,
    message,
  } = getMocks();

  const getConversationChunk = makeGetConversationChunk({
    tokenManager,
    usersRepository,
    messagesRepository,
  });

  it("not auth user should not be able to get a conversation", async () => {
    tokenManager.decode = () => {
      throw new Error("invalid auth token");
    };

    await expect(
      getConversationChunk({ ...validArgs, authToken: "invalid token" })
    ).to.be.rejectedWith("invalid auth token");

    tokenManager.decode = Sinon.spy(() => decodedAuthId);
  });

  it("should not be able to get a conversation with a non existing user", async () => {
    usersRepository.getById = () => Promise.resolve(undefined);

    await expect(
      getConversationChunk({
        ...validArgs,
        with: "non existing user",
      })
    ).to.be.rejectedWith("user does not exist");

    usersRepository.getById = () => Promise.resolve(user);
  });

  it("should return a chuck of the messages when everything is ok", async () => {
    messagesRepository.getConversationChunk = Sinon.spy(() =>
      Promise.resolve([
        ...Array(10).fill(message),
        {
          senderId: decodedAuthId,
          receiverId: validArgs.with,
          content: "hello my old friend",
        },
      ])
    );

    await expect(getConversationChunk(validArgs))
      .to.eventually.be.an("array")
      .to.deep.include({
        senderId: decodedAuthId,
        receiverId: validArgs.with,
        content: "hello my old friend",
      });

    expect(messagesRepository.getConversationChunk.calledOnce).to.be.true;
  });
});
