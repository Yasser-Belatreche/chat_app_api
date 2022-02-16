import { makeConfirmUser } from "../../../UseCases/AuthUseCases/ConfirmUser/ConfirmUser";
import { makeRegisterUser } from "../../../UseCases/AuthUseCases/RegisterUser/RegisterUser";
import { makeSendConfirmationCode } from "../../../UseCases/AuthUseCases/SendConfirmationCode/SendConfirmationCode";

import { getFakeData } from "../../__fakes__/data";
import { getFakeDependencies } from "../../__fakes__/dependencies";

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

const registerAndConfirmRandomUser = async () => {
  const { token, user } = await registerRandomUser();

  const code = await sendConfirmationCode({ email: user.email });
  await confirmUser({ authToken: token, code });

  return { token, user };
};

const registerRandomUser = async () => {
  const { user } = fakeData;
  const email = user.email.toLowerCase();

  const token = await registerUser(user);

  const userInDb = await usersRepository.getByEmail(email);
  if (!userInDb) throw "";

  return { token, user: userInDb };
};

export { registerAndConfirmRandomUser, registerRandomUser };