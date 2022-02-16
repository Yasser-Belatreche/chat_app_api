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
  describe("Sending Messages", () => {
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

  describe("Getting Messages", () => {
    let sender_1: any, sender_2: any, receiver_1: any, receiver_2: any;

    before(async () => {
      [sender_1, receiver_1] = await registerAndGetTwoUsers();
      [sender_2, receiver_2] = await registerAndGetTwoUsers();

      await send30Message(sender_1, receiver_1);
      await send30Message(sender_2, receiver_2);
    });

    it("should get the latest 20 message between the two target users", async () => {
      const messages = await getMessages({
        authToken: sender_1.token,
        chatParticipantId: receiver_1.userId,
      });

      expect(messages).to.have.lengthOf(20);
      expect(messages[0]).to.have.property("content", "30");
      expect(messages[messages.length - 1]).to.have.property("content", "11");
      messages.map((message) => {
        expect(message).to.have.property("senderId", sender_1.userId);
        expect(message).to.have.property("receiverId", receiver_1.userId);
      });
    });

    it("should be able to customize the number of messages returned, also the number of messages chunk", async () => {
      const messages = await getMessages({
        authToken: sender_1.token,
        chatParticipantId: receiver_1.userId,
        numOfChunk: 2,
        numOfMessagesPerChunk: 5,
      });
      expect(messages).to.have.lengthOf(5);
      expect(messages[0]).to.have.property("content", "25");
      expect(messages[messages.length - 1]).to.have.property("content", "21");
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

const send30Message = async (sender: any, receiver: any) => {
  let i = 1;
  while (i <= 30) {
    await sendMessage({
      authToken: sender.token,
      receiverId: receiver.userId,
      content: `${i++}`,
    });
  }
};
