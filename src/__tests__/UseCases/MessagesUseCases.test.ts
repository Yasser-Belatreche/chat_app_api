import { expect } from "chai";
import { makeConfirmUser } from "../../UseCases/AuthUseCases/ConfirmUser";
import { makeRegisterUser } from "../../UseCases/AuthUseCases/RegisterUser";
import { makeSendConfirmationCode } from "../../UseCases/AuthUseCases/SendConfirmationCode";

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

const sendMessage = makeSendMessage({});

describe("MessagesUseCases", () => {
  describe("Send Messages", () => {
    it("should not be able to send a message to a non existing user", async () => {
      const [authUser, chatParticipant] = await registerAndGetTwoUsers();

      const authToken = authUser.token;
      const to = chatParticipant.userId;

      await expect(
        sendMessage({ authToken, to: "idNotExist", message: "hello there !" })
      ).to.be.rejected;
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
