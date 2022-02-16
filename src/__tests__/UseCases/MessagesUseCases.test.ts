import { expect } from "chai";
import Sinon from "sinon";

import { makeConfirmUser } from "../../UseCases/AuthUseCases/ConfirmUser/ConfirmUser";
import { makeRegisterUser } from "../../UseCases/AuthUseCases/RegisterUser/RegisterUser";
import { makeSendConfirmationCode } from "../../UseCases/AuthUseCases/SendConfirmationCode/SendConfirmationCode";
import { makeGetMessages } from "../../UseCases/MessagesUseCases/GetMessages/GetMessages";
import { makeSendMessage } from "../../UseCases/MessagesUseCases/SendMessage/SendMessage";

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
  notificationsManager,
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
  notificationsManager,
});
const getMessages = makeGetMessages({ messagesRepository, tokenManager });

describe("MessagesUseCases", () => {
  describe("Sending & Getting Messages", () => {
    const newMessageNotificationSpy = Sinon.spy(
      notificationsManager,
      "newMessage"
    );

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

    it("not confirmed user cannot send or receive messages", async () => {
      const confirmedUser = await registerAndConfirmRandomUser();
      const notConfirmedUser = await regsiterRandomUser();

      await expect(
        sendMessage({
          authToken: confirmedUser.token,
          receiverId: notConfirmedUser.user.userId,
          content: "hello",
        })
      ).to.be.rejected;
      await expect(
        sendMessage({
          authToken: notConfirmedUser.token,
          receiverId: confirmedUser.userId,
          content: "hello",
        })
      ).to.be.rejected;
    });

    it("should send the message to the target user when everything is ok", async () => {
      const [sender, receiver] = await registerAndGetTwoUsers();

      const validArgs = {
        authToken: sender.token,
        receiverId: receiver.userId,
        content: "hello bro !!",
      };

      await expect(sendMessage(validArgs)).to.be.fulfilled;
      expect(newMessageNotificationSpy.calledOnce).to.be.true;

      const messagesList = await getMessages({
        authToken: validArgs.authToken,
        chatParticipantId: receiver.userId,
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
  const { token, user } = await regsiterRandomUser();

  const code = await sendConfirmationCode({ email: user.email });
  await confirmUser({ authToken: token, code });

  return { token, userId: user.userId };
};

const regsiterRandomUser = async () => {
  const { user } = fakeData;
  const email = user.email.toLowerCase();

  const token = await registerUser(user);

  const userInDb = await usersRepository.getByEmail(email);
  if (!userInDb) throw "";

  return { token, user: userInDb };
};
