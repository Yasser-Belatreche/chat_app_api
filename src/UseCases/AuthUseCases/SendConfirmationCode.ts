import type {
  WithConfirmationCodesRepository,
  WithEmailService,
  WithUsersRepository,
} from "../_utils_/dependencies.interfaces";

import { ConfirmationCode } from "../../Domain/ConfirmationCode/ConfirmationCode";
import { UserNotExist } from "./_utils_/Exceptions";
import { getEmailConfirmationHtmlTemplate } from "./_utils_/emailConfirmationHtmlTemplate";

type Dependencies = WithUsersRepository &
  WithConfirmationCodesRepository &
  WithEmailService;

interface Args {
  email: string;
}

const makeSendConfirmationCode = ({
  usersRepository,
  confirmationCodesRepository,
  emailService,
}: Dependencies) => {
  return async ({ email }: Args) => {
    const user = await usersRepository.getByEmail(email.toLowerCase().trim());
    if (!user) throw new UserNotExist();

    const confirmationCode = new ConfirmationCode(user.email);

    const codeFromDb = await confirmationCodesRepository.find(user.email);

    if (codeFromDb) await confirmationCodesRepository.update(confirmationCode);
    else await confirmationCodesRepository.add(confirmationCode);

    await emailService.send({
      to: user.email,
      HTMLTemplate: getEmailConfirmationHtmlTemplate(confirmationCode.code),
    });

    return confirmationCode.code;
  };
};

export { makeSendConfirmationCode };