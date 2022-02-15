import { expect } from "chai";

import { makeConfirmUser } from "../../UseCases/AuthUseCases/ConfirmUser";
import { makeRegisterUser } from "../../UseCases/AuthUseCases/RegisterUser";
import { makeSendConfirmationCode } from "../../UseCases/AuthUseCases/SendConfirmationCode";
import { makeGetMessages } from "../../UseCases/MessagesUseCases/GetMessages";
import { makeSendMessage } from "../../UseCases/MessagesUseCases/SendMessage";

import { getFakeData } from "../__fakes__/data";
import { getFakeDependencies } from "../__fakes__/dependencies";

const fakeData = getFakeData();
const {
  passwordManager,
  tokenManager,
  usersRepository,
  confirmationCodesRepository,
  emailService,
  messagesRepository,
} = getFakeDependencies();

const registerUser = makeRegisterUser({
  passwordManager,
  tokenManager,
  usersRepository,
});
const sendConfirmationCode = makeSendConfirmationCode({
  usersRepository,
  confirmationCodesRepository,
  emailService,
});
const confirmUser = makeConfirmUser({
  confirmationCodesRepository,
  tokenManager,
  usersRepository,
});

const sendMessage = makeSendMessage({
  tokenManager,
  usersRepository,
  messagesRepository,
});
const getMessages = makeGetMessages({ messagesRepository, tokenManager });

describe("MessagesUseCases", () => {
  describe("Send Messages", () => {
    it("should not be able to send a message to a non existing user", async () => {
      const [authUser] = await registerAndGetTwoUsers();
      const authToken = authUser.token;
      const receiverId = "idNotExist";

      await expect(
        sendMessage({ authToken, receiverId, content: "hello there !" })
      ).to.be.rejected;
    });

    it("should not be able to send an empty message", async () => {
      const [sender, receiver] = await registerAndGetTwoUsers();
      const authToken = sender.token;
      const receiverId = receiver.userId;

      await expect(sendMessage({ authToken, receiverId, content: "" })).to.be
        .rejected;
    });

    it("should send the message to the target user when everything is ok", async () => {
      const [sender, receiver] = await registerAndGetTwoUsers();

      const validArgs = {
        authToken: sender.token,
        receiverId: receiver.userId,
        content: "hello bro !!",
      };

      await expect(sendMessage(validArgs)).to.be.fulfilled;

      const messagesList = await getMessages({
        authToken: validArgs.authToken,
        chatParticipantId: receiver.userId,
        numOfChunk: 1,
        numOfMessagesPerChunk: 1,
      });

      expect(messagesList[0]).to.have.property("content", validArgs.content);
      expect(messagesList[0]).to.have.property(
        "receiverId",
        validArgs.receiverId
      );
    });
  });
});

const registerAndGetTwoUsers = async () => {
  const firstUser = await registerAndConfirmRandomUser();
  const secondUser = await registerAndConfirmRandomUser();

  return [firstUser, secondUser];
};

const registerAndConfirmRandomUser = async () => {
  const { user } = fakeData;
  const email = user.email.toLowerCase();

  const token = await registerUser(user);
  const code = await sendConfirmationCode({ email });
  await confirmUser({ authToken: token, code });

  const userInDb = await usersRepository.getByEmail(email);
  if (!userInDb) throw "";

  return { token, userId: userInDb.userId };
};
