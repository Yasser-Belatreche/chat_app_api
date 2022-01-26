const errorMessages = {
  USER_NOT_EXIST: "user does not exist",
  WRONG_PASSWORD: "wrong password",
  USED_EMAIL: "email already used",
  WRONG_VERIFICATION_CODE: "wrong verification code",
  USER_HAS_NO_VERIFICATION_CODE: "no verification code for this user",
  MESSAGE_HAS_NO_SENDER: "message should have a sender",
  MESSAGE_HAS_NO_RECEIVER: "message should have a receiver",
  MESSAGE_HAS_NO_CONTENT: "message should have a content",
  SHORT_USER_NAME: "name should have more than 4 characters",
  INVALID_EMAIL: "unvalid email",
  INVALID_PASSWORD: "password should have more than 8 characters",
  INVALID_AUTH_TOKEN: "invalid authentication token",
  DB_ERROR: "database error",
};

export { errorMessages };
