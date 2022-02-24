const ERRORS = {
  WRONG_PASSWORD: "wrong password",
  USED_EMAIL: "email already used",
  WRONG_CONFIRMATION_CODE: "wrong confirmation code",
  USER_HAS_NO_VERIFICATION_CODE: "no verification code for this user",
  CREDENTIALS_ERROR: "credentials error",
};

class InvalidCredentials extends Error {
  constructor() {
    super(ERRORS.CREDENTIALS_ERROR);
  }
}

class EmailAlreadyUsed extends Error {
  constructor() {
    super(ERRORS.USED_EMAIL);
  }
}

class WrongConfirmationCode extends Error {
  constructor() {
    super(ERRORS.WRONG_CONFIRMATION_CODE);
  }
}

export { InvalidCredentials, EmailAlreadyUsed, WrongConfirmationCode };
